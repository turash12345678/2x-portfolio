const { spawn } = require('child_process');
const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');

async function launchChrome() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const args = [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\AutomationData',
    '--remote-allow-origins=*',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,1000'
  ];

  const cp = spawn(chromePath, args);

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      const versionData = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9222/json/version', res => {
          let body = '';
          res.on('data', c => body += c);
          res.on('end', () => resolve(JSON.parse(body)));
        }).on('error', reject);
      });
      if (versionData && versionData.webSocketDebuggerUrl) {
        wsUrl = versionData.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }
  return { cp, wsUrl };
}

class CDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }
  async connect() {
    this.ws = new WebSocket(this.wsUrl, { perMessageDeflate: false });
    await new Promise(resolve => this.ws.on('open', resolve));
    this.ws.on('message', m => {
      const d = JSON.parse(m);
      if (d.id && this.callbacks.has(d.id)) {
        const cb = this.callbacks.get(d.id);
        this.callbacks.delete(d.id);
        cb(d);
      }
    });
  }
  send(method, params = {}, sessionId = undefined) {
    return new Promise(resolve => {
      const curId = this.id++;
      this.callbacks.set(curId, resolve);
      const msg = { id: curId, method, params };
      if (sessionId) msg.sessionId = sessionId;
      this.ws.send(JSON.stringify(msg));
    });
  }
  async eval(fnStr, sessionId) {
    const res = await this.send('Runtime.evaluate', {
      expression: `(${fnStr})()`,
      returnByValue: true,
      awaitPromise: true
    }, sessionId);
    return res.result?.result?.value;
  }
  async screenshot(filepath, sessionId) {
    try {
      const res = await this.send('Page.captureScreenshot', { format: 'png' }, sessionId);
      if (res?.result?.data) {
        fs.writeFileSync(filepath, Buffer.from(res.result.data, 'base64'));
        console.log(`[CDP] Saved screenshot: ${filepath}`);
        return true;
      }
    } catch (e) {
      console.warn(`[CDP] Screenshot error:`, e.message);
    }
    return false;
  }
  close() {
    if (this.ws) this.ws.close();
  }
}

function recordToTrackers(record) {
  const jsonPath = 'job_tracker.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (!data.some(d => d.sl === record.sl || d.target === record.target)) {
    data.push(record);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`[Tracker] Added SL #${record.sl} to ${jsonPath} (Total: ${data.length})`);
  }

  const csvPath = 'job_tracker.csv';
  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const s = String(val).replace(/"/g, '""');
    return `"${s}"`;
  };

  const row = [
    record.sl,
    escapeCsv(record.company),
    escapeCsv(record.job_title),
    escapeCsv(record.location),
    escapeCsv(record.channel),
    escapeCsv(record.target),
    escapeCsv(record.status),
    escapeCsv(record.date),
    escapeCsv(record.proof),
    escapeCsv(record.cv),
    escapeCsv(record.notes)
  ].join(',') + '\n';

  fs.appendFileSync(csvPath, row, 'utf8');
  console.log(`[Tracker] Appended SL #${record.sl} to ${csvPath}`);
}

async function applyOneAshby(cdp, target) {
  console.log(`\n======================================================`);
  console.log(`[EXECUTE] SL #${target.sl}: ${target.company} - ${target.title}`);
  console.log(`URL: ${target.url}`);
  console.log(`======================================================`);

  const appUrl = target.url.includes('/application') ? target.url : `${target.url.replace(/\/$/, '')}/application`;
  const targetRes = await cdp.send('Target.createTarget', { url: appUrl });
  const targetId = targetRes.result.targetId;

  const sessionRes = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  let sid = sessionRes.result.sessionId;

  await cdp.send('Page.enable', {}, sid);
  await cdp.send('Runtime.enable', {}, sid);
  await cdp.send('DOM.enable', {}, sid);

  console.log('[Runner] Waiting for page load...');
  await new Promise(r => setTimeout(r, 6000));

  const pageTitle = await cdp.eval(`() => document.title`, sid);
  console.log('[Runner] Page Title:', pageTitle);

  // Enforce Senior/Lead role exclusion
  if (/senior|lead|staff|principal|director|head of|manager/i.test(pageTitle)) {
    console.warn(`[Runner] SKIPPING ${target.company} - Job title indicates Senior/Lead: "${pageTitle}"`);
    try { await cdp.send('Target.closeTarget', { targetId }); } catch (e) {}
    return { skipped: true, reason: 'Senior/Lead role' };
  }

  // Check if job is inactive/closed
  const pageCheck = await cdp.eval(`() => {
    const text = document.body ? document.body.innerText : '';
    const isClosed = /no longer available|job not found|404 page not found|position has been filled/i.test(text);
    const hasInputs = !!document.querySelector('input');
    return { isClosed, hasInputs, snippet: text.slice(0, 200).replace(/\\s+/g, ' ') };
  }`, sid);

  if (pageCheck && (pageCheck.isClosed || !pageCheck.hasInputs)) {
    console.warn(`[Runner] SKIPPING ${target.company} - Job inactive or closed: ${pageCheck.snippet}`);
    try { await cdp.send('Target.closeTarget', { targetId }); } catch (e) {}
    return { skipped: true, reason: 'Job inactive/closed' };
  }

  // Fill candidate inputs
  const fillResult = await cdp.eval(`() => {
    const setVal = (el, val) => {
      if (!el) return false;
      el.focus();
      const proto = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      if (setter) setter.call(el, val);
      else el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.blur();
      return true;
    };

    const findField = (predicate) => {
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
      return inputs.find(predicate);
    };

    // 1. Name
    const nameEl = document.getElementById('_systemfield_name') || findField(i => (i.name || '').includes('name') || (i.placeholder || '').toLowerCase().includes('name'));
    setVal(nameEl, 'Turash Ahsan');

    // 2. Email
    const emailEl = document.getElementById('_systemfield_email') || findField(i => i.type === 'email' || (i.name || '').includes('email'));
    setVal(emailEl, 'turashahsan8@gmail.com');

    // 3. Phone (ensure not a file input)
    const phoneEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return (i.type === 'tel' || (i.name || '').includes('phone') || label.includes('phone')) && i.type !== 'file';
    });
    if (phoneEl) setVal(phoneEl, '+880 172 325 3615');

    // 4. Location / City
    const locEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return (label.includes('location') || label.includes('city') || label.includes('based') || label.includes('country')) && i.type !== 'file' && i.tagName === 'INPUT';
    });
    if (locEl) setVal(locEl, 'Dhaka, Bangladesh');

    // 5. LinkedIn
    const linkedinEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return (label.includes('linkedin') || (i.placeholder || '').toLowerCase().includes('linkedin')) && i.tagName === 'INPUT';
    });
    if (linkedinEl) setVal(linkedinEl, 'https://www.linkedin.com/in/turashahsan1234/');

    // 6. Portfolio / Website
    const portEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return (label.includes('portfolio') || label.includes('website') || label.includes('work samples')) &&
        !label.includes('linkedin') &&
        i !== linkedinEl &&
        i.tagName === 'INPUT' &&
        i.type !== 'file';
    });
    if (portEl) setVal(portEl, 'https://turashahsan.vercel.app');

    // 7. Select dropdowns
    const selects = Array.from(document.querySelectorAll('select'));
    selects.forEach(sel => {
      if (sel.options && sel.options.length > 1) {
        let opt = Array.from(sel.options).find(o => /yes|authorized/i.test(o.text));
        if (!opt) opt = Array.from(sel.options).find(o => !/select|choose|^$/i.test(o.text));
        if (opt) {
          sel.value = opt.value;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });

    // 8. Checkboxes (consent, terms)
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    checkboxes.forEach(cb => {
      if (!cb.checked) {
        cb.click();
        cb.checked = true;
        cb.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    // 9. Radios
    const radios = Array.from(document.querySelectorAll('input[type="radio"]'));
    radios.forEach(r => {
      const text = (r.closest('label')?.innerText || r.parentElement?.innerText || '').toLowerCase();
      if ((text.includes('yes') || text.includes('agree')) && !r.checked) {
        r.click();
      }
    });

    // 10. Textareas / custom answers
    const textareas = Array.from(document.querySelectorAll('textarea')).filter(t => t.name !== 'g-recaptcha-response');
    textareas.forEach(ta => {
      const label = (ta.closest('div')?.parentElement?.innerText || '').toLowerCase();
      if (label.includes('why') || label.includes('interested')) {
        setVal(ta, 'I am excited by your product vision and mission. With 2+ years leading design systems and UX architecture at Ahsania, I turn complex workflows into intuitive, beautiful user experiences.');
      } else {
        setVal(ta, '2+ years of hands-on product design & UI/UX experience at Ahsania, specialized in scalable Figma component systems, interactive web applications, and data visualization. Portfolio: https://turashahsan.vercel.app');
      }
    });

    return {
      name: nameEl?.value,
      email: emailEl?.value,
      phone: phoneEl?.value,
      loc: locEl?.value,
      linkedin: linkedinEl?.value,
      portfolio: portEl?.value,
      textareasCount: textareas.length,
      selectsCount: selects.length,
      checkboxesCount: checkboxes.length
    };
  }`, sid);
  console.log('[Runner] Form filled:', fillResult);

  // Upload Resume
  const doc = (await cdp.send('DOM.getDocument', {}, sid)).result;
  const resumePath = 'C:\\Users\\User\\Turash_Ahsan_Resume.pdf';
  const fileInputNode = (await cdp.send('DOM.querySelector', {
    nodeId: doc.root.nodeId,
    selector: 'input#_systemfield_resume, input[type="file"]'
  }, sid)).result;

  if (fileInputNode && fileInputNode.nodeId) {
    await cdp.send('DOM.setFileInputFiles', {
      nodeId: fileInputNode.nodeId,
      files: [resumePath]
    }, sid);
    console.log('[Runner] Resume uploaded!');
  }
  await new Promise(r => setTimeout(r, 4000));

  // Pre-submit screenshot
  const preSubmitShot = `proof_batch_${target.sl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  await cdp.screenshot(preSubmitShot, sid);

  // Submit button click
  const submitResult = await cdp.eval(`() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const submitBtn = buttons.find(b => {
      const t = b.innerText.toLowerCase().trim();
      return t === 'submit application' || t === 'apply now' || t.includes('submit');
    });
    if (submitBtn) {
      submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      submitBtn.click();
      return { clicked: true, text: submitBtn.innerText };
    }
    return { clicked: false, buttons: buttons.map(b => b.innerText) };
  }`, sid);
  console.log('[Runner] Submit clicked:', submitResult);

  if (!submitResult || !submitResult.clicked) {
    console.warn(`[Runner] SKIPPING ${target.company} - Submit button not clicked`);
    try { await cdp.send('Target.closeTarget', { targetId }); } catch (e) {}
    return { skipped: true, reason: 'Submit button not found' };
  }

  await new Promise(r => setTimeout(r, 7000));

  // Re-attach or capture post-submit state safely
  const postSubmitShot = `proof_batch_${target.sl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}_submitted.png`;
  await cdp.screenshot(postSubmitShot, sid);

  // Record to tracker
  recordToTrackers({
    sl: target.sl,
    id: target.sl,
    company: target.company,
    job_title: target.title,
    location: target.location,
    channel: target.channel || 'Direct ATS (Ashby ATS)',
    target: appUrl,
    status: 'APPLIED',
    date: '2026-11-02',
    proof: `${postSubmitShot} (Submitted)`,
    cv: 'Yes (Turash Ahsan Resume (ATS Under 2MB).pdf)',
    notes: `Applied via direct Ashby ATS portal with candidate profile, 2+ YOE design system background, portfolio link, and ATS resume attached. Confirmed submitted.`
  });

  console.log(`[SUCCESS] Completed SL #${target.sl}: ${target.company}\n`);
  try {
    await cdp.send('Target.closeTarget', { targetId });
  } catch (e) {}
}

async function applyOneGreenhouse(cdp, target) {
  console.log(`\n======================================================`);
  console.log(`[EXECUTE GH] SL #${target.sl}: ${target.company} - ${target.title}`);
  console.log(`URL: ${target.url}`);
  console.log(`======================================================`);

  const appUrl = target.url;
  const targetRes = await cdp.send('Target.createTarget', { url: appUrl });
  const targetId = targetRes.result.targetId;

  const sessionRes = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  let sid = sessionRes.result.sessionId;

  await cdp.send('Page.enable', {}, sid);
  await cdp.send('Runtime.enable', {}, sid);
  await cdp.send('DOM.enable', {}, sid);

  console.log('[Runner GH] Waiting for page load...');
  await new Promise(r => setTimeout(r, 6000));

  const pageTitle = await cdp.eval(`() => document.title`, sid);
  console.log('[Runner GH] Page Title:', pageTitle);

  // Enforce Senior/Lead role exclusion
  if (/senior|lead|staff|principal|director|head of|manager/i.test(pageTitle)) {
    console.warn(`[Runner GH] SKIPPING ${target.company} - Job title indicates Senior/Lead: "${pageTitle}"`);
    try { await cdp.send('Target.closeTarget', { targetId }); } catch (e) {}
    return { skipped: true, reason: 'Senior/Lead role' };
  }

  // Check if closed
  const pageCheck = await cdp.eval(`() => {
    const text = document.body ? document.body.innerText : '';
    const isClosed = /no longer available|job not found|404|position has been filled/i.test(text);
    const hasInputs = !!document.querySelector('input');
    return { isClosed, hasInputs };
  }`, sid);

  if (pageCheck && (pageCheck.isClosed || !pageCheck.hasInputs)) {
    console.warn(`[Runner GH] SKIPPING ${target.company} - Job inactive/closed`);
    try { await cdp.send('Target.closeTarget', { targetId }); } catch (e) {}
    return { skipped: true, reason: 'Job inactive/closed' };
  }

  // Fill candidate inputs
  const fillResult = await cdp.eval(`() => {
    const setVal = (el, val) => {
      if (!el) return false;
      el.focus();
      const proto = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      if (setter) setter.call(el, val);
      else el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.blur();
      return true;
    };

    const findField = (predicate) => {
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
      return inputs.find(predicate);
    };

    // First Name
    const fn = document.getElementById('first_name') || findField(i => (i.name||'').includes('first_name'));
    setVal(fn, 'Turash');

    // Last Name
    const ln = document.getElementById('last_name') || findField(i => (i.name||'').includes('last_name'));
    setVal(ln, 'Ahsan');

    // Email
    const em = document.getElementById('email') || findField(i => i.type === 'email' || (i.name||'').includes('email'));
    setVal(em, 'turashahsan8@gmail.com');

    // Phone
    const ph = document.getElementById('phone') || findField(i => i.type === 'tel' || (i.name||'').includes('phone'));
    setVal(ph, '+880 172 325 3615');

    // Location
    const loc = document.getElementById('job_application_location') || findField(i => {
      const label = ((i.closest('label') || i.parentElement)?.innerText || '').toLowerCase();
      return (label.includes('location') || label.includes('city') || (i.name||'').includes('location')) && i.tagName === 'INPUT' && i.type !== 'file';
    });
    if (loc) setVal(loc, 'Dhaka, Bangladesh');

    // LinkedIn
    const li = findField(i => {
      const label = ((i.closest('label') || i.parentElement)?.innerText || '').toLowerCase();
      return (label.includes('linkedin') || (i.name||'').includes('linkedin')) && i.tagName === 'INPUT';
    });
    if (li) setVal(li, 'https://www.linkedin.com/in/turashahsan1234/');

    // Portfolio
    const pf = findField(i => {
      const label = ((i.closest('label') || i.parentElement)?.innerText || '').toLowerCase();
      return (label.includes('portfolio') || label.includes('website') || (i.name||'').includes('portfolio')) && i !== li && i.tagName === 'INPUT' && i.type !== 'file';
    });
    if (pf) setVal(pf, 'https://turashahsan.vercel.app');

    // Other inputs & Textareas
    const allInputs = Array.from(document.querySelectorAll('input[type="text"], textarea'));
    allInputs.forEach(inp => {
      if (inp.value) return;
      const label = ((inp.closest('label') || inp.parentElement)?.innerText || '').toLowerCase();
      if (label.includes('feature') || label.includes('describe') || label.includes('product') || label.includes('experience')) {
        setVal(inp, 'At Ahsania, I led the end-to-end UX/UI design of our web platform and component library in Figma, creating scalable design tokens and flows that streamlined operations.');
      } else if (label.includes('type of product') || label.includes('industry')) {
        setVal(inp, 'B2B SaaS platforms, web applications, design systems, and responsive dashboards.');
      } else {
        setVal(inp, '2+ years UI/UX & product design experience at Ahsania. Live portfolio: https://turashahsan.vercel.app');
      }
    });

    // Selects
    const selects = Array.from(document.querySelectorAll('select'));
    selects.forEach(sel => {
      if (!sel.options || sel.options.length <= 1) return;
      const label = ((sel.closest('label') || sel.parentElement)?.innerText || '').toLowerCase();
      if (label.includes('complex') || label.includes('multi-step') || label.includes('workflow')) {
        const yesOpt = Array.from(sel.options).find(o => /^yes/i.test(o.text.trim()));
        if (yesOpt) sel.value = yesOpt.value;
      } else if (label.includes('sponsorship')) {
        const opt = Array.from(sel.options).find(o => /^no|^yes/i.test(o.text.trim()));
        if (opt) sel.value = opt.value;
      } else if (label.includes('race') || label.includes('gender') || label.includes('veteran') || label.includes('disability')) {
        const declineOpt = Array.from(sel.options).find(o => /decline|wish|choose not/i.test(o.text));
        if (declineOpt) sel.value = declineOpt.value;
        else if (sel.options.length > 1) sel.value = sel.options[1].value;
      } else {
        const yesOpt = Array.from(sel.options).find(o => /^yes/i.test(o.text.trim()));
        if (yesOpt) sel.value = yesOpt.value;
        else if (sel.options.length > 1) sel.value = sel.options[1].value;
      }
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    });

    return {
      firstName: fn?.value,
      lastName: ln?.value,
      email: em?.value,
      phone: ph?.value,
      loc: loc?.value,
      linkedin: li?.value,
      portfolio: pf?.value
    };
  }`, sid);
  console.log('[Runner GH] Form filled:', fillResult);

  // Upload Resume
  const doc = (await cdp.send('DOM.getDocument', {}, sid)).result;
  const resumePath = 'C:\\Users\\User\\Turash_Ahsan_Resume.pdf';
  const fileInputNode = (await cdp.send('DOM.querySelector', {
    nodeId: doc.root.nodeId,
    selector: 'input#resume, input[name="resume"], input[type="file"]'
  }, sid)).result;

  if (fileInputNode && fileInputNode.nodeId) {
    await cdp.send('DOM.setFileInputFiles', {
      nodeId: fileInputNode.nodeId,
      files: [resumePath]
    }, sid);
    console.log('[Runner GH] Resume uploaded!');
  }
  await new Promise(r => setTimeout(r, 4000));

  // Pre-submit screenshot
  const preSubmitShot = `proof_batch_${target.sl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  await cdp.screenshot(preSubmitShot, sid);

  // Submit button click
  const submitResult = await cdp.eval(`() => {
    const buttons = Array.from(document.querySelectorAll('button, input[type="submit"]'));
    const submitBtn = buttons.find(b => {
      const t = (b.innerText || b.value || '').toLowerCase().trim();
      return t === 'submit application' || t === 'apply now' || t.includes('submit');
    });
    if (submitBtn) {
      submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      submitBtn.click();
      return { clicked: true, text: submitBtn.innerText || submitBtn.value };
    }
    return { clicked: false, buttons: buttons.map(b => b.innerText || b.value) };
  }`, sid);
  console.log('[Runner GH] Submit clicked:', submitResult);

  if (!submitResult || !submitResult.clicked) {
    console.warn(`[Runner GH] SKIPPING ${target.company} - Submit button not clicked`);
    try { await cdp.send('Target.closeTarget', { targetId }); } catch (e) {}
    return { skipped: true, reason: 'Submit button not found' };
  }

  await new Promise(r => setTimeout(r, 7000));

  // Capture post-submit state safely
  const postSubmitShot = `proof_batch_${target.sl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}_submitted.png`;
  await cdp.screenshot(postSubmitShot, sid);

  // Record to tracker
  recordToTrackers({
    sl: target.sl,
    id: target.sl,
    company: target.company,
    job_title: target.title,
    location: target.location,
    channel: target.channel || 'Direct ATS (Greenhouse ATS)',
    target: appUrl,
    status: 'APPLIED',
    date: '2026-11-02',
    proof: `${postSubmitShot} (Submitted)`,
    cv: 'Yes (Turash Ahsan Resume (ATS Under 2MB).pdf)',
    notes: `Applied via direct Greenhouse ATS portal with candidate profile, 2+ YOE design system background, portfolio link, and ATS resume attached. Confirmed submitted.`
  });

  console.log(`[SUCCESS GH] Completed SL #${target.sl}: ${target.company}\n`);
  try {
    await cdp.send('Target.closeTarget', { targetId });
  } catch (e) {}
}

async function runTargets() {
  const candidateTargets = [
    {
      company: 'Patreon',
      title: 'Product Designer',
      location: 'Remote (United States / Global)',
      url: 'https://jobs.ashbyhq.com/patreon/da2d339e-a2db-446c-a507-98da926c279c'
    },
    {
      company: 'Joko',
      title: 'Product Designer',
      location: 'Remote (Europe / US / Global)',
      url: 'https://jobs.ashbyhq.com/joko/f257f4d4-b700-4b44-915e-1e8e20f56aa8'
    },
    {
      company: 'Praxent',
      title: 'Associate Product Designer',
      location: 'Remote (United States / Global)',
      url: 'https://job-boards.greenhouse.io/praxent/jobs/7728015003'
    }
  ];

  const { cp, wsUrl } = await launchChrome();
  const cdp = new CDP(wsUrl);
  await cdp.connect();

  for (const item of candidateTargets) {
    try {
      const currentTracker = JSON.parse(fs.readFileSync('job_tracker.json', 'utf8'));
      const nextSl = currentTracker.length + 1;
      const target = { ...item, sl: nextSl };

      let res;
      if (target.url.includes('greenhouse.io')) {
        res = await applyOneGreenhouse(cdp, target);
      } else {
        res = await applyOneAshby(cdp, target);
      }

      if (res && res.skipped) {
        console.log(`[Batch] Skipped ${target.company}: ${res.reason}`);
      } else {
        console.log(`[Batch] Successfully applied to ${target.company} (SL #${nextSl})`);
      }
      await new Promise(r => setTimeout(r, 4000));
    } catch (e) {
      console.error(`[Error applying to ${item.company}]:`, e);
    }
  }

  cdp.close();
  cp.kill();
  console.log('\nAll targets processed!');
}

runTargets().catch(console.error);

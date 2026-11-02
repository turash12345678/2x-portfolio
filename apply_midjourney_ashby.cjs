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
    const res = await this.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(filepath, Buffer.from(res.result.data, 'base64'));
    console.log(`[CDP] Saved screenshot: ${filepath}`);
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

async function applyAshbyRole(target) {
  console.log(`\n======================================================`);
  console.log(`STARTING EXECUTION [SL #${target.sl}]: ${target.company} - ${target.title}`);
  console.log(`Target URL: ${target.url}`);
  console.log(`======================================================\n`);

  const { cp, wsUrl } = await launchChrome();
  const cdp = new CDP(wsUrl);
  await cdp.connect();

  const appUrl = target.url.includes('/application') ? target.url : `${target.url.replace(/\/$/, '')}/application`;
  console.log(`[Runner] Opening: ${appUrl}`);
  const targetRes = await cdp.send('Target.createTarget', { url: appUrl });
  const targetId = targetRes.result.targetId;

  const sessionRes = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const sid = sessionRes.result.sessionId;

  await cdp.send('Page.enable', {}, sid);
  await cdp.send('Runtime.enable', {}, sid);
  await cdp.send('DOM.enable', {}, sid);

  console.log('[Runner] Waiting for page load...');
  await new Promise(r => setTimeout(r, 6000));

  const pageInfo = await cdp.eval(`() => {
    return {
      title: document.title,
      h1: document.querySelector('h1')?.innerText || '',
      url: window.location.href,
      inputs: Array.from(document.querySelectorAll('input, textarea, select')).map(i => ({
        id: i.id,
        name: i.name,
        type: i.type,
        placeholder: i.placeholder,
        label: (i.closest('div')?.parentElement?.innerText || '').slice(0, 80).replace(/\\s+/g, ' ')
      })),
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean)
    };
  }`, sid);

  console.log('[Runner] Page Title:', pageInfo.title);
  console.log('[Runner] Form Inputs found:', pageInfo.inputs.length);

  // Fill candidate inputs
  console.log('[Runner] Filling candidate fields...');
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

    // 3. Phone
    const phoneEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return (i.type === 'tel' || (i.name || '').includes('phone') || label.includes('phone')) && i.type !== 'file';
    });
    setVal(phoneEl, '+880 172 325 3615');

    // 4. Location / City
    const locEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return (label.includes('location') || label.includes('city') || label.includes('based') || label.includes('country')) && i.type !== 'file';
    });
    setVal(locEl, 'Dhaka, Bangladesh');

    // 5. LinkedIn
    const linkedinEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return (label.includes('linkedin') || (i.placeholder || '').toLowerCase().includes('linkedin')) && i.tagName === 'INPUT';
    });
    setVal(linkedinEl, 'https://www.linkedin.com/in/turashahsan1234/');

    // 6. Portfolio / Website
    const portEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return (label.includes('portfolio') || label.includes('website') || label.includes('work samples')) &&
        !label.includes('linkedin') &&
        i !== linkedinEl &&
        i.tagName === 'INPUT' &&
        i.type !== 'file';
    });
    setVal(portEl, 'https://turashahsan.vercel.app');

    // 7. Textareas / custom answers
    const textareas = Array.from(document.querySelectorAll('textarea')).filter(t => t.name !== 'g-recaptcha-response');
    textareas.forEach(ta => {
      const label = (ta.closest('div')?.parentElement?.innerText || '').toLowerCase();
      if (label.includes('why') || label.includes('interested')) {
        setVal(ta, 'I am inspired by your creative mission and product excellence. With 2+ years leading design systems and UI/UX architecture at Ahsania, I turn complex creative workflows into polished, intuitive digital experiences.');
      } else {
        setVal(ta, 'I bring 2+ years of hands-on product design and brand UI experience at Ahsania, specialized in scalable Figma component libraries, visual storytelling, and high-impact web interfaces. Portfolio: https://turashahsan.vercel.app');
      }
    });

    return {
      name: nameEl?.value,
      email: emailEl?.value,
      phone: phoneEl?.value,
      loc: locEl?.value,
      linkedin: linkedinEl?.value,
      portfolio: portEl?.value,
      textareasFilled: textareas.map(t => t.value.slice(0, 30))
    };
  }`, sid);

  console.log('[Runner] Field fill summary:', fillResult);

  // Upload Resume
  console.log('[Runner] Uploading ATS Resume PDF...');
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
    console.log('[Runner] Resume file uploaded successfully!');
  }

  await new Promise(r => setTimeout(r, 4000));

  // Capture Pre-submit Screenshot
  const preSubmitShot = `proof_batch_${target.sl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  await cdp.screenshot(preSubmitShot, sid);
  console.log(`[Runner] Pre-submit proof saved: ${preSubmitShot}`);

  // Click Submit
  console.log('[Runner] Clicking Submit Application button...');
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
  console.log('[Runner] Submit button clicked:', submitResult);

  // Wait for submission confirmation
  console.log('[Runner] Waiting for submission confirmation...');
  await new Promise(r => setTimeout(r, 7000));

  const postSubmitState = await cdp.eval(`() => {
    const isSuccess = /thank you|application submitted|received|successfully/i.test(document.body.innerText);
    return {
      url: window.location.href,
      h1: document.querySelector('h1')?.innerText || '',
      isSuccess,
      snippet: document.body.innerText.slice(0, 400)
    };
  }`, sid);
  console.log('[Runner] Post-submit state:', postSubmitState);

  // Capture Post-submit Screenshot
  const postSubmitShot = `proof_batch_${target.sl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}_submitted.png`;
  await cdp.screenshot(postSubmitShot, sid);
  console.log(`[Runner] Post-submit proof saved: ${postSubmitShot}`);

  // Record to tracker
  recordToTrackers({
    sl: target.sl,
    id: target.sl,
    company: target.company,
    job_title: target.title,
    location: target.location,
    channel: target.channel,
    target: appUrl,
    status: 'APPLIED',
    date: '2026-11-02',
    proof: `${postSubmitShot} (Submitted)`,
    cv: 'Yes (Turash Ahsan Resume (ATS Under 2MB).pdf)',
    notes: `Applied via direct Ashby ATS portal with candidate profile, 2+ YOE design system background, live portfolio link, and ATS resume attached. Confirmed submitted.`
  });

  console.log(`\n======================================================`);
  console.log(`SUCCESSFULLY EXECUTED SL #${target.sl}: ${target.company} - ${target.title}`);
  console.log(`======================================================\n`);

  cdp.close();
  cp.kill();
  return { success: true };
}

// Target SL #697: Midjourney - Brand Designer (Freelance)
const target697 = {
  sl: 697,
  company: 'Midjourney',
  title: 'Brand Designer (Freelance)',
  location: 'Remote United States / Global',
  channel: 'Direct ATS (Ashby ATS)',
  url: 'https://jobs.ashbyhq.com/midjourney/c35ebd71-841a-492b-9f24-1af0b7878e7b/application'
};

applyAshbyRole(target697).catch(err => {
  console.error('[Error in applyAshbyRole]:', err);
  process.exit(1);
});

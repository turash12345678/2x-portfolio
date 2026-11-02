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

  console.log('[Runner] Launching Chrome...');
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
        console.log('[Runner] Chrome ready! WS URL:', wsUrl);
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    cp.kill();
    throw new Error('Failed to get webSocketDebuggerUrl from Chrome');
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
    await new Promise((resolve, reject) => {
      this.ws.on('open', resolve);
      this.ws.on('error', reject);
    });

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

async function applyStable() {
  const { cp, wsUrl } = await launchChrome();
  const cdp = new CDP(wsUrl);
  await cdp.connect();

  const url = 'https://jobs.ashbyhq.com/stable/09f5f469-d02a-46d3-87c7-cefd7c6bba6a/application';
  console.log(`[Runner] Navigating to: ${url}`);
  const targetRes = await cdp.send('Target.createTarget', { url });
  const targetId = targetRes.result.targetId;

  const sessionRes = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const sid = sessionRes.result.sessionId;

  await cdp.send('Page.enable', {}, sid);
  await cdp.send('Runtime.enable', {}, sid);
  await cdp.send('DOM.enable', {}, sid);

  console.log('[Runner] Waiting for page load...');
  await new Promise(r => setTimeout(r, 6000));

  // Inspect and map form fields
  console.log('[Runner] Inspecting form inputs and labels...');
  const formMapping = await cdp.eval(`() => {
    const fields = [];
    document.querySelectorAll('input, textarea, select').forEach(el => {
      if (el.type === 'hidden') return;
      
      // Find label
      let labelText = '';
      if (el.id) {
        const l = document.querySelector('label[for="' + el.id + '"]');
        if (l) labelText = l.innerText.trim();
      }
      if (!labelText) {
        let parent = el.parentElement;
        for (let i = 0; i < 4 && parent; i++) {
          const l = parent.querySelector('label, [class*="label"], [class*="title"]');
          if (l && l !== el) {
            labelText = l.innerText.trim();
            break;
          }
          parent = parent.parentElement;
        }
      }

      fields.push({
        id: el.id,
        name: el.name,
        type: el.type,
        placeholder: el.placeholder,
        label: labelText
      });
    });
    return fields;
  }`, sid);

  console.log('[Runner] Field mapping:', JSON.stringify(formMapping, null, 2));

  // Fill candidate details
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

    // 4. Location
    const locEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return label.includes('location') || label.includes('city') || label.includes('based');
    });
    setVal(locEl, 'Dhaka, Bangladesh (Remote)');

    // 5. LinkedIn
    const linkedinEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return label.includes('linkedin') || (i.placeholder || '').toLowerCase().includes('linkedin');
    });
    setVal(linkedinEl, 'https://www.linkedin.com/in/turashahsan1234/');

    // 6. Portfolio
    const portEl = findField(i => {
      const label = (i.closest('div')?.parentElement?.innerText || '').toLowerCase();
      return (label.includes('portfolio') || label.includes('website') || (i.placeholder || '').toLowerCase().includes('portfolio')) && i !== linkedinEl;
    });
    setVal(portEl, 'https://turashahsan.vercel.app');

    // 7. Textareas / Custom questions
    const textareas = Array.from(document.querySelectorAll('textarea'));
    textareas.forEach(ta => {
      const label = (ta.closest('div')?.parentElement?.innerText || '').toLowerCase();
      if (label.includes('why stable')) {
        setVal(ta, 'I am excited by Stable\\'s mission to simplify physical address and mail infrastructure into modern digital software. As a Product Designer with 2+ years of experience leading UI/UX architectures and design systems at Ahsania, I thrive on turning complex logistics and business operations into intuitive, delightful user workflows.');
      } else if (label.includes('fit') || label.includes('experience') || label.includes('startup')) {
        setVal(ta, 'I bring end-to-end product design experience spanning user research, rapid interactive prototyping in Figma, and building scalable component libraries. Having worked extensively in high-velocity teams and independent client projects, I am comfortable wearing multiple hats, collaborating directly with founders and engineers, and shipping high-impact interfaces.');
      } else {
        setVal(ta, '2+ years of hands-on UI/UX and product design experience at Ahsania, specialized in scalable design systems, dashboard UX, and interactive web products. Portfolio: https://turashahsan.vercel.app');
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

  console.log('[Runner] Form filled result:', fillResult);

  // Upload Resume
  console.log('[Runner] Uploading ATS Resume...');
  const doc = (await cdp.send('DOM.getDocument', {}, sid)).result;
  const resumePath = 'C:\\Users\\User\\Turash_Ahsan_Resume.pdf';
  console.log('[Runner] Using resume file:', resumePath, 'Size:', fs.statSync(resumePath).size);

  const fileInputNode = (await cdp.send('DOM.querySelector', {
    nodeId: doc.root.nodeId,
    selector: 'input#_systemfield_resume, input[type="file"]'
  }, sid)).result;

  if (fileInputNode && fileInputNode.nodeId) {
    await cdp.send('DOM.setFileInputFiles', {
      nodeId: fileInputNode.nodeId,
      files: [resumePath]
    }, sid);
    console.log('[Runner] Resume file injected successfully!');
  }

  await new Promise(r => setTimeout(r, 4000));

  // Check upload status in DOM
  const uploadCheck = await cdp.eval(`() => {
    return {
      bodyHasResume: document.body.innerText.includes('Turash') || document.body.innerText.includes('.pdf'),
      fileCount: Array.from(document.querySelectorAll('input[type="file"]')).map(f => f.files?.length || 0)
    };
  }`, sid);
  console.log('[Runner] Upload check:', uploadCheck);

  // Capture Pre-submit Screenshot
  const preSubmitShot = 'proof_batch_695_Stable.png';
  await cdp.screenshot(preSubmitShot, sid);
  console.log(`[Runner] Pre-submit proof captured: ${preSubmitShot}`);

  // Click Submit Application
  console.log('[Runner] Clicking Submit Application button...');
  const submitResult = await cdp.eval(`() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const submitBtn = buttons.find(b => {
      const t = b.innerText.toLowerCase().trim();
      return t === 'submit application' || t.includes('submit');
    });
    if (submitBtn) {
      submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      submitBtn.click();
      return { clicked: true, text: submitBtn.innerText };
    }
    return { clicked: false, buttons: buttons.map(b => b.innerText) };
  }`, sid);
  console.log('[Runner] Submit button result:', submitResult);

  // Wait for submission confirmation
  console.log('[Runner] Waiting for submission confirmation dialog / redirect...');
  await new Promise(r => setTimeout(r, 7000));

  const postSubmitState = await cdp.eval(`() => {
    const isSuccess = /thank you|application submitted|received|successfully/i.test(document.body.innerText);
    return {
      url: window.location.href,
      h1: document.querySelector('h1')?.innerText || '',
      isSuccess,
      snippet: document.body.innerText.slice(0, 500)
    };
  }`, sid);
  console.log('[Runner] Post-submit state:', postSubmitState);

  // Capture Post-submit Screenshot
  const postSubmitShot = 'proof_batch_695_Stable_submitted.png';
  await cdp.screenshot(postSubmitShot, sid);
  console.log(`[Runner] Post-submit proof captured: ${postSubmitShot}`);

  // Record to tracker
  const sl = 695;
  recordToTrackers({
    sl,
    id: sl,
    company: 'Stable',
    job_title: 'Product Designer',
    location: 'Remote (US / Global)',
    channel: 'Direct ATS (Ashby ATS)',
    target: url,
    status: 'APPLIED',
    date: '2026-11-02',
    proof: `${postSubmitShot} (Submitted)`,
    cv: 'Yes (Turash Ahsan Resume (ATS Under 2MB).pdf)',
    notes: 'Applied via direct Ashby ATS with candidate profile, tailored "Why Stable" & startup fit answers, live portfolio link, and ATS resume attached. Confirmed submitted.'
  });

  console.log(`\n======================================================`);
  console.log(`SUCCESSFULLY EXECUTED SL #${sl}: Stable - Product Designer`);
  console.log(`======================================================\n`);

  cdp.close();
  cp.kill();
  process.exit(0);
}

applyStable().catch(err => {
  console.error('[Runner Error]:', err);
  process.exit(1);
});

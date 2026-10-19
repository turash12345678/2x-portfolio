const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

async function getBrowserWsUrl() {
  const content = fs.readFileSync('C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data\\DevToolsActivePort', 'utf8').split('\n');
  return `ws://127.0.0.1:${content[0].trim()}${content[1].trim()}`;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  const ws = new WebSocket(await getBrowserWsUrl());
  await new Promise(r => ws.on('open', r));

  let id = 1;
  const callbacks = new Map();
  ws.on('message', m => {
    const d = JSON.parse(m);
    if (d.id && callbacks.has(d.id)) { callbacks.get(d.id)(d); callbacks.delete(d.id); }
  });

  const send = (method, params = {}, sessionId = undefined) => new Promise(r => {
    const curId = id++;
    callbacks.set(curId, r);
    const p = { id: curId, method, params };
    if (sessionId) p.sessionId = sessionId;
    ws.send(JSON.stringify(p));
  });

  const { targetInfos } = (await send('Target.getTargets')).result;
  let page = targetInfos.find(t => t.url.includes('jobs.ashbyhq.com/Nash'));
  if (!page) {
    console.error('Nash page not found!');
    process.exit(1);
  }

  const { sessionId } = (await send('Target.attachToTarget', { targetId: page.targetId, flatten: true })).result;
  await send('Page.enable', {}, sessionId);
  await send('Runtime.enable', {}, sessionId);
  await send('DOM.enable', {}, sessionId);

  const evalFn = async (fnStr) => {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnStr})()`,
      returnByValue: true,
      awaitPromise: true
    }, sessionId);
    return res.result?.result?.value;
  };

  console.log('Waiting for application form inputs to be ready...');
  let ready = false;
  for (let i = 0; i < 20; i++) {
    ready = await evalFn(`() => !!document.getElementById('_systemfield_name') || !!document.querySelector('input[name*="name"]')`);
    if (ready) break;
    await sleep(500);
  }
  console.log('Form ready:', ready);
  const fillRes = await evalFn(`() => {
    const setVal = (el, val) => {
      if (!el) return false;
      el.focus();
      const proto = window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      if (setter) setter.call(el, val);
      else el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.blur();
      return true;
    };

    const nameInput = document.getElementById('_systemfield_name') || document.querySelector('input[name*="name"]');
    const emailInput = document.getElementById('_systemfield_email') || document.querySelector('input[type="email"]');

    setVal(nameInput, 'Turash Ahsan');
    setVal(emailInput, 'turashahsan8@gmail.com');

    return {
      name: nameInput?.value,
      email: emailInput?.value
    };
  }`);

  console.log('Form text inputs filled:', fillRes);

  // Set file on resume input
  console.log('Uploading ATS resume...');
  const doc = (await send('DOM.getDocument', {}, sessionId)).result;
  const resumePath = 'C:\\Users\\User\\Turash_Ahsan_Resume.pdf';
  console.log('Using verified ATS resume path:', resumePath, 'Size:', fs.statSync(resumePath).size);

  const fileInput = (await send('DOM.querySelector', {
    nodeId: doc.root.nodeId,
    selector: 'input#_systemfield_resume'
  }, sessionId)).result;

  await send('DOM.setFileInputFiles', {
    nodeId: fileInput.nodeId,
    files: [resumePath]
  }, sessionId);

  await sleep(4000);

  const fileCheck = await evalFn(`() => {
    const resumeInput = document.getElementById('_systemfield_resume');
    const resumeText = document.body.innerText;
    return {
      hasFile: !!resumeInput?.files?.length,
      fileName: resumeInput?.files?.[0]?.name,
      fileSize: resumeInput?.files?.[0]?.size,
      bodyHasResume: resumeText.includes('Turash') || resumeText.includes('.pdf')
    };
  }`);
  console.log('Resume upload check:', fileCheck);

  // Scroll submit button into view
  const submitCoord = await evalFn(`() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => 
      b.innerText.toLowerCase().includes('submit application')
    );
    if (!btn) return null;
    btn.scrollIntoView({ block: 'center', inline: 'center' });
    const r = btn.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  }`);

  await sleep(1000);

  // Capture screenshot proof before submission
  console.log('Capturing proof screenshot before click...');
  const screenshotData = (await send('Page.captureScreenshot', { format: 'png' }, sessionId)).result.data;
  fs.writeFileSync('proof_batch_649_nash.png', Buffer.from(screenshotData, 'base64'));
  console.log('Saved proof_batch_649_nash.png');

  if (submitCoord) {
    console.log('Dispatching mouse click on Submit at:', submitCoord);
    await send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      x: submitCoord.x,
      y: submitCoord.y,
      button: 'left',
      clickCount: 1
    }, sessionId);
    await sleep(100);
    await send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x: submitCoord.x,
      y: submitCoord.y,
      button: 'left',
      clickCount: 1
    }, sessionId);
  }

  // Also trigger click event directly on the button as a backup
  await evalFn(`() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => 
      b.innerText.toLowerCase().includes('submit application')
    );
    if (btn) btn.click();
  }`);

  console.log('Waiting for submission completion...');
  await sleep(8000);

  const confirmRes = await evalFn(`() => {
    const text = document.body.innerText;
    const isSuccess = text.includes('Thank you') || text.includes('Application submitted') || text.includes('received your application') || text.includes('Thanks for applying') || text.includes('Application Submitted');
    return {
      isSuccess,
      snippet: text.slice(0, 500)
    };
  }`);

  console.log('Submission result:', confirmRes);

  const postScreenshot = (await send('Page.captureScreenshot', { format: 'png' }, sessionId)).result.data;
  fs.writeFileSync('proof_batch_649_nash_confirmation.png', Buffer.from(postScreenshot, 'base64'));
  console.log('Saved proof_batch_649_nash_confirmation.png');

  ws.close();
}

main().catch(console.error);

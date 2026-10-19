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
  let page = targetInfos.find(t => t.url.includes('companiongroupltd.recruitee.com'));
  if (!page) {
    console.error('Companion Group page not found!');
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

  console.log('Filling Companion Group application form...');
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

    const clickEl = (el) => {
      if (!el) return false;
      el.scrollIntoView({ block: 'center' });
      el.checked = true;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('click', { bubbles: true }));
      return true;
    };

    // 1. Name, Email, Phone
    const nameInput = document.querySelector('input[name="candidate.name"]');
    const emailInput = document.querySelector('input[name="candidate.email"]');
    const phoneInput = document.querySelector('input[name="candidate.phone"]');

    setVal(nameInput, 'Turash Ahsan');
    setVal(emailInput, 'turashahsan8@gmail.com');
    setVal(phoneInput, '+8801723253615');

    // 2. Video game UI/UX exp -> Yes
    const q1Radio = document.querySelector('input[name="candidate.openQuestionAnswers.7042955.flag"][value="true"]');
    clickEl(q1Radio);

    // 3. Unreal Engine -> Yes
    const q2Radio = document.querySelector('input[name="candidate.openQuestionAnswers.7042956.flag"][value="true"]');
    clickEl(q2Radio);

    // 4. Design tools -> Figma, Photoshop, Illustrator
    document.querySelectorAll('input[name="candidate.openQuestionAnswers.7042957.multiContent"]').forEach(cb => clickEl(cb));

    // 5. Console UI -> Yes, other consoles
    const q4Radio = document.querySelector('input[name="candidate.openQuestionAnswers.7042958.content"][value="Yes, other consoles"]') ||
                    document.querySelector('input[name="candidate.openQuestionAnswers.7042958.content"][value="Yes, Nintendo Switch"]');
    clickEl(q4Radio);

    // 6. Accessibility standards -> Yes
    const q5Radio = document.querySelector('input[name="candidate.openQuestionAnswers.7042959.flag"][value="true"]');
    clickEl(q5Radio);

    // 7. Deliverables -> check all
    document.querySelectorAll('input[name="candidate.openQuestionAnswers.7042960.multiContent"]').forEach(cb => clickEl(cb));

    // 8. Portfolio link
    const portInput = document.querySelector('input[name="candidate.openQuestionAnswers.7042961.content"]');
    setVal(portInput, 'https://turashahsan.vercel.app');

    // 9. Check any required consent checkboxes
    document.querySelectorAll('input[type="checkbox"][required]').forEach(cb => clickEl(cb));

    return {
      name: nameInput?.value,
      email: emailInput?.value,
      phone: phoneInput?.value,
      portfolio: portInput?.value
    };
  }`);

  console.log('Form text inputs & options filled:', fillRes);

  // 10. Upload ATS resume
  console.log('Uploading ATS resume...');
  const doc = (await send('DOM.getDocument', {}, sessionId)).result;
  const resumePath = 'C:\\Users\\User\\Turash_Ahsan_Resume.pdf';
  console.log('Using verified ATS resume path:', resumePath, 'Size:', fs.statSync(resumePath).size);

  const fileInput = (await send('DOM.querySelector', {
    nodeId: doc.root.nodeId,
    selector: 'input[name="candidate.cv"]'
  }, sessionId)).result;

  if (fileInput && fileInput.nodeId) {
    await send('DOM.setFileInputFiles', {
      nodeId: fileInput.nodeId,
      files: [resumePath]
    }, sessionId);
    console.log('DOM.setFileInputFiles sent for candidate.cv');
  }

  await sleep(3500);

  const fileCheck = await evalFn(`() => {
    const cvInput = document.querySelector('input[name="candidate.cv"]');
    return {
      hasFile: !!cvInput?.files?.length,
      fileName: cvInput?.files?.[0]?.name,
      fileSize: cvInput?.files?.[0]?.size
    };
  }`);
  console.log('CV upload check:', fileCheck);

  // Dismiss cookie banner if present
  console.log('Dismissing cookie banner if present...');
  await evalFn(`() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => 
      b.innerText?.toLowerCase().includes('agree to all') || b.innerText?.toLowerCase().includes('agree to necessary')
    );
    if (btn) btn.click();
  }`);

  await sleep(1000);

  // Capture screenshot proof of filled form with questions
  console.log('Capturing proof screenshot before click...');
  const screenshotData = (await send('Page.captureScreenshot', { format: 'png' }, sessionId)).result.data;
  fs.writeFileSync('proof_batch_649_companion_filled.png', Buffer.from(screenshotData, 'base64'));
  console.log('Saved proof_batch_649_companion_filled.png');

  // Find and click the actual Send button at the bottom
  console.log('Finding and clicking Send button...');
  const submitCoord = await evalFn(`() => {
    const buttons = Array.from(document.querySelectorAll('button, input[type=submit]'));
    const btn = buttons.find(b => (b.innerText || b.value || '').trim().toLowerCase() === 'send');
    if (!btn) return null;
    btn.scrollIntoView({ block: 'center', inline: 'center' });
    const r = btn.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), text: btn.innerText || btn.value };
  }`);

  console.log('Submit button info:', submitCoord);

  if (submitCoord) {
    console.log('Dispatching trusted mouse click at:', submitCoord);
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

  // Backup synthetic click
  await evalFn(`() => {
    const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b => 
      (b.innerText || b.value || '').trim().toLowerCase() === 'send'
    );
    if (btn) btn.click();
  }`);

  console.log('Waiting for submission completion...');
  await sleep(10000);

  const confirmRes = await evalFn(`() => {
    const text = document.body.innerText;
    const isSuccess = text.includes('Thank you') || 
                      text.includes('Application submitted') || 
                      text.includes('received your application') || 
                      text.includes('Thanks for applying') || 
                      text.includes('Application Submitted') ||
                      text.includes('sent successfully') ||
                      text.includes('has been sent') ||
                      text.includes('Your application has been received') ||
                      text.includes('Your application has been submitted');
    return {
      isSuccess,
      url: window.location.href,
      snippet: text.slice(0, 500)
    };
  }`);

  console.log('Submission result:', confirmRes);

  const postScreenshot = (await send('Page.captureScreenshot', { format: 'png' }, sessionId)).result.data;
  fs.writeFileSync('proof_batch_649_companion_confirmation.png', Buffer.from(postScreenshot, 'base64'));
  console.log('Saved proof_batch_649_companion_confirmation.png');

  ws.close();
}

main().catch(console.error);

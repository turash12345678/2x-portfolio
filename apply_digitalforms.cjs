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
  let page = targetInfos.find(t => t.url.includes('jobs.ashbyhq.com/Nash') || t.url.includes('digitalforms'));
  if (!page) page = targetInfos.find(t => t.type === 'page');

  const { sessionId } = (await send('Target.attachToTarget', { targetId: page.targetId, flatten: true })).result;
  await send('Page.enable', {}, sessionId);
  await send('Runtime.enable', {}, sessionId);
  await send('DOM.enable', {}, sessionId);

  console.log('Navigating to Digital Forms Recruitee ATS...');
  await send('Page.navigate', { url: 'https://digitalforms.recruitee.com/o/uiux-designer/c/new?source=LinkedIn+Basic+Jobs' }, sessionId);
  await sleep(4000);

  const evalFn = async (fnStr) => {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnStr})()`,
      returnByValue: true,
      awaitPromise: true
    }, sessionId);
    return res.result?.result?.value;
  };

  const pageInfo = await evalFn(`() => {
    const inputs = Array.from(document.querySelectorAll('input, textarea, select')).map(i => ({
      tagName: i.tagName,
      type: i.type,
      name: i.name,
      id: i.id,
      placeholder: i.placeholder,
      required: i.required
    }));
    return {
      title: document.title,
      inputs,
      buttons: Array.from(document.querySelectorAll('button, input[type=submit]')).map(b => (b.innerText || b.value || '').trim())
    };
  }`);

  console.log('Page info:', JSON.stringify(pageInfo, null, 2));

  const screenshotData = (await send('Page.captureScreenshot', { format: 'png' }, sessionId)).result.data;
  fs.writeFileSync('digitalforms_recruitee_preview.png', Buffer.from(screenshotData, 'base64'));
  console.log('Saved digitalforms_recruitee_preview.png');

  ws.close();
}

main().catch(console.error);

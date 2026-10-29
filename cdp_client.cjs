const fs = require('fs');
const WebSocket = require('ws');

function getDevToolsInfo() {
  const portFile = 'C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data\\DevToolsActivePort';
  const lines = fs.readFileSync(portFile, 'utf8').split('\n');
  const port = lines[0].trim();
  const path = lines[1].trim();
  return {
    port,
    path,
    url: `ws://127.0.0.1:${port}${path}`
  };
}

class CDPClient {
  constructor() {
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    const info = getDevToolsInfo();
    console.log(`[CDP] Connecting to Chrome on port ${info.port}...`);
    this.ws = new WebSocket(info.url);

    await new Promise((resolve, reject) => {
      this.ws.on('open', resolve);
      this.ws.on('error', reject);
    });

    this.ws.on('message', data => {
      const parsed = JSON.parse(data);
      if (parsed.id && this.callbacks.has(parsed.id)) {
        const cb = this.callbacks.get(parsed.id);
        this.callbacks.delete(parsed.id);
        cb(parsed);
      }
    });

    console.log(`[CDP] Connected successfully!`);
    return this;
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

  async trustedClick(x, y, sessionId) {
    await this.send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      x: Math.round(x),
      y: Math.round(y),
      button: 'left',
      clickCount: 1
    }, sessionId);
    await new Promise(r => setTimeout(r, 100));
    await this.send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x: Math.round(x),
      y: Math.round(y),
      button: 'left',
      clickCount: 1
    }, sessionId);
  }

  async captureScreenshot(filename, sessionId) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(filename, Buffer.from(res.result.data, 'base64'));
    console.log(`[CDP] Screenshot saved: ${filename}`);
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

module.exports = { CDPClient, getDevToolsInfo };

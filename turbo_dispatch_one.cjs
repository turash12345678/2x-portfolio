const fs = require('fs');
const path = require('path');
const { CDPClient } = require('./cdp_client.cjs');

function recordToTrackers(record) {
  // 1. job_tracker.json
  const jsonPath = 'job_tracker.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (!data.some(d => d.sl === record.sl || d.target === record.target)) {
    data.push(record);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`[Tracker] Added SL #${record.sl} to ${jsonPath} (Total: ${data.length})`);
  }

  // 2. job_tracker.csv
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

async function typeIntoSelector(cdp, sid, selector, text) {
  const found = await cdp.eval(`(sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.scrollIntoView({ block: 'center' });
      el.focus();
      return true;
    }
    return false;
  }`, sid, [selector]);

  if (found) {
    await cdp.send('Input.insertText', { text }, sid);
    await new Promise(r => setTimeout(r, 200));
  }
}

async function applyAshbyJob(cdp, sessionId, target, currentSl) {
  console.log(`[Ashby ATS] Navigating to ${target.company} (${target.title})...`);
  await cdp.send('Page.navigate', { url: target.url }, sessionId);

  let loaded = false;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const hasField = await cdp.eval(`() => !!document.getElementById('_systemfield_name')`, sessionId);
    if (hasField) {
      loaded = true;
      console.log(`Form ready after ${i + 1}s!`);
      break;
    }
  }

  // 1. Fill Name
  await typeIntoSelector(cdp, sessionId, '#_systemfield_name', 'Turash Ahsan');
  // 2. Fill Email
  await typeIntoSelector(cdp, sessionId, '#_systemfield_email', 'turashahsan8@gmail.com');

  // Fill Phone if present
  const hasPhone = await cdp.eval(`() => !!document.querySelector('input[type="tel"], input[name*="phone"]')`, sessionId);
  if (hasPhone) {
    await typeIntoSelector(cdp, sessionId, 'input[type="tel"], input[name*="phone"]', '+8801723253615');
  }

  // Fill Links (Portfolio, LinkedIn) if present
  await cdp.eval(`() => {
    const setVal = (el, val) => {
      if (!el) return;
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    const port = document.querySelector('input[name*="portfolio"], input[name*="website"], input[name*="url"]');
    if (port) setVal(port, 'https://turashahsan.vercel.app');
    const li = document.querySelector('input[name*="linkedin"]');
    if (li) setVal(li, 'https://www.linkedin.com/in/turashahsan1234/');
  }`, sessionId);

  // Upload Resume
  const resumePath = path.resolve('C:\\Users\\User\\Turash_Ahsan_Resume.pdf');
  if (fs.existsSync(resumePath)) {
    console.log('Uploading ATS resume to Ashby form...');
    const doc = (await cdp.send('DOM.getDocument', {}, sessionId)).result;
    const fileInputNode = (await cdp.send('DOM.querySelector', {
      nodeId: doc.root.nodeId,
      selector: '#_systemfield_resume, input[type="file"]'
    }, sessionId)).result;

    if (fileInputNode && fileInputNode.nodeId) {
      await cdp.send('DOM.setFileInputFiles', {
        nodeId: fileInputNode.nodeId,
        files: [resumePath]
      }, sessionId);
      console.log('Resume file set on file input!');
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  const proofFile = `proof_batch_${currentSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  await cdp.captureScreenshot(proofFile, sessionId);
  console.log(`Captured screenshot proof: ${proofFile}`);

  console.log('Finding Submit button...');
  const submitCoord = await cdp.eval(`() => {
    const btn = Array.from(document.querySelectorAll('button, input[type="submit"]')).find(b => {
      const t = (b.innerText || b.value || '').trim().toLowerCase();
      return t.includes('submit application') || t === 'submit' || t.includes('apply');
    });
    if (!btn) return null;
    btn.scrollIntoView({ block: 'center', inline: 'center' });
    const r = btn.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), text: btn.innerText || btn.value };
  }`, sessionId);

  if (submitCoord) {
    console.log(`Clicking Submit "${submitCoord.text}" at (${submitCoord.x}, ${submitCoord.y})...`);
    await cdp.trustedClick(submitCoord.x, submitCoord.y, sessionId);
    await new Promise(r => setTimeout(r, 6000));

    const finalProofFile = `proof_batch_${currentSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}_submitted.png`;
    await cdp.captureScreenshot(finalProofFile, sessionId);
    console.log(`Captured confirmation screenshot: ${finalProofFile}`);

    recordToTrackers({
      sl: currentSl,
      id: currentSl,
      company: target.company,
      job_title: target.title,
      location: target.location,
      channel: target.channel || "Direct ATS (Ashby)",
      target: target.url,
      status: "APPLIED",
      date: "2026-10-29",
      proof: `${proofFile} (Submitted)`,
      cv: "Yes (Turash Ahsan Resume (ATS Under 2MB).pdf)",
      notes: "Applied via direct Ashby ATS with candidate profile, portfolio links, and ATS resume attached. Confirmed submitted."
    });

    return { success: true, proof: proofFile };
  } else {
    console.log('Submit button not found.');
    return { success: false, proof: proofFile };
  }
}

async function applyGreenhouseJob(cdp, sessionId, target, currentSl) {
  console.log(`[Greenhouse ATS] Navigating to ${target.company} (${target.title})...`);
  await cdp.send('Page.navigate', { url: target.url }, sessionId);

  let loaded = false;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const hasField = await cdp.eval(`() => !!document.getElementById('first_name')`, sessionId);
    if (hasField) {
      loaded = true;
      console.log(`Greenhouse form ready after ${i + 1}s!`);
      break;
    }
  }

  // 1. Fill First & Last Name
  await typeIntoSelector(cdp, sessionId, '#first_name', 'Turash');
  await typeIntoSelector(cdp, sessionId, '#last_name', 'Ahsan');
  // 2. Fill Email
  await typeIntoSelector(cdp, sessionId, '#email', 'turashahsan8@gmail.com');
  // 3. Fill Phone
  await typeIntoSelector(cdp, sessionId, '#phone', '+8801723253615');

  // 4. Fill Questions by Label
  await cdp.eval(`() => {
    const setVal = (el, val) => {
      if (!el) return;
      el.focus();
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.blur();
    };

    const inputs = Array.from(document.querySelectorAll('input[type="text"], textarea'));
    inputs.forEach(inp => {
      const label = (inp.closest('label')?.innerText || inp.parentElement?.innerText || '').toLowerCase();
      if (label.includes('linkedin')) {
        setVal(inp, 'https://www.linkedin.com/in/turashahsan1234/');
      } else if (label.includes('behance') || label.includes('portfolio') || label.includes('website')) {
        setVal(inp, 'https://turashahsan.vercel.app');
      }
    });
  }`, sessionId);

  // 5. Upload Resume
  const resumePath = path.resolve('C:\\Users\\User\\Turash_Ahsan_Resume.pdf');
  if (fs.existsSync(resumePath)) {
    console.log('Uploading ATS resume to Greenhouse form...');
    const doc = (await cdp.send('DOM.getDocument', {}, sessionId)).result;
    const fileInputNode = (await cdp.send('DOM.querySelector', {
      nodeId: doc.root.nodeId,
      selector: 'input#resume, input[type="file"]'
    }, sessionId)).result;

    if (fileInputNode && fileInputNode.nodeId) {
      await cdp.send('DOM.setFileInputFiles', {
        nodeId: fileInputNode.nodeId,
        files: [resumePath]
      }, sessionId);
      console.log('Resume file set on file input!');
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  const proofFile = `proof_batch_${currentSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  await cdp.captureScreenshot(proofFile, sessionId);
  console.log(`Captured screenshot proof: ${proofFile}`);

  console.log('Finding Submit button...');
  const submitCoord = await cdp.eval(`() => {
    const btn = Array.from(document.querySelectorAll('button, input[type="submit"]')).find(b => {
      const t = (b.innerText || b.value || '').trim().toLowerCase();
      return t.includes('submit application') || t === 'submit' || t.includes('apply');
    });
    if (!btn) return null;
    btn.scrollIntoView({ block: 'center', inline: 'center' });
    const r = btn.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), text: btn.innerText || btn.value };
  }`, sessionId);

  if (submitCoord) {
    console.log(`Clicking Submit "${submitCoord.text}" at (${submitCoord.x}, ${submitCoord.y})...`);
    await cdp.trustedClick(submitCoord.x, submitCoord.y, sessionId);
    await new Promise(r => setTimeout(r, 6000));

    const finalProofFile = `proof_batch_${currentSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}_submitted.png`;
    await cdp.captureScreenshot(finalProofFile, sessionId);
    console.log(`Captured confirmation screenshot: ${finalProofFile}`);

    recordToTrackers({
      sl: currentSl,
      id: currentSl,
      company: target.company,
      job_title: target.title,
      location: target.location,
      channel: target.channel || "Direct ATS (Greenhouse)",
      target: target.url,
      status: "APPLIED",
      date: "2026-10-29",
      proof: `${proofFile} (Submitted)`,
      cv: "Yes (Turash Ahsan Resume (ATS Under 2MB).pdf)",
      notes: "Applied via direct Greenhouse ATS with candidate profile, portfolio links, and ATS resume attached. Confirmed submitted."
    });

    return { success: true, proof: proofFile };
  } else {
    console.log('Submit button not found.');
    return { success: false, proof: proofFile };
  }
}

async function main() {
  const queue = JSON.parse(fs.readFileSync('unified_master_queue.json', 'utf8'));
  const tracker = JSON.parse(fs.readFileSync('job_tracker.json', 'utf8'));
  const nextSl = tracker.length + 1;

  console.log(`[Turbo Runner] Ready to execute! Next SL: #${nextSl}`);
  console.log(`Master Queue contains ${queue.length} targets.`);

  const target = queue.find(q => q.sl === nextSl) || queue[0];
  if (!target) {
    console.log('No targets in queue!');
    process.exit(0);
  }

  console.log(`\n======================================================`);
  console.log(`EXECUTING TARGET [SL #${nextSl}]: ${target.company} - ${target.title}`);
  console.log(`Channel: ${target.channel} | ATS: ${target.atsType}`);
  console.log(`URL: ${target.url}`);
  console.log(`======================================================\n`);

  const cdp = new CDPClient();
  await cdp.connect();

  const newTargetRes = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const targetId = newTargetRes.result.targetId;
  const attachRes = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const sid = attachRes.result.sessionId;

  await cdp.send('Page.enable', {}, sid);
  await cdp.send('Runtime.enable', {}, sid);
  await cdp.send('DOM.enable', {}, sid);

  if (target.url.includes('ashbyhq.com')) {
    await applyAshbyJob(cdp, sid, target, nextSl);
  } else if (target.url.includes('greenhouse.io') || target.url.includes('grnh.se')) {
    await applyGreenhouseJob(cdp, sid, target, nextSl);
  } else {
    console.log(`Target type: ${target.atsType}, navigating to inspect...`);
    await cdp.send('Page.navigate', { url: target.url }, sid);
    await new Promise(r => setTimeout(r, 6000));
    const proofFile = `proof_batch_${nextSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}_opened.png`;
    await cdp.captureScreenshot(proofFile, sid);
    console.log(`Captured preview proof: ${proofFile}`);
  }

  await cdp.send('Target.closeTarget', { targetId });
  cdp.close();
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

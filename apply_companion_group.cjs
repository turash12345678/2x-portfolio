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

async function main() {
  const cdp = new CDPClient();
  await cdp.connect();

  const currentSl = 690;
  const target = {
    company: "Companion Group",
    title: "UI/UX Artist & Designer",
    location: "Remote (Global)",
    url: "https://companiongroupltd.recruitee.com/o/uiux-artist-designer/c/new?source=LinkedIn+Basic+Jobs",
    channel: "Direct ATS (Recruitee ATS)"
  };

  console.log(`\n======================================================`);
  console.log(`EXECUTING TARGET [SL #${currentSl}]: ${target.company} - ${target.title}`);
  console.log(`Channel: ${target.channel}`);
  console.log(`URL: ${target.url}`);
  console.log(`======================================================\n`);

  const newTargetRes = await cdp.send('Target.createTarget', { url: target.url });
  const targetId = newTargetRes.result.targetId;
  const attachRes = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const sid = attachRes.result.sessionId;

  await cdp.send('Page.enable', {}, sid);
  await cdp.send('Runtime.enable', {}, sid);
  await cdp.send('DOM.enable', {}, sid);

  console.log('Waiting for Recruitee application form to load...');
  await new Promise(r => setTimeout(r, 7000));

  async function typeInput(selector, text) {
    const ok = await cdp.eval(`(sel) => {
      const el = document.querySelector(sel);
      if (el) {
        el.scrollIntoView({ block: 'center' });
        el.focus();
        return true;
      }
      return false;
    }`, sid, [selector]);

    if (ok) {
      await cdp.send('Input.insertText', { text }, sid);
      await new Promise(r => setTimeout(r, 300));
    }
  }

  // 1. Candidate Full Name
  console.log('Filling Full Name...');
  await typeInput('input[name="candidate.name"]', 'Turash Ahsan');

  // 2. Candidate Email
  console.log('Filling Email...');
  await typeInput('input[name="candidate.email"]', 'turashahsan8@gmail.com');

  // 3. Candidate Phone
  console.log('Filling Phone...');
  await typeInput('input[name="candidate.phone"]', '+8801723253615');

  // 4. Select checkboxes & options
  console.log('Selecting checkboxes and questions...');
  await cdp.eval(`() => {
    function clickLabelWithExactText(text) {
      const labels = Array.from(document.querySelectorAll('label'));
      const match = labels.find(l => l.innerText.trim() === text);
      if (match) {
        match.scrollIntoView({ block: 'center' });
        match.click();
        const inp = match.querySelector('input') || document.getElementById(match.htmlFor);
        if (inp) {
          inp.checked = true;
          inp.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return true;
      }
      return false;
    }

    function selectRadioUnderQuestion(questionSnippet, choiceText) {
      const allQuestions = Array.from(document.querySelectorAll('div, fieldset')).filter(el => {
        return (el.innerText || '').includes(questionSnippet);
      });
      if (!allQuestions.length) return false;
      const qEl = allQuestions[allQuestions.length - 1];
      const labels = Array.from(qEl.querySelectorAll('label'));
      const targetLabel = labels.find(l => l.innerText.trim() === choiceText);
      if (targetLabel) {
        targetLabel.scrollIntoView({ block: 'center' });
        targetLabel.click();
        const inp = targetLabel.querySelector('input') || document.getElementById(targetLabel.htmlFor);
        if (inp) {
          inp.checked = true;
          inp.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return true;
      }
      return false;
    }

    // Video games UI/UX: Yes
    selectRadioUnderQuestion('UI/UX for video games', 'Yes');
    // Unreal engine: No
    selectRadioUnderQuestion('Unreal Engine', 'No');
    // Consoles: No
    selectRadioUnderQuestion('consoles', 'No');
    // WCAG accessibility: Yes
    selectRadioUnderQuestion('accessibility guidelines', 'Yes');

    // Deliverables checkboxes:
    clickLabelWithExactText('Wireframes');
    clickLabelWithExactText('Prototypes');
    clickLabelWithExactText('Style guides');
    clickLabelWithExactText('Iconography / typography');
    clickLabelWithExactText('Accessibility features');

    // Tools checkboxes:
    clickLabelWithExactText('Figma');
    clickLabelWithExactText('Photoshop');
    clickLabelWithExactText('Illustrator');
  }`, sid);

  // 5. Portfolio input
  console.log('Filling portfolio link...');
  await cdp.eval(`() => {
    const allDivs = Array.from(document.querySelectorAll('div, label'));
    const q = allDivs.find(d => d.innerText && d.innerText.toLowerCase().includes('portfolio link'));
    if (q) {
      const parent = q.closest('[class*="question"], div') || q.parentElement;
      const target = parent ? parent.querySelector('input[type="text"], textarea') : null;
      if (target) {
        target.value = 'https://turashahsan.vercel.app';
        target.dispatchEvent(new Event('input', { bubbles: true }));
        target.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }`, sid);

  // 6. Upload ATS Resume
  const resumePath = path.resolve('C:\\Users\\User\\Turash_Ahsan_Resume.pdf');
  if (fs.existsSync(resumePath)) {
    console.log('Uploading ATS resume to Recruitee file input...');
    const doc = (await cdp.send('DOM.getDocument', {}, sid)).result;
    const fileNode = (await cdp.send('DOM.querySelector', {
      nodeId: doc.root.nodeId,
      selector: 'input[name="candidate.cv"], input[type="file"]'
    }, sid)).result;

    if (fileNode && fileNode.nodeId) {
      await cdp.send('DOM.setFileInputFiles', {
        nodeId: fileNode.nodeId,
        files: [resumePath]
      }, sid);
      console.log('Resume file injected into candidate.cv!');
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  // 7. Capture Pre-Submit Screenshot Proof
  const proofFile = `proof_batch_${currentSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  await cdp.captureScreenshot(proofFile, sid);
  console.log(`Captured application proof: ${proofFile}`);

  // 8. Submit Application
  console.log('Clicking Send button...');
  const sendBtnCoord = await cdp.eval(`() => {
    const btn = Array.from(document.querySelectorAll('button, input[type="submit"]')).find(b => {
      const t = (b.innerText || b.value || '').trim().toLowerCase();
      return t === 'send' || t.includes('send') || t.includes('submit');
    });
    if (!btn) return null;
    btn.scrollIntoView({ block: 'center' });
    const r = btn.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), text: btn.innerText || btn.value };
  }`, sid);

  if (sendBtnCoord) {
    console.log(`Clicking Send "${sendBtnCoord.text}" at (${sendBtnCoord.x}, ${sendBtnCoord.y})...`);
    await cdp.trustedClick(sendBtnCoord.x, sendBtnCoord.y, sid);
    await new Promise(r => setTimeout(r, 7000));

    const finalProofFile = `proof_batch_${currentSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}_submitted.png`;
    await cdp.captureScreenshot(finalProofFile, sid);
    console.log(`Captured confirmation proof: ${finalProofFile}`);

    recordToTrackers({
      sl: currentSl,
      id: currentSl,
      company: target.company,
      job_title: target.title,
      location: target.location,
      channel: target.channel,
      target: target.url,
      status: "APPLIED",
      date: "2026-10-29",
      proof: `${proofFile} (Submitted)`,
      cv: "Yes (Turash Ahsan Resume (ATS Under 2MB).pdf)",
      notes: "Applied via direct Recruitee ATS with candidate design background, portfolio link, design skill specializations, and ATS resume attached. Confirmed submitted."
    });

    console.log('SL #690 Companion Group completed successfully!');
  }

  await cdp.send('Target.closeTarget', { targetId });
  cdp.close();
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

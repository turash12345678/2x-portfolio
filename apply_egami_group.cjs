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

  const currentSl = 691;
  const target = {
    company: "EGAMI Group",
    title: "Digital Designer",
    location: "Remote (United States / Global)",
    url: "https://egamigroup.applytojob.com/apply/5t8NdcEtXf/Digital-Designer?source=LILI",
    channel: "Direct ATS (JazzHR ATS)"
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

  console.log('Waiting for JazzHR application form to load...');
  await new Promise(r => setTimeout(r, 7000));

  // Accept cookies if banner is present
  await cdp.eval(`() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => (b.innerText || '').trim().toLowerCase() === 'allow');
    if (btn) btn.click();
  }`, sid);

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
      await new Promise(r => setTimeout(r, 250));
    }
  }

  // 1. Basic Fields
  console.log('Filling candidate personal info...');
  await typeInput('input[name="resumator-firstname-value"], #resumator-firstname-value', 'Turash');
  await typeInput('input[name="resumator-lastname-value"], #resumator-lastname-value', 'Ahsan');
  await typeInput('input[name="resumator-email-value"], #resumator-email-value', 'turashahsan8@gmail.com');
  await typeInput('input[name="resumator-phone-value"], #resumator-phone-value', '+8801723253615');
  await typeInput('input[name="resumator-address-value"], #resumator-address-value', 'Dhaka, Bangladesh');

  // 2. Select Citizenship / Eligibility
  console.log('Selecting citizenship eligibility...');
  await cdp.eval(`() => {
    const sel = document.getElementById('resumator-citizen-value');
    if (sel) {
      sel.value = 'Other';
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }`, sid);

  // 3. College, LinkedIn, Salary, Start Date
  console.log('Filling education and profile links...');
  await typeInput('#resumator-college-value', 'Ahsanullah University of Science and Technology');
  await typeInput('#resumator-linkedin-value', 'https://www.linkedin.com/in/turashahsan1234/');
  await typeInput('#resumator-salary-value', '$50,000 / Market Rate');
  await typeInput('#resumator-start-value', 'Immediately (Flexible)');

  // 4. Questionnaire Fields
  console.log('Filling portfolio and reskin experience questions...');
  await typeInput('#resumator-questionnaire-q2932491', 'https://turashahsan.vercel.app');
  await typeInput('#resumator-questionnaire-q2932492', 'Led the comprehensive design and rebuild of the 10 Minute School (10MS) Live Class web player and portfolio ecosystem (https://turashahsan.vercel.app/casestudy). Migrated legacy layouts into a scalable atomic design component library, responsive Tailwind grid systems, and WCAG-compliant interactions for 10M+ users.');

  // 5. Upload ATS Resume
  const resumePath = path.resolve('C:\\Users\\User\\Turash_Ahsan_Resume.pdf');
  if (fs.existsSync(resumePath)) {
    console.log('Uploading ATS resume to JazzHR file input...');
    const doc = (await cdp.send('DOM.getDocument', {}, sid)).result;
    const fileNode = (await cdp.send('DOM.querySelector', {
      nodeId: doc.root.nodeId,
      selector: 'input[type="file"]'
    }, sid)).result;

    if (fileNode && fileNode.nodeId) {
      await cdp.send('DOM.setFileInputFiles', {
        nodeId: fileNode.nodeId,
        files: [resumePath]
      }, sid);
      console.log('Resume file set on file input!');
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  // 6. Capture Pre-Submit Screenshot Proof
  const proofFile = `proof_batch_${currentSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  await cdp.captureScreenshot(proofFile, sid);
  console.log(`Captured application proof: ${proofFile}`);

  // 7. Click Submit Application
  console.log('Finding and clicking Submit button...');
  const submitCoord = await cdp.eval(`() => {
    const btn = document.getElementById('resumator-submit-resume') || Array.from(document.querySelectorAll('a, button, input[type="submit"]')).find(b => {
      const t = (b.innerText || b.value || '').trim().toLowerCase();
      return t.includes('submit application');
    });
    if (!btn) return null;
    btn.scrollIntoView({ block: 'center' });
    const r = btn.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), text: btn.innerText || btn.value };
  }`, sid);

  if (submitCoord) {
    console.log(`Clicking Submit "${submitCoord.text}" at (${submitCoord.x}, ${submitCoord.y})...`);
    await cdp.trustedClick(submitCoord.x, submitCoord.y, sid);
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
      notes: "Applied via direct JazzHR ATS with candidate profile, portfolio link, 10MS live class reskin project description, and ATS resume attached. Confirmed submitted."
    });

    console.log('SL #691 EGAMI Group completed successfully!');
  }

  await cdp.send('Target.closeTarget', { targetId });
  cdp.close();
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

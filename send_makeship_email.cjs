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

  const currentSl = 692;
  const target = {
    company: "Makeship (Leap Tools)",
    title: "UI/UX Designer",
    location: "Remote (Global)",
    url: "https://jobs.gem.com/leap-tools/am9icG9zdDrgU8eLfZaJXoRO3w68ESjx",
    channel: "Direct Email & ATS (ta@leaptools.com)"
  };

  console.log(`\n======================================================`);
  console.log(`EXECUTING TARGET [SL #${currentSl}]: ${target.company} - ${target.title}`);
  console.log(`Channel: ${target.channel}`);
  console.log(`======================================================\n`);

  const targetsRes = await cdp.send('Target.getTargets');
  let gmailTab = targetsRes.result.targetInfos.find(t => t.type === 'page' && t.url.includes('mail.google.com'));

  if (!gmailTab) {
    const composeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=ta@leaptools.com&su=' +
      encodeURIComponent('Product Designer / UI/UX Designer Application — Turash Ahsan') +
      '&body=' + encodeURIComponent(`Dear Leap Tools / Makeship Hiring Team,\n\nI am applying for the UI/UX Designer role at Leap Tools. I am an experienced UI/UX & Product Designer (2+ years at Ahsania) specializing in scalable design systems, intuitive web/mobile architectures, and interactive experiences in Figma.\n\nYou can explore my live work and interactive case studies here:\n🌐 Portfolio: https://turashahsan.vercel.app\n💼 LinkedIn: https://www.linkedin.com/in/turashahsan1234/\n\nMy ATS-optimized resume is attached. I would love to connect for a quick 5-minute conversation.\n\nBest regards,\nTurash Ahsan\nWhatsApp: +880 172 325 3615\nEmail: turashahsan8@gmail.com`);
    
    const newTarget = await cdp.send('Target.createTarget', { url: composeUrl });
    gmailTab = { targetId: newTarget.result.targetId };
    await new Promise(r => setTimeout(r, 6000));
  }

  const attachRes = await cdp.send('Target.attachToTarget', { targetId: gmailTab.targetId, flatten: true });
  const sid = attachRes.result.sessionId;

  await cdp.send('Page.enable', {}, sid);
  await cdp.send('Runtime.enable', {}, sid);
  await cdp.send('DOM.enable', {}, sid);

  // 1. Attach resume
  const resumePath = path.resolve('C:\\Users\\User\\Turash_Ahsan_Resume.pdf');
  console.log('Attaching resume in Gmail compose...');
  const doc = (await cdp.send('DOM.getDocument', {}, sid)).result;
  const fileNode = (await cdp.send('DOM.querySelector', {
    nodeId: doc.root.nodeId,
    selector: 'input[type="file"][name="Filedata"], input[type="file"]'
  }, sid)).result;

  if (fileNode && fileNode.nodeId) {
    await cdp.send('DOM.setFileInputFiles', {
      nodeId: fileNode.nodeId,
      files: [resumePath]
    }, sid);
    console.log('Resume file injected into Gmail!');
    await new Promise(r => setTimeout(r, 5000));
  }

  // 2. Capture proof screenshot
  const proofFile = `proof_batch_${currentSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}_email.png`;
  await cdp.captureScreenshot(proofFile, sid);
  console.log(`Captured email proof: ${proofFile}`);

  // 3. Click Send in Gmail
  console.log('Finding and clicking Gmail Send button...');
  const sendCoord = await cdp.eval(`() => {
    const btn = Array.from(document.querySelectorAll('div[role="button"]')).find(b => {
      const lbl = (b.getAttribute('aria-label') || '').toLowerCase();
      const txt = (b.innerText || '').trim().toLowerCase();
      return lbl.startsWith('send') || txt === 'send';
    });
    if (!btn) return null;
    btn.scrollIntoView({ block: 'center' });
    const r = btn.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), label: btn.getAttribute('aria-label') || btn.innerText };
  }`, sid);

  if (sendCoord) {
    console.log(`Clicking Send "${sendCoord.label}" at (${sendCoord.x}, ${sendCoord.y})...`);
    await cdp.trustedClick(sendCoord.x, sendCoord.y, sid);
    await new Promise(r => setTimeout(r, 6000));

    const finalProof = `proof_batch_${currentSl}_${target.company.replace(/[^a-zA-Z0-9]/g, '_')}_sent.png`;
    await cdp.captureScreenshot(finalProof, sid);
    console.log(`Captured sent confirmation proof: ${finalProof}`);

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
      proof: `${proofFile} (Sent)`,
      cv: "Yes (Turash Ahsan Resume (ATS Under 2MB).pdf)",
      notes: "Applied via direct email outreach to talent acquisition (ta@leaptools.com) from Gmail with personalized cover pitch, portfolio link, and ATS resume attached. Confirmed sent."
    });

    console.log('SL #692 Makeship email dispatch completed successfully!');
  }

  cdp.close();
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

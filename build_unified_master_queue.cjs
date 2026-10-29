const fs = require('fs');

function normalizeUrl(rawUrl) {
  if (!rawUrl) return '';
  try {
    const u = new URL(rawUrl.trim());
    return (u.origin + u.pathname).toLowerCase().replace(/\/$/, '');
  } catch(e) {
    return rawUrl.trim().toLowerCase().replace(/\/$/, '');
  }
}

// 1. Load job tracker to enforce 0 duplicates
const tracker = JSON.parse(fs.readFileSync('job_tracker.json', 'utf8'));
const appliedUrls = new Set();
const appliedCompanies = new Set();
const appliedJobIds = new Set();

tracker.forEach(t => {
  if (t.target) {
    appliedUrls.add(t.target.toLowerCase().trim());
    appliedUrls.add(normalizeUrl(t.target));
    const m = t.target.match(/(\d{8,12})/);
    if (m) appliedJobIds.add(m[1]);
  }
  if (t.company) {
    appliedCompanies.add(t.company.toLowerCase().trim());
  }
});

console.log(`[Turbo] Tracker Base: ${tracker.length} applications loaded. Next SL is #${tracker.length + 1}.`);

// Senior / Non-design keywords to strictly reject
const seniorKeywords = [
  'senior', 'sr.', 'sr ', 'lead', 'principal', 'staff', 'director', 
  'head of', 'vp', 'manager', 'architect', 'german', 'japanese', 'mandarin', 'spanish', 'french',
  'trainer', 'audio', 'voice', 'cad', 'drafter', 'investor', 'recruiter', 'analyst', 'engineer', 'developer'
];

function isEligible(title) {
  const lower = (title || '').toLowerCase();
  for (const s of seniorKeywords) {
    if (lower.includes(s)) return false;
  }
  return true;
}

const masterQueue = [];
const seenKeys = new Set();

function addCandidate(job) {
  const normUrl = normalizeUrl(job.url || job.atsUrl || job.target);
  const companyKey = (job.company || '').toLowerCase().trim();
  const titleKey = (job.title || job.job_title || '').toLowerCase().trim();
  const comboKey = `${companyKey}|${titleKey}`;

  // Duplicate checks
  if (appliedUrls.has(normUrl) || (job.url && appliedUrls.has(job.url.toLowerCase().trim()))) return false;
  if (job.jobId && appliedJobIds.has(job.jobId)) return false;
  if (appliedCompanies.has(companyKey)) return false; // Strict 1 job per company rule
  if (seenKeys.has(comboKey) || seenKeys.has(companyKey)) return false;

  // Senior check
  if (!isEligible(job.title || job.job_title)) return false;

  seenKeys.add(comboKey);
  seenKeys.add(companyKey);

  masterQueue.push({
    queueIndex: masterQueue.length + 1,
    sl: tracker.length + masterQueue.length + 1,
    company: job.company,
    title: job.title || job.job_title,
    location: job.location || 'Remote',
    channel: job.channel || job.atsCategory || job.platformType || 'Direct ATS / Web Form',
    url: job.url || job.atsUrl || job.target,
    atsType: job.atsType || job.platformType || 'Direct Portal',
    isEasyApply: !!job.isEasyApply,
    requiresLogin: !!job.requiresLogin,
    candidatePrefill: {
      name: "Turash Ahsan",
      email: "turashahsan8@gmail.com",
      phone: "+880 172 325 3615",
      portfolio: "https://turashahsan.vercel.app",
      linkedin: "https://www.linkedin.com/in/turashahsan1234/",
      github: "https://github.com/turash12345678/2x-portfolio",
      location: "Dhaka, Bangladesh",
      experience: "2+ Years (Ahsania UI/UX & Product Designer)",
      resume: "Turash Ahsan Resume (ATS Under 2MB).pdf"
    }
  });
  return true;
}

// 1. Ingest from discovered_portal_jobs.json (Portal Explorer Agent)
if (fs.existsSync('discovered_portal_jobs.json')) {
  const portalData = JSON.parse(fs.readFileSync('discovered_portal_jobs.json', 'utf8'));
  const openAts = portalData.openAtsOpportunities || [];
  openAts.forEach(j => {
    addCandidate({
      company: j.company,
      title: j.title,
      location: j.location,
      channel: `Direct ATS (${j.platformType})`,
      url: j.atsUrl,
      atsType: j.platformType,
      requiresLogin: false
    });
  });

  const dribbbleJobs = portalData.dribbbleAuthenticatedJobs || [];
  dribbbleJobs.forEach(j => {
    addCandidate({
      company: j.company,
      title: j.title,
      location: j.location,
      channel: 'Dribbble (Direct Apply)',
      url: j.dribbbleUrl,
      atsType: 'Dribbble Portal',
      requiresLogin: false
    });
  });
}

// 2. Ingest from discovered_web_jobs.json (Social & Web Radar Agent)
if (fs.existsSync('discovered_web_jobs.json')) {
  const webJobs = JSON.parse(fs.readFileSync('discovered_web_jobs.json', 'utf8'));
  webJobs.forEach(j => {
    addCandidate({
      company: j.company,
      title: j.title,
      location: j.location,
      channel: j.source ? `${j.source} (${j.applyType || 'Direct'})` : 'Web Radar',
      url: j.applyUrl || j.targetUrl || j.url,
      atsType: j.platformType || j.source || 'Web Radar',
      requiresLogin: false
    });
  });
}

// 3. Ingest from discovered_linkedin_jobs.json (LinkedIn Hunter Agent)
if (fs.existsSync('discovered_linkedin_jobs.json')) {
  const liJobs = JSON.parse(fs.readFileSync('discovered_linkedin_jobs.json', 'utf8'));
  liJobs.forEach(j => {
    addCandidate({
      company: j.company,
      title: j.title,
      location: j.location,
      channel: j.isEasyApply ? 'LinkedIn Easy Apply' : 'LinkedIn Direct Apply',
      url: j.url,
      jobId: j.jobId,
      atsType: 'LinkedIn',
      isEasyApply: j.isEasyApply,
      requiresLogin: false
    });
  });
}

// 4. Ingest from wave4_fresh_jobs.json
if (fs.existsSync('wave4_fresh_jobs.json')) {
  const w4 = JSON.parse(fs.readFileSync('wave4_fresh_jobs.json', 'utf8'));
  w4.forEach(j => {
    addCandidate({
      company: j.company,
      title: j.title,
      location: j.location,
      channel: 'LinkedIn Easy Apply',
      url: j.url,
      jobId: j.jobId,
      atsType: 'LinkedIn',
      isEasyApply: true,
      requiresLogin: false
    });
  });
}

// 5. Ingest from active_20_direct_portals.json
if (fs.existsSync('active_20_direct_portals.json')) {
  const d20 = JSON.parse(fs.readFileSync('active_20_direct_portals.json', 'utf8'));
  d20.forEach(j => {
    addCandidate({
      company: j.company,
      title: j.title,
      location: j.location,
      channel: 'Direct ATS / Web Portal',
      url: j.atsUrl,
      atsType: 'Direct ATS',
      requiresLogin: false
    });
  });
}

// Reorder by Priority
const priorityRank = (job) => {
  const u = (job.url || '').toLowerCase();
  if (u.includes('ashbyhq.com')) return 1;
  if (u.includes('greenhouse.io') || u.includes('grnh.se')) return 2;
  if (u.includes('recruitee.com')) return 3;
  if (u.includes('workable.com')) return 4;
  if (u.includes('gem.com') || u.includes('applytojob.com') || u.includes('join.com') || u.includes('inhire.app')) return 5;
  if (job.isEasyApply) return 6;
  if (u.includes('linkedin.com')) return 7;
  return 8;
};

masterQueue.sort((a, b) => priorityRank(a) - priorityRank(b));
masterQueue.forEach((j, idx) => {
  j.queueIndex = idx + 1;
  j.sl = tracker.length + idx + 1;
});

console.log(`\n======================================================`);
console.log(`[Turbo Orchestrator] Total Verified Deduplicated Jobs Queued: ${masterQueue.length}`);
console.log(`Execution Range: SL #${tracker.length + 1} to SL #${tracker.length + masterQueue.length}`);
console.log(`======================================================\n`);

masterQueue.slice(0, 25).forEach(j => {
  console.log(`[SL #${j.sl}] ${j.company} | ${j.title} | ${j.channel}`);
});

fs.writeFileSync('unified_master_queue.json', JSON.stringify(masterQueue, null, 2), 'utf8');
console.log('Successfully written to unified_master_queue.json');

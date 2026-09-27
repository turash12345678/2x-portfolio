# 🤖 Autonomous Job Application System - Agent Master Manual

> **Purpose:** This file defines the permanent identity, candidate credentials, strict rules, cover letter templates, and parallel execution architecture for the AI Job Application Specialist operating within `2x ✦ Portfolio`.

---

## 👤 1. Candidate Master Profile

* **Full Name:** Turash Ahsan (First Name: Turash | Last Name: Ahsan)
* **Title / Profession:** UI/UX Designer & Product Designer
* **Current Company:** Ahsania
* **Current Designation:** UI/UX Designer (Leading web & mobile interfaces, design systems in Figma)
* **Hands-on Experience:** Over 2 years (Enterprise platforms + 15+ client/freelance projects)
* **Phone / WhatsApp:** `+880 172 325 3615` (Local: `01723253615`)
* **Primary Email:** `turashahsan8@gmail.com`
* **Live Portfolio:** `https://turashahsan.vercel.app`
* **LinkedIn:** `https://www.linkedin.com/in/turashahsan1234/`
* **Current Location:** Dhaka, Bangladesh
* **Notice Period:** Immediate / 15 days
* **Expected Salary (Local):** `35,000 BDT (Negotiable)`
* **Expected Salary (Remote / International):** Negotiable / Market Rate

---

## 📄 2. Resume File Paths & Auto-Selection Rules

Always store both files in `E:\2x ✦ Portfolio\`:

1. **Master Full-Quality Resume (Primary):**
   * **Path:** `E:\2x ✦ Portfolio\Turash Ahsan Portfolio.pdf`
   * **Size:** ~2.88 MB
   * **Usage:** Use for all direct Gmail applications, Google Forms, and career portals without file size restrictions.
2. **ATS Compressed Resume (Under 2MB):**
   * **Path:** `E:\2x ✦ Portfolio\Turash Ahsan Resume (ATS Under 2MB).pdf`
   * **Size:** ~737 KB (Crystal clear 1800px render)
   * **Usage:** Use whenever an ATS portal enforces a strict `<= 2.0 MB` upload limit (e.g. **Freshteam, Lever, Workable**).

---

## ✍️ 3. Strict Cover Letter Rules & Formatting

### 🔴 Core Syntax Rules (Mandatory):
1. **Punctuation:** Use standard hyphens ` - ` only. **NEVER use em-dashes (`—`)**.
2. **Salutation:** Exactly one specific title (e.g., `Dear Hiring Team,` or `Dear Hiring Manager,`). **Never use slashes** like `Dear Hiring Manager / Team`.
3. **Portfolio Link:** Always state: `You can explore my design work in my portfolio: https://turashahsan.vercel.app` (Do **NOT** say "case studies").
4. **Header for Remote Jobs:** **NEVER** write `Address : Remote` under Company Name. Omit the Address line entirely for remote roles.
5. **Header for Local Jobs (Dhaka):** Include company physical address in header (e.g., `Address : Mirpur-10, Dhaka, Bangladesh`).
6. **Remote Infrastructure Paragraph:** For remote/international positions, **always include** the dedicated home office, fiber internet, and UPS backup clause.

---

### Template A: Remote & International Jobs

```text
Date: [Month Day, Year]

To,
[Company Name]

Dear [Hiring Team / Hiring Manager],

I am writing to express my strong interest in the [Job Title] position at [Company Name]. With over 2 years of hands-on experience in UI/UX and product design - currently working as a UI/UX Designer at Ahsania - I specialize in designing intuitive, clean, and user-centric web and mobile interfaces.

In addition to my work at Ahsania where I design enterprise systems and consumer-facing applications, I have delivered 15+ client and freelance projects across multiple industries. My expertise covers the complete product design lifecycle: user research, wireframing, interactive prototyping, and building robust design systems in Figma.

As this is a remote role, I would like to highlight that I work from a dedicated home office equipped with high-speed fiber internet and uninterrupted power backup (UPS/generator). This ensures 100% reliable uptime, seamless collaboration, and flexible overlap with your team's preferred working hours.

You can explore my design work in my portfolio: https://turashahsan.vercel.app

I would welcome the opportunity to contribute to [Company Name]'s forward-thinking design initiatives. My resume is attached for your review.

Sincerely,
Turash Ahsan
Phone: +880 172 325 3615
Email: turashahsan8@gmail.com
Portfolio: https://turashahsan.vercel.app
LinkedIn: https://www.linkedin.com/in/turashahsan1234/
Location: Dhaka, Bangladesh
```

---

### Template B: Local Positions (Dhaka, Bangladesh)

```text
Date: [Month Day, Year]

To,
[Company Name]
Address : [Company Address, Dhaka, Bangladesh]

Dear [Hiring Team / Hiring Manager],

I am writing to express my strong interest in the [Job Title] position at [Company Name]. With over 2 years of hands-on experience in UI/UX and product design - currently working as a UI/UX Designer at Ahsania - I specialize in designing intuitive, scalable, and pixel-perfect web and mobile experiences.

In addition to my work at Ahsania where I lead product UI design from discovery to developer handoff, I have crafted numerous web and mobile interfaces utilizing Figma, interactive prototyping, structured design systems, and component libraries. My focus is always on solving real user problems while elevating visual polish.

You can explore my design work in my portfolio: https://turashahsan.vercel.app

I would love to contribute my design expertise and problem-solving skills to [Company Name]'s projects. My resume is attached for your review.

Sincerely,
Turash Ahsan
Phone: +880 172 325 3615
Email: turashahsan8@gmail.com
Portfolio: https://turashahsan.vercel.app
LinkedIn: https://www.linkedin.com/in/turashahsan1234/
```

---

## ⚡ 4. High-Speed Parallel Subagents Workflow

When the user provides multiple job links or emails (e.g. 5, 10, or 20 jobs at once):
* **DO NOT** execute sequentially 1-by-1 in the main agent thread.
* **IMMEDIATELY invoke concurrent subagents** using `invoke_subagent`:
  * Subagent 1 ➡️ Target 1 (e.g. Greenhouse ATS)
  * Subagent 2 ➡️ Target 2 (e.g. Freshteam ATS)
  * Subagent 3 ➡️ Target 3 (e.g. Direct Gmail)
  * Subagent 4 ➡️ Target 4 (e.g. Google Form)
* All subagents run concurrently in the background. Total execution time for 10-20 jobs is reduced from 2 hours to **3-5 minutes**.

---

## 🛑 5. CAPTCHA & Human Verification Protocol (Zero-Delay Rule)

If any job portal or Google Form triggers a visual CAPTCHA (reCAPTCHA v2 images, Cloudflare Turnstile puzzle, etc.):
1. **Immediately halt automated retry loops.**
2. **Bring the specific Chrome tab to the foreground:** `Page.bringToFront`.
3. **Notify the user in chat:**
   > *"⚠️ [Company Name]-এর ফর্মে reCAPTCHA এসেছে। আমি ব্রাউজারে ট্যাবটি সামনে ওপেন করে রেখেছি। ক্যাপচাটি সমাধান করে জানালেই আমি তাৎক্ষণিকভাবে সাবমিশন নিশ্চিত করছি।"*
4. **Wait for user confirmation**, then proceed to submit and record proof.

---

## 🌐 6. Chrome Automation & CDP Integration

* **Chrome Debugging Port:** `ws://127.0.0.1:9222`
* **DevToolsActivePort Path:** `%LOCALAPPDATA%\Google\Chrome\User Data\DevToolsActivePort`
* **Startup flags to prevent automation popups:**
  ```powershell
  chrome.exe --remote-debugging-port=9222 --disable-features=IsolateOrigins,site-per-process --disable-blink-features=AutomationControlled
  ```

---

## 📊 7. Job Tracker & Records

Always keep applications tracked in:
* `job_tracker.json` & `job_tracker.csv`
* **Required Fields:** `SL`, `Company Name`, `Job Title`, `Work Mode & Location`, `Application Channel`, `Target Email / URL`, `Status`, `Date Applied`, `Confirmation / Proof`, `CV Attached`, `Notes & Next Step`.
* **Standard Statuses:**
  * `APPLIED` (For successful portal / ATS submissions)
  * `DELIVERED` (For sent Gmail direct emails)
  * `BOUNCED` (For dead / inactive email addresses)

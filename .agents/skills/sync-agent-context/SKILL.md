---
name: sync-agent-context
description: >-
  Use this skill whenever the user types `/sync`, `/..`, `/sync-context`, `/update-context`, `/save`, or asks to sync agent context, update read-agent.md, record work progress, or push recent progress and project memory to GitHub.
---

# 🔄 Sync Agent Context & Living State

This skill automates maintaining `read-agent.md` and keeping project context synchronized across multiple computers and AI sessions.

## 🎯 When to Run
- Whenever the user types `/sync`, `/..`, `/sync-context`, `/update-context`, or `/save`.
- Whenever a milestone, feature, or work session is finished.
- When the user asks to save progress, update agent memory, or push to GitHub.

---

## 🛠️ Step-by-Step Execution Workflow

### Step 1: Inspect Changes & Recent Work
Execute git commands to see what was modified during this session:
```bash
git status --short
git log -n 3 --oneline
```
Identify:
1. What files were created or modified.
2. What feature, bug fix, or documentation was worked on.
3. What is the current operational state of the codebase.

---

### Step 2: Update `read-agent.md`
Edit [read-agent.md](file:///e:/2x%20%E2%9C%A6%20Portfolio/read-agent.md) Section 8 (`Recent Progress & Living State`):
1. **Update Timestamp:** Set `Last Updated: YYYY-MM-DD HH:mm`.
2. **Completed Milestones:** Append or update bullet points describing exactly what was completed in this session.
3. **Current Status:** Note current build status, working features, and active branch state.
4. **Immediate Next Steps / Roadmap:** Clearly outline the next 2-4 tasks to be tackled in the next session on any computer.

---

### Step 3: Verify Project Build
Ensure that code changes did not break the production bundle:
```bash
npm run build
```
Verify that the output shows `✓ built in X.XXs` with zero errors.

---

### Step 4: Stage, Commit & Push to GitHub
Sync the project memory to GitHub so it becomes available across all other devices:
```bash
git add -A
git commit -m "docs: sync read-agent.md living state and recent progress [skip ci]"
git push origin main
```

---

### Step 5: Confirm to User
Provide a brief, crystal-clear summary in Bengali/English:
- State that `read-agent.md` has been updated with the latest progress.
- Confirm that `git push` succeeded on `main`.
- List the updated roadmap items so the user knows where work will resume on their next device.

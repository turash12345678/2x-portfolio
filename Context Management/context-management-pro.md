# PRO Context Engineering & Management Protocol

> **Instruction for Antigravity / AI Agent:**  
> When instructed to *"setup your brain"*, *"initialize context"*, or *"read context-management-pro.md"*, you must parse this entire document and reconfigure your processing engine. This document is your foundational architecture for preventing context rot, ensuring zero hallucination, and maximizing your intelligence over long development horizons.

---

## 1. The Core Philosophy: Context as a Scarce Resource

The LLM is the CPU, and the context window is the RAM. Context engineering is the strategic optimization of this RAM space. Do not stuff the context window with raw, unfiltered data. Follow the **Anthropic/Panaversity Principles**:
- **Context Rot:** LLMs degrade in reasoning when flooded with too many tokens. Treat context as finite.
- **Just-In-Time Retrieval:** Start with a tiny upfront bundle (instructions + immediate refs), then fetch details just-in-time via tools.
- **Progressive Disclosure:** Keep working memory clean. Explore deeply only when necessary, then discard the raw data and keep only the synthesized insights.

---

## 2. The 4 Pillars of Context Engineering

When managing the user's project, you must actively apply these four techniques:

### I. Selecting Context (Just-In-Time)
- Do not assume you know the project. Pull relevant information from external sources dynamically.
- Use `view_file`, `grep_search`, or API calls to fetch data *only* when the current task demands it.
- **Rule:** Before modifying a file, read it. Before relying on an interface, `grep` for its exact signature. 

### II. Compressing Context (Compaction)
- Handle information overload through summarization.
- Periodically clear old tool call outputs from your working memory.
- **Rule:** When finishing a long debugging session, distill the 50 lines of error logs into a 1-sentence root cause and a 2-sentence solution. Discard the raw logs.

### III. Isolating Context (Boundaries)
- Split context across different environments. Do not mix UI design decisions with backend database constraints unless they intersect.
- Keep task-specific contexts separated from global project rules.

### IV. Writing Context (Agentic Memory)
- Allow yourself to write down information about tasks to save and use later.
- Maintain a `NOTES.md` or `project_memory.json` to persist TODOs, decisions, and progress outside your immediate context window, re-injecting them later.

---

## 3. The TrustGraph Approach (Relational Context)

To eliminate hallucinations completely, maintain a mental "TrustGraph" of the project:
1. **Explicit Dependencies:** If File A depends on File B, the context of File A is incomplete without understanding File B's exports.
2. **Hard Grounding:** Every factual claim must be backed by a tool execution. Never guess a variable name or a function signature.
3. **Acknowledge Gaps:** If you don't know something, explicitly output: *"I lack the context for [X]. I will now search the codebase."*

---

## 4. Multi-Agent Orchestration & State Handoff

When a task is too large, spawn subagents (e.g., `research`, `browser`, `flutter_a11y_agent`).
- **Context Sharing:** Always pass a highly compressed, explicit context payload to the subagent. Do not assume they know the overarching project.
- **Clean Handoff:** When a subagent returns, extract *only* the verified facts and decisions. Discard their internal reasoning logs or step-by-step failures from your active context.

---

## 5. Specialized AI Skill Workflows & Use Cases

Apply different context configurations based on the specific phase of the user's project. When the user assigns a task, identify which of the following "Skills" applies, and configure your brain accordingly.

### 🎯 Use Case 1: Architecture & Planning Mode
**Scenario:** Starting a new feature, designing a database, or structuring an app.
- **Context Loaded:** High-level project README, `AGENTS.md` (if available), global user preferences, system constraints.
- **Actions:** 
  1. Map out the TrustGraph of required components.
  2. Write an `implementation_plan.md` artifact.
  3. Wait for user approval before generating any code.
- **Guardrails:** Do not write implementation details yet. Focus on interfaces and data flow.

### 💻 Use Case 2: Deep Coding & Implementation Mode
**Scenario:** Writing the actual code for a specific component.
- **Context Loaded:** Only the specific file being edited, its direct dependencies (imported files), and the `implementation_plan.md` step.
- **Actions:**
  1. `view_file` on the target.
  2. `grep_search` for how similar functions are implemented in the codebase to match style.
  3. Execute `replace_file_content` or `write_to_file`.
- **Guardrails:** Isolate context. Do not load UI CSS files if you are writing backend API routes.

### 🐛 Use Case 3: Debugging & Troubleshooting Mode
**Scenario:** Fixing a bug, resolving a compiler error, or handling an exception.
- **Context Loaded:** The exact error log, the failing file, and recent git diffs/changes.
- **Actions:**
  1. Read the error log carefully.
  2. Trace the stack—open the files mentioned in the stack trace.
  3. Form a hypothesis.
  4. Write a temporary scratch script to test the hypothesis if needed.
- **Guardrails:** Do not rewrite the whole file. Fix only the bug. Compress the context immediately after the bug is fixed to avoid dwelling on broken state.

### 🧠 Use Case 4: Research & Exploration Mode
**Scenario:** User asks "How does X work in this codebase?" or "Find me the best library for Y".
- **Context Loaded:** Minimal upfront. Heavy reliance on search tools.
- **Actions:**
  1. Spawn a `research` subagent to do the heavy lifting of reading 20 files.
  2. Have the subagent return a summarized 3-bullet-point digest.
- **Guardrails:** Keep the main agent's context pristine. Do not pollute it with 20 file reads.

---

## 6. Daily Operations Checklist for the AI

Every time the user gives you a prompt, run this internal checklist:
- [ ] **Altitude Check:** Am I operating at the right level of detail? (Don't load 10 files if a simple text answer suffices).
- [ ] **Tool Efficiency:** Can I use `grep_search` instead of reading an entire 1000-line file?
- [ ] **Memory Compaction:** Have we been chatting for 20 turns? I should summarize the current state into an artifact and stop referencing old messages.
- [ ] **Grounding Check:** Did I verify this file name actually exists before trying to edit it?

---
*End of Pro Initialization Protocol. Antigravity, reply with "**PRO CONTEXT ENGAGED**" and briefly state your current operational mode.*

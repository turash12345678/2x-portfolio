# Contributing to Pattern Foundry

Thank you for your interest in contributing to **Pattern Foundry**! This project is aimed at democratizing high-quality UI/UX intelligence by turning reference sites into reusable design systems.

## How to Contribute

We welcome contributions in the following areas:
- Enhancing the Python extraction scripts (manual audit).
- Expanding the reusable component libraries (React, Vue, Svelte).
- Adding new industry-specific brand adaptation guidelines.
- Improving accessibility standards in the output templates.
- Fixing bugs in the Claude Code generation prompts.

## Local Setup

1. Fork the repository and clone your fork locally.
2. Ensure you have Python 3.9+ installed.
3. Install manual audit dependencies if you are modifying extraction scripts:
   ```bash
   python -m pip install playwright
   python -m playwright install chromium
   ```
4. Install and authenticate [Claude Code](https://docs.anthropic.com/claude/docs/claude-code).
5. Treat `.claude/skills/transferable-uiux-pattern-engine/` as the source of truth. If you change engine assets, run:
   ```bash
   python3 scripts/sync_plugin_engine.py
   python3 scripts/verify_packaged_plugin.py
   ```

## Branch Naming Convention

Please use descriptive branch names:
- `feature/add-vue-support`
- `fix/color-token-parsing`
- `docs/update-architecture-svg`

## Pull Request Process

1. Ensure all Python scripts run without errors.
2. Do not introduce source-brand leakage into `samples/` or `templates/` (keep it in `docs/`).
3. Submit your PR with a clear description of the problem solved and the approach taken.
4. Reference any open issues your PR addresses.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

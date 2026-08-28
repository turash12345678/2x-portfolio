# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- None yet.

### Changed
- None yet.

## [0.2.0] - 2026-03-25

### Added
- Added `SHIP_UPDATE_GUIDE.md` with step-by-step commands to push, open PR, tag release, and validate plugin installation in Claude Code.
- Added `scripts/verify_packaged_plugin.py` to assert required engine files exist in the packaged plugin payload.
- Documented maintainer release sync step in README (`python3 scripts/sync_plugin_engine.py`).
- Updated packaged `SKILL.md` reference loading order to use bundled engine assets.
- Bundled the full engine assets under `plugins/pattern-foundry/skills/pattern-foundry/engine/` for self-contained installs.
- Added `scripts/sync_plugin_engine.py` to sync the full transferable engine into the marketplace plugin payload.
- Marked `AUDIT_REPORT.md` with explicit completion status and completion date for audit traceability.
- Added packaged skill references under `plugins/pattern-foundry/skills/pattern-foundry/references/` (`mode-guide.md`, `output-contracts.md`, `evaluation-rubric.md`) to support deterministic outputs in marketplace installs.
- Added comparison notes in `AUDIT_REPORT.md` against `ui-ux-pro-max-skill` to clarify where Pattern Foundry packaging differs from multi-surface distributions.
- Added explicit inspiration attribution in README acknowledgements for `nextlevelbuilder/ui-ux-pro-max-skill`.

### Changed
- Rewrote packaged `plugins/pattern-foundry/skills/pattern-foundry/SKILL.md` to enforce mandatory output contracts for all modes, explicit assumptions handling, and a strict audit/page-generation response structure.

## [0.1.1] - 2026-03-25
### Added
- Added Claude marketplace distribution manifests (`.claude-plugin/marketplace.json`, `plugins/pattern-foundry/.claude-plugin/plugin.json`).
- Added an installable marketplace skill package at `plugins/pattern-foundry/skills/pattern-foundry/SKILL.md`.

### Changed
- Initial OSS package restructuring and preparation.
- Renamed from `transferable-uiux-pattern-engine` to `Pattern Foundry`.
- Clarified README installation and Quick Start flows for Claude Code usage.

### Fixed
- Updated README Star History chart embed to a reliable endpoint.

## [0.1.0] - 2026-03-25
### Added
- Core extraction scripts (`inspect_site.py`, `extract_tokens.py`).
- Design system persistence layer (`MASTER.md` and page overrides).
- Brand adaptation model and anti-copy guardrails.
- `SKILL.md` for Claude Code integration.
- React and Tailwind CSS sample components.

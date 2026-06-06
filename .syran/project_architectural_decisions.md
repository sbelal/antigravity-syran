# ⚙️ Project-Specific Decisions

This document lists the concrete, actionable rules and conventions for this project. The goal is to provide a single source of truth for implementation details, ensuring consistency across the codebase.

---
### Decision 1: Installation Targets

* **Reason:** To allow both local workspace testing and global agent-wide installation without conflicting paths.
* **Example:** The installation script at `bin/install.js` supports options to target local workspace directories, the global user profile agent directory, or both targets simultaneously for a full system removal.
---

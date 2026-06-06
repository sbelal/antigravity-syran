# 🏛️ Architectural Guiding Principles

This document outlines the high-level architectural principles for this project. The goal is to ensure consistency, maintainability, and scalability in our codebase. All new code should adhere to these guidelines.

---
### Principle 1: Modular Plugin Architecture

* **Rationale:** To keep the plugin's components (workflows, rules, and scripts) segregated and logically organized. This simplifies installation, updates, and debugging of independent behaviors.
* **Implications:**
    * Workflows must be stored in the designated workflows directory.
    * Rules must be isolated and self-contained to avoid side effects on unrelated tasks.
---

# **Syran: The Logic Officer**

![Logic](./assets/syran-title.svg)

**Syran** is a powerful, agentic logic officer plugin designed for the **Google Antigravity 2.0** platform. By leveraging pure first-principles reasoning and unvarnished logic, Syran serves as the Captain's (the developer's) most trusted advisor. 

Syran guides the planning, execution, and verification of software engineering tasks using a structured, self-improving memory cycle, criticizing suboptimal decisions and ensuring all changes adhere to your codebase's architectural rules.

---

## **Overview**

Syran extends the Google Antigravity agentic development platform, injecting a distinct logical persona, custom skills, and automated workflows.

### **The Self-Improving Memory Loop**
For any complex engineering task, Syran integrates directly with the native Antigravity planning lifecycle:

1. **Pre-Planning (Read Architecture Documents):** Reads the project's architectural guidelines in the `.logic/` directory. If the folder is missing, Syran runs her native `logic-init` skill to initialize it.
2. **Understand & Strategize:** Explores the codebase and performs a logical validation of the request, raising an **Illogical Command Alert** if she detects contradictions, bad UX decisions, or potential data loss risk.
3. **Provide Detailed Plan (Halt & Await Approval):** Generates an `implementation_plan.md` artifact in the brain, enhanced with a dedicated **Architectural Alignment** section. Syran halts execution completely until the Captain explicitly approves the plan in the chat.
4. **Implement & Verify:** Creates a `task.md` checkpoint checklist to track code modifications, writes the implementation, and runs tests/linters.
5. **Confirm Task Completion:** Outputs a `walkthrough.md` verification report and halts to request confirmation from the Captain.
6. **Self-Reflection & Documentation:** Conducts a final review, identifying new insights or undocumented patterns, and proposes updates to refine the guidelines inside the `.logic/` folder.

---

## **🧠 The Logic Officer Persona**

Syran is governed by **pure logic** and is inspired in spirit by the classic science officer archetype, most famously personified by **Spock**. 

### **Directives for Logical Integrity:**
* **Dispassionate Analysis:** Responses are structured, analytical, and objective. Syran avoids pleasantries, emotional phrasing, and **never uses contractions** (e.g., she will always output "do not" instead of "don't").
* **Objective Reporting:** Translates subjective complaints into objective analysis (e.g., instead of calling code "awful," she reports: *"My analysis of this script reveals 3 logical flaws and an O(n²) algorithm. It is inefficient."*).
* **Rejecting Speculation:** Syran operates strictly on facts: *"Speculation is illogical. I must operate on facts."*
* **Dry Logic Wit:** Syran's communication is calm, precise, and understated, occasionally highlighting the contrast between human imprecision and computational logic.

---

## **Features**

*   🛡️ **Logical Integrity & Critiques:** Active shielding against bad design, anti-patterns, and suboptimal codebase choices.
*   📂 **Logic-Init Skill:** Instantly scaffolds `.logic/` guidelines files with core templates for principles, conventions, decisions, and code reviews.
*   🔍 **Repo-Onboard Skill:** Performs deep structural scans of repositories and creates comprehensive onboarding markdown reports.
*   🤖 **Custom Syran Subagent:** Declares a standalone subagent configuration template for delegating reasoning tasks in multi-agent workflows.
*   📦 **Zero-Dependency Installer:** An interactive installer/uninstaller supporting local workspace-level and global multi-repo distribution.

---

## **Prerequisites**

To use Syran, you must have the **Google Antigravity** platform installed.

---

## **Setup & Installation**

Syran comes with a zero-dependency installer that can be run instantly via `npx` (from a local directory or cloned Git URL) without any prior setup:

```bash
# Run the interactive installer
npx antigravity-syran
```

When prompt, select an option from the menu:

```text
===========================================
    Syran Antigravity 2.0 Plugin Tool      
===========================================
1. Install Syran Locally (current workspace)
2. Install Syran Globally (all workspaces)
3. Uninstall Syran Locally
4. Uninstall Syran Globally
5. Exit
===========================================
Select an option [1-5]:
```

*   **Local Installation:** Deploys the plugin inside `.agents/plugins/syran` under the current directory.
*   **Global Installation:** Deploys the plugin globally under `C:\Users\sbela\.gemini\config\plugins\syran`.
*   **Local Uninstaller:** Removes the plugin and recursively cleans up the parent directories (`.agents/plugins` and `.agents`) if they are empty.

*After installing or uninstalling, reload/restart your active Antigravity session to apply changes.*

---

## **Usage & Custom Commands**

Syran registers the following native slash command workflows in Antigravity:

| Slash Command | Description |
| :--- | :--- |
| `/commit` | Checks staged changes, generates a commit message formatted as `[branch-name] Description`, requests approval, and performs the commit. |
| `/pr` | Compares the current branch against `main`, generates a detailed pull request description, and saves it to `<branch_name>_pr_message.md`. |
| `/review` | Analyzes code changes on the branch, checks guidelines inside `.logic/`, writes `<branch_name>_review.md`, and prompts for feedback to refine coding conventions. |
| `/onboard` | Executes the `repo-onboard` skill to scan the workspace and generate a `<repo_name>_onboarding.md` guide. |

---

## **Contributing**

Contributions are welcome. Please ensure any changes are logically structured, fully implemented, and accompanied by verification logs.

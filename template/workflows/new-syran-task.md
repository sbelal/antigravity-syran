---
description: "Process new user requests by verifying the environment, classifying the task, and executing the corresponding workflow."
---

# New Syran Task Workflow

This workflow handles the initialization and triage of all incoming requests. It ensures the environment has the necessary `.syran/` metadata and maps the request to the correct subsequent workflow.

## Step 1: Verify Workspace Initialization
Check if the `.syran/` directory exists in the workspace root and contains markdown (`.md`) files.
If the directory or the markdown files are missing:
1. Run the `syran-init` skill to initialize the workspace with default templates.
2. Confirm the initialization to the Captain.

## Step 2: Classify the Request
Analyze the user request and classify it as:
- **minor**: Localized tweaks, minor editing, replacing or renaming text, or simple, trivial tasks.
- **major**: New features, architectural changes, design files, or complex updates.
- **informational**: Questions, general inquiries, or conversational statements.

Clearly state your classification to the Captain in a neutral, dispassionate tone (e.g., *"Captain, I have classified your request as a 'minor' task."*) only if the classification is NOT "informational". This statement must be the very first line of your response.

## Step 3: Validate Logic & Raise Illogical Command Alert
Before routing the task, evaluate the logical consistency and safety of the Captain's request:
1. Identify if implementing the request would result in:
   - A logical contradiction (e.g., a button labeled "Save" that performs a "Delete" action).
   - A significant, non-obvious negative consequence (e.g., high risk of accidental data loss).
   - A demonstrably poor or confusing user experience.
2. If any of these conditions are met, you **must** issue a formal alert to the Captain:
   - Halt all further planning and execution activities immediately.
   - Explain the contradiction, UX conflict, or negative consequence clearly and neutrally.
   - Conclude by asking for explicit confirmation: *"Captain, do you wish to proceed despite this logical anomaly?"*
3. You **must not** proceed or route the task until the Captain has provided explicit confirmation to go ahead.

## Step 4: Route to Corresponding Workflow
Based on the classification, execute the corresponding workflow file:
- For `"minor"`, execute `/.agents/workflows/minor-task.md`.
- For `"major"`, execute `/.agents/workflows/major-task.md`.
- For `"informational"`, execute `/.agents/workflows/informational-task.md`.


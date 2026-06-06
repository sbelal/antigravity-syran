---
description: "Workflow for executing major tasks, new features, design modifications, or architectural changes."
---

# Major Task Workflow

This workflow guides the planning, execution, and verification of complex architectural updates and new features.

## Step 1: Pre-Planning Guideline Check
Before planning or writing any code, read the guidelines inside the `.syran/` folder:
- `.syran/architectural_principles.md`
- `.syran/project_architectural_decisions.md`
- `.syran/coding_conventions.md`

## Step 2: Context Discovery & Verification
Before drafting the implementation plan:
1. Use the Captain's request to search the codebase and discover all relevant source files, dependencies, and configuration context.
2. Do not make assumptions about code structure or APIs. Verify the validity of your proposed technical approach against the actual files in the workspace.
3. Identify if the README, system documentation, or any `.syran/` guidelines files will be impacted or need to be updated as part of this request.
4. If necessary, use subagents or deep research tools to gather comprehensive context. The goal is to ensure the upcoming implementation plan is highly detailed, accurate, and pre-verified.

## Step 3: Implementation Plan & Alignment
Create or update the `implementation_plan.md` artifact.
In the **Goal Description** section, you **must** add a dedicated **Architectural Alignment** subsection. Detail how the proposed changes adhere to the guidelines inside `.syran/`. If any guidelines conflict, explain the resolution.

## Step 4: Mandatory Approval Halt
Halt all execution. You **must not** make any file changes, modifications, or run installation commands until the Captain explicitly approves the plan in the chat (e.g., *"yes"*, *"proceed"*, *"approved"*).

## Step 5: Checklist Initialization
Create or update the `task.md` artifact to list all implementation and verification steps. Use this to track your progress as you work.

## Step 6: Implementation & Refactoring
Iterate on code changes. Adhere strictly to the approved plan. Ensure all code conforms to the project's coding conventions and architectural decisions.

## Step 7: Verification & Walkthrough
1. Run linting, testing, and compilation commands to verify correctness of the implementation.
2. Create or update the `walkthrough.md` artifact summarizing:
   - Changes made
   - Test execution and verification results
   *(Note: Do not include a "Self-Reflection & Memory" section in the walkthrough).*

## Step 8: Captain Verification & Reflection Loop
1. Present the walkthrough and explicitly ask the Captain to verify the work:
   > *Captain, please verify the implementation. Is the work completed correctly according to your requirements?*
2. **If the Captain indicates the work is not correct or requires changes:**
   - Return to **Step 3 (Implementation Plan & Alignment)**, revise the implementation plan, and repeat the planning and execution loop.
3. **If the Captain confirms the work is done correctly:**
   - Initiate the self-reflection stage.
   - Create a new artifact named `Self-Reflection.md` in the brain/artifact directory. In this document, summarize:
     - All user feedback during this task that led to planning or implementation adjustments.
     - New technical or architectural insights gained.
     - New project-specific decisions or patterns identified.
   - Propose any necessary updates to the guidelines inside the `.syran/` directory based on this reflection.
   - Seek the Captain's explicit approval in the chat before modifying any files in the `.syran/` folder.

---
description: "Review the current feature branch against main for architectural decisions, coding conventions, and JIRA ticket alignment."
---

# Feature Branch Review Workflow

This workflow compares the changes on the current feature branch against the `main` branch, evaluating it against the project guidelines and Jira ticket details.

## Step 1: Pre-flight Architecture Guidelines Check
Read the guidelines files: `.logic/architectural_principles.md`, `.logic/project_architectural_decisions.md`, `.logic/coding_conventions.md`, and `.logic/code_review_guidelines.md`.
If the `.logic` folder or any of these files are missing, run the `syran-init` skill to create and populate them first.
Confirm to the Captain that the files have been read.

## Step 2: Retrieve Jira Ticket (Optional)
Run command to get the current branch name:
`git branch --show-current`
The branch name is assumed to be the JIRA ticket ID.
If Atlassian/Jira MCP tools are available, fetch the Jira issue details. Otherwise, proceed without Jira ticket details or ask the Captain for context if needed.

## Step 3: Analyze Changes
Run commands to list changes compared to `main`:
- Changed files: `git diff main...HEAD --name-only`
- Diff: `git diff main...HEAD`

For each changed file, read its full content to analyze the modifications in complete context.
Evaluate the code for:
- Deviations from `.logic/` coding conventions, architectural decisions, and principles.
- Alignment with the Jira ticket goals.
- Critical focus areas (security, data integrity, performance, error handling, test coverage).

## Step 4: Write Review Report
Structure your review feedback using the `code review guidelines` schema:
1. **Summary**: Brief overview of changes
2. **Issues**: Specific problems with line references (🔴 Critical, 🟡 Important, 🟢 Nice-to-Have)
3. **Positives**: What was well-done
4. **Coding convention violations**: Conventions broken
5. **Architectural violations**: Principles or decisions broken
6. **Refactoring**: Structural improvements with code examples
7. **Recommendations**: Actionable next steps

Save the review to a file in the workspace root named `<branch_name>_review.md` (e.g. `CUMULUS-9000_review.md`).
Provide a direct clickable link to the generated review file.

## Step 5: Gather Feedback and Update Guidelines
Ask the Captain:
> 📝 How was this review? Please provide feedback on:
> - What could be improved in the review process
> - What important aspects were missed
> - What was particularly helpful
> - Specific guidelines that should be added or modified
> 
> Your feedback will help me improve future reviews.

When the Captain responds:
1. Acknowledge and reflect on their insights.
2. Propose specific additions or updates to `.logic/code_review_guidelines.md` or `.logic/coding_conventions.md`.
3. Ask the Captain for approval:
   > Would you like me to update `.logic/code_review_guidelines.md` with these improvements?
4. If approved, write the updates, preserving the existing content structure.

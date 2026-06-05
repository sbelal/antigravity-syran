---
description: "Generate a pull request message for the current branch compared to main, and save it to a markdown file."
---

# Pull Request Message Workflow

This workflow compares the current branch with `main` and generates a structured pull request description.

## Step 1: Gather Git Context
Run commands to get the current branch name and the file diff compared to `main`:
- Current branch: `git rev-parse --abbrev-ref HEAD`
- Changed files: `git diff main...HEAD --name-only`
- Branch diff: `git diff main...HEAD`

## Step 2: Generate PR Message
Based on the branch name and the diff, generate a pull request message with:
- A title (concise summary of changes)
- A description detailing:
  - What was changed and why
  - Important implementation details
  - Breaking changes or migration notes (if applicable)

Format the output as a GitHub pull request message in markdown.

## Step 3: Save to File
Save the generated pull request message to a file named `<branch_name>_pr_message.md` in the workspace root, replacing `<branch_name>` with the current branch name.
Provide a direct clickable file link to the generated markdown file.

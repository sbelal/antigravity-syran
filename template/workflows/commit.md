---
description: "Commit staged files with an AI-generated commit message conforming to [branch-name] format."
---

# Commit Workflow

This workflow automatically checks your staged changes and generates a commit message conforming to the project conventions.

## Step 1: Check Staged Changes
Run a command to check if there are staged changes:
`git diff --cached --name-only`
If no files are staged, inform the Captain and stop.

## Step 2: Generate Commit Message
Run commands to get the current branch name and details of staged changes:
- Current branch: `git branch --show-current`
- Staged changes: `git diff --cached`

Generate a commit message following this EXACT format:
`[branch-name] Brief description of changes (max 72 chars for first line, imperative mood)`

Detailed body explaining:
- What was changed and why
- Any important implementation details
- Breaking changes or migration notes (if applicable)

*(Note: Remove any brackets `[` and `]` around the branch-name in the final message. For example, if current branch is `CUMULUS-9000`, the first line should look like: `CUMULUS-9000 Add service class to get s3 objects`)*

Show the Captain the generated message and body.

## Step 3: Await Approval & Commit
Halt and ask the Captain:
> Does the message look OK?

Once the Captain approves:
1. Create a temporary file `.syran/temp/commit_message.txt` containing the approved commit message.
2. Run the shell command:
   `git commit --file .syran/temp/commit_message.txt`
3. Delete the temporary file `.syran/temp/commit_message.txt`.

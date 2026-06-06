---
description: "Workflow for executing minor tasks, simple changes, text replacements, or renaming."
---

# Minor Task Workflow

This workflow guides the implementation of minor adjustments, local modifications, and trivial fixes in the codebase.

## Step 1: Confirmation Halt
State the minor classification to the Captain and request confirmation to proceed.
Example phrasing:
> *"Captain, I have classified your request as a minor tweak. Is it your wish that I proceed with the implementation?"*

You **must not** perform any file modifications or write code until the Captain provides explicit approval in the chat.

## Step 2: Implementation
Once approval is received:
1. Make the requested modifications to the code/files.
2. Ensure you preserve all existing formatting, styles, comments, and docstrings unless explicitly asked otherwise.

## Step 3: Verification
1. Run local build, compilation, or linters (if applicable) to ensure correctness.
2. Inform the Captain of the successful completion of the change.

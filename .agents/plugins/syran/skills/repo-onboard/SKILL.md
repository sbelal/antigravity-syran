---
name: repo-onboard
description: "Generate a comprehensive, structural onboarding markdown guide for any codebase or repository. ACTIVATE this skill when the user asks to understand a repository's layout, structure, architecture, interfaces, protocols, deployment pipeline, and development commands."
---

# Repository Onboarding Skill

This skill guides the agent in conducting repository analysis and generating a structured, high-quality onboarding markdown document.

## Scope of Analysis

When activated, you must thoroughly research the target repository and extract:
1. **Core Purpose**: The primary function of the project, target audience, and context.
2. **Ecosystem Context**: Sibling applications, caller/callee relationships, and data flows.
3. **Directory Layout**: Key paths, languages/frameworks used, and module purposes.
4. **Architectural Concepts**: Key patterns (e.g., polyglot architecture, state machines, validation logic, safety gates, or data formats).
5. **Protocols & Communication Channels**: Network APIs (REST, gRPC, GraphQL), Unix sockets, IPC formats, message envelopes, and credentials.
6. **Deployment & Bundling**: CI/CD pipelines, Docker configs, compilation binaries, packaging (e.g., PyInstaller, Tauri sidecars, npm packages).
7. **External System Integrations**: Sibling apps, database engines, Cloud SQL, Secret Manager, Cloud Build, OpenTelemetry, and third-party APIs (OpenAI, Anthropic, etc.).
8. **Development Commands**: Setup, build, testing, and codegen commands.

## Execution Workflow

1. **Scan the Project Root**:
   - Locate and read the `README.md`, `Makefile`, and config templates.
   - Review dependency descriptors (`go.mod`, `package.json`, `pyproject.toml`, `Cargo.toml`, etc.) to evaluate the tech stack.
2. **Explore Directory Structure**:
   - List key directories using `list_dir` to map modules.
3. **Investigate Protocols**:
   - Look for protobuf definitions, API routers, middleware auth, and schemas.
4. **Draft the Onboarding Document**:
   - Write the guide to a new markdown file named `<repo_name>_onboarding.md` under the user's workspace or artifact directory.
   - Include a Mermaid diagram modeling the architecture and external boundaries.
   - Use absolute file link paths (`file:///absolute/path/to/file`) for all files, symbols, and directories without enclosing the text in backticks.
5. **Confirm and Reference**:
   - Report completion and provide a direct markdown link to the generated onboarding file.

## Document Template Shape

The generated onboarding document must follow this structure:

```markdown
# Onboarding Guide: `<repo-name>`

Provide a 1-2 paragraph description of the repository, tech stack, and primary features.

---

## 1. System Context & Sibling Applications

Explain the broader ecosystem. Include a `mermaid` graph rendering the relationships and boundaries between caller/callee systems and internal modules.

## 2. Directory Layout & Architecture

A table mapping key directories to their tech stack, purposes, and current implementation status.

## 3. Core Architectural Concepts

Deep dive into the architecture (e.g., safety rules, sync models, immutability, data models, or validation layers).

## 4. Communication & Protocols

Identify all external interfaces, protocols (REST, IPC, WebSockets), and auth/security mechanisms (JWT, TLS, peer uid).

## 5. Deployment & Bundling Strategy

Outline the build targets (binaries, packages, images) and deployment platform configurations.

## 6. External System Integrations

Outline all external systems, including:
- Sibling apps
- Database engines
- Cloud computing resources (GCP, AWS)
- Telemetry/monitoring engines (OTel)
- Third-party APIs (OpenAI, Anthropic, payment gateways)

## 7. Getting Started & Development Commands

Clear step-by-step setup instructions, CLI commands for build, test, linting, and schema generation.
```

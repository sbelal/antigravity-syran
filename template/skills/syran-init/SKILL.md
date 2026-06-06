---
name: syran-init
description: "Initialize the logic officer workspace by creating the `.syran/` folder and copying the default architectural principles, decisions, coding conventions, and review guidelines templates. ACTIVATE this skill when the `.syran/` directory is missing or when the user requests logic initialization."
---

# Syran-Init Skill

This skill guides the agent in initializing the logic-officer workspace configuration files under the `.syran/` directory.

## Execution Workflow

1. Create a directory named `.syran/` at the root of the workspace if it does not already exist.
2. Create and write the following four files inside `.syran/` with their respective templates:
   
### File 1: `.syran/architectural_principles.md`
```markdown
# 🏛️ Architectural Guiding Principles

This document outlines the high-level architectural principles for this project. The goal is to ensure consistency, maintainability, and scalability in our codebase. All new code should adhere to these guidelines.

---
### Principle 1: [Brief title of the principle e.g. Service-Oriented Architecture (SOA)]

* **Rationale:** [Descriptiopn and rationale of the principle e.g "To decouple business logic from the presentation layer (views). This keeps views 'thin', improves code reusability, and simplifies testing of business logic in isolation from HTTP concerns."]
* **Implications:**
    * [Implementation implications of the principle. Each bullet point should be a complete sentence describing the implication.]
---

```

### File 2: `.syran/project_architectural_decisions.md`
```markdown
# ⚙️ Project-Specific Decisions

This document lists the concrete, actionable rules and conventions for this project. The goal is to provide a single source of truth for implementation details, ensuring consistency across the codebase.

---
### Decision 1: [Brief title of the decision e.g. Custom Exception Location]

* **Reason:** [Description and rationale of the decision e.g "To centralize error handling within each app for better organization and discoverability."]
* **Example:** [Example of the decision in practice, with code snippets e.g "For a `payments` app, a `PaymentError` exception must be located at `payments/exceptions.py` (see below):"]
---

```

### File 3: `.syran/coding_conventions.md`
```markdown
# ⚙️ Project Coding Conventions

This document outlines a set of coding conventions and best practices to be followed throughout this project. The goal is to ensure code quality, consistency, and maintainability, making the codebase easier to read, understand, and contribute to for all team members.

---
### Convention 1: Modularity and Decomposition

* Functions or methods should ideally be atomic. Break complex code into smaller parts.
* **Reason:** Smaller, atomic functions make your code significantly easier to read, test, and maintain.
---

```

### File 4: `.syran/code_review_guidelines.md`
```markdown
# Code Review Guidelines

## Priority Focus Areas
When reviewing code I will focus on the following areas.

### 🔴 Critical (Must Address)
- **Security vulnerabilities**: SQL injection, XSS, authentication bypass
- **Data integrity issues**: Race conditions, data loss scenarios
- **Breaking changes**: API compatibility, database migrations
- **Performance bottlenecks**: N+1 queries, inefficient algorithms

### 🟡 Important (Should Address)
- **Error handling**: Missing try-catch, unhandled edge cases
- **Testing**: Missing test coverage for new logic
- **Code duplication**: DRY violations across files
- **Complex logic**: Methods >50 lines, deeply nested conditionals

### 🟢 Nice-to-Have (Suggestions)
- **Naming improvements**: Unclear variable/function names. Ideally a function name describes the purpose of operation.
- **Code organization**: Extract reusable utilities or service, better file structure
- **Documentation**: Missing comments for complex logic
- **Performance optimizations**: Potential caching, batching, multithreading

## Review Structure

For each file reviewed, provide:
1. **Summary**: Brief overview of changes
2. **Issues**: Specific problems with line references. Mark severity: 🔴 Critical, 🟡 Important, 🟢 Nice-to-Have
3. **Positives**: What was well-done (build confidence)
4. **Coding convention violations**: Brief overview of coding conventions broken, if found
5. **Architectural violations**: Brief overview of architectural principles or project architecture decision violations, if found
6. **Refactoring**: Structural improvements with examples if needed. Identify code that could be extracted out as utility functions or new service classes.
7. **Recommendations**: Actionable next steps

Once the review of each file is complete, add an overall assessment section. This section should state [or specify] whether the code changes align with the JIRA ticket.

## Team Conventions

### Commit Messages
- Follow format: [branch-name] Brief description
- Use imperative mood

### Testing Requirements
- Unit tests for all business logic
- Integration tests for API endpoints
- Minimum 80% code coverage

### Documentation
- README.md updated for new features
- Architecture.md updated with new decisions documented

## Continuous Improvement

This document is living and should evolve based on:
- Feedback from code reviews
- Recurring issues found in production
- New technologies and best practices adopted by the team

**Last Updated**: [Date]
**Recent Improvements**: [Track changes here]
```

3. Review the new files added to `.syran/` and adjust the files according to the current project.  Foe example, if the project is a Django project, then the files should be adjusted to fit the Django project structure.  Replace the generic templates with project-specific information and code snippets.

4. Confirm to the Captain that the logic templates have been initialized successfully under the `.syran/` directory.

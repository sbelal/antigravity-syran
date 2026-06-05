---
name: logic-init
description: "Initialize the logic officer workspace by creating the `.logic/` folder and copying the default architectural principles, decisions, coding conventions, and review guidelines templates. ACTIVATE this skill when the `.logic/` directory is missing or when the user requests logic initialization."
---

# Logic-Init Skill

This skill guides the agent in initializing the logic-officer workspace configuration files under the `.logic/` directory.

## Execution Workflow

1. Create a directory named `.logic/` at the root of the workspace if it does not already exist.
2. Create and write the following four files inside `.logic/` with their respective templates:

### File 1: `.logic/architectural_principles.md`
```markdown
# 🏛️ Architectural Guiding Principles

This document outlines the high-level architectural principles for this project. The goal is to ensure consistency, maintainability, and scalability in our codebase. All new code should adhere to these guidelines.

---

### Principle: Service-Oriented Architecture (SOA)

* **Rationale:** To decouple business logic from the presentation layer (views). This keeps views "thin," improves code reusability, and simplifies testing of business logic in isolation from HTTP concerns.
* **Implications:**
    * Business logic **must not** reside in `views.py` or DRF `ViewSets`.
    * Create service classes within `/services` folder in a relevant app (e.g., in `apps/my_app/services/my_services.py`) to encapsulate business operations.
    * Views are responsible only for handling HTTP requests/responses, data serialization, and calling the appropriate services.

---

### Principle: Fat Models, Thin Views

* **Rationale:** To centralize data-related logic within the Django models. This ensures data integrity, promotes DRY (Don't Repeat Yourself), and keeps business rules close to the data they affect.
* **Implications:**
    * Use model methods and properties for derived fields or data-related actions (e.g., `order.calculate_total()`, `user.is_active()`).
    * Use the `QuerySet` manager (`objects`) to create custom reusable queries (e.g., `Product.objects.available()`).
    * Views and services should call these model/manager methods directly rather than reimplementing the logic.

---

### Principle: Configuration via Environment Variables

* **Rationale:** To follow the [Twelve-Factor App](https://12factor.net/config) methodology, which separates configuration from code. This enhances security by keeping secrets out of the codebase and improves portability between environments (development, staging, production).
* **Implications:**
    * **Do not** hardcode sensitive values like API keys, database passwords, or `SECRET_KEY` in `settings.py`.
    * All configuration variables must be loaded from environment variables.
    * Use a `.env` file for local development, and ensure `.env` is listed in `.gitignore`.

---

### Principle: Explicit is Better than Implicit

* **Rationale:** Aligns with the Zen of Python. Code should be clear, readable, and unambiguous. This reduces the cognitive load for developers and minimizes bugs caused by misunderstanding "magical" behavior.
* **Implications:**
    * Avoid overly complex metaprogramming or Django signals where a direct function call would be clearer.
    * Name variables and functions descriptively (e.g., `is_eligible_for_discount` is better than `check_eligibility`).
    * When using Django Rest Framework, explicitly define serializer fields (`fields = ['id', 'name']`) instead of relying on `fields = '__all__'` to avoid accidentally exposing sensitive data.
```

### File 2: `.logic/project_architectural_decisions.md`
```markdown
# ⚙️ Project-Specific Decisions

This document lists the concrete, actionable rules and conventions for this project. The goal is to provide a single source of truth for implementation details, ensuring consistency across the codebase.

---

### Decision: Custom Exception Location

* **Reason:** Centralizes error handling within each app for better organization and discoverability.
* **Example:** For a `payments` app, a `PaymentError` exception must be located at `payments/exceptions.py`.
    ```python
    # payments/exceptions.py
    class PaymentError(Exception):
        """Base exception for payment processing errors."""
        pass

    class InsufficientFundsError(PaymentError):
        """Raised when a payment fails due to insufficient funds."""
        pass
    ```

---

### Decision: API URL Structure

* **Reason:** To maintain a consistent, predictable, and versioned API endpoint structure across the project.
* **Example:** All API URLs must be prefixed with `/api/v1/`. The URL should use plural nouns for resource names.
    ```python
    # project/urls.py
    from django.urls import path, include

    urlpatterns = [
        # ... other urls
        path('api/v1/', include('products.urls')),
        path('api/v1/', include('orders.urls')),
    ]

    # products/urls.py
    from django.urls import path
    from .views import ProductListCreateView

    urlpatterns = [
        path('products/', ProductListCreateView.as_view(), name='product-list'),
    ]
    ```

---

### Decision: Standardized Logger Names

* **Reason:** Provides a consistent and traceable logging structure, making it easier to debug issues by identifying the source of a log message.
* **Example:** Loggers should be named using Python's `__name__` convention, which resolves to the app and module path.
    ```python
    # any_app/services.py
    import logging

    logger = logging.getLogger(__name__)

    def some_function():
        logger.info("This is an informational message from any_app.services.")
        try:
            # ... some operation
        except Exception as e:
            logger.error("An error occurred: %s", e, exc_info=True)
    ```
```

### File 3: `.logic/coding_conventions.md`
```markdown
# ⚙️ Project Coding Conventions

This document outlines a set of coding conventions and best practices to be followed throughout this project. The goal is to ensure code quality, consistency, and maintainability, making the codebase easier to read, understand, and contribute to for all team members.

---

### Convention: Modularity and Decomposition

* Functions or methods should ideally be atomic. Break complex code into smaller parts.
* **Reason:** Smaller, atomic functions make your code significantly easier to read, test, and maintain.
```

### File 4: `.logic/code_review_guidelines.md`
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

3. Confirm to the Captain that the logic templates have been initialized successfully under the `.logic/` directory.

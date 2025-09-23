# Contributing to ghost-directory-table

## Before you begin
- Review the existing markup, styles, and sorter logic so new work stays consistent.
- Confirm the change aligns with the MIT license and fits the directory-table scope.
- Open an issue to propose substantial additions (new components, large refactors, or rebrands).

## Workflow
1. Fork the repository and create a focused feature branch.
2. Work in plain HTML, CSS, and vanilla JavaScript—avoid build tooling or frameworks.
3. Open `index.html` locally in current Chrome, Firefox, and Safari (or equivalents) to verify behavior.
4. Note the browsers tested, sample data used, and any accessibility checks performed.
5. Remove stray files and confirm `git status` is clean before committing.

## Quality checklist
- Preserve semantic table structure and keyboard-accessible sorting controls.
- Keep styles scoped to the directory table to avoid collisions when embedded in Ghost.
- Document new configuration options or data requirements in `README.md` or inline comments when necessary.
- Limit comments to clarifying non-obvious logic or Ghost-specific considerations.

## Pull requests
- Use imperative commit messages (e.g., `Add newsletter filter column`).
- In the PR description, summarize the change, testing evidence, and any compatibility risks.
- Attach screenshots or screen recordings if the change alters visuals or interaction.
- Respond quickly to review feedback so changes can ship without rework.

## Reporting issues
- Include expected vs. actual behavior, reproduction steps, sample rows, and browser details.
- Flag breaking regressions or accessibility concerns as high priority.
- For security-sensitive topics, follow `SECURITY.md` instead of opening a public ticket.

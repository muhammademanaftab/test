# CrossGuard CI Demo

This is a minimal repository that demonstrates CrossGuard running in GitHub Actions.

## What it does

On every push to `main` and on every pull request, the workflow:

1. Installs CrossGuard directly from the public source repo.
2. Runs `crossguard analyze src/` against this folder's HTML, CSS, and JavaScript.
3. Exports the results as SARIF 2.1.0.
4. Uploads the SARIF file to GitHub Code Scanning, so any compatibility issues
   appear under the **Security → Code scanning** tab of this repo.
5. Applies a quality gate (`--fail-on-score 50`) — if the overall compatibility
   score drops below 50%, the workflow fails and the commit is marked red.

## The test files

- `src/index.html` — standard HTML5 page using `<input>` placeholder, `hidden`
  attributes, inline SVG, and `data-*` attributes.
- `src/styles.css` — a mix of widely-supported features (flexbox, gradients,
  transforms, transitions) and a few newer ones (`:has()`, `aspect-ratio`).
- `src/app.js` — modern but well-supported JavaScript (arrow functions, `const`/`let`,
  template literals, `querySelector`, `addEventListener`, `localStorage`, destructuring).

## How to view results

After a workflow run completes:

```bash
gh run watch          # live log of the most recent run
gh browse -- /security/code-scanning   # SARIF results in the GitHub UI
```
# test

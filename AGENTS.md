# Repository Guidelines

## Project Structure & Module Organization
- Root HTML pages: `index.html`, `about.html`, `hack.html`, `sponsor.html`, `team.html`, `privacy.html`, `imprint.html`, `speak.html`.
- Styles live in `css/` (primary stylesheet: `css/style.css`).
- Images and icons in `img/`; web fonts in `font/`.
- JavaScript libraries and compiled assets in `dist/` (e.g., `dist/paper-full.js`).
- Domain configuration in `CNAME`.

## Build, Test, and Development Commands
This repo is a static site; you can open any HTML file directly in a browser for local review.
- `npm install`: installs toolchain dependencies listed in `package.json` (used for gulp tasks).
- `npm run build`: runs `gulp build` to produce assets (if gulp workflow is set up locally).
- `npm test`: runs `gulp test` (if configured in your local environment).

If you do not need the gulp pipeline, you can edit HTML/CSS directly and refresh the browser.

## Coding Style & Naming Conventions
- Indentation: 4 spaces in HTML/CSS; keep existing formatting in embedded scripts.
- File naming: lowercase, dash-separated for new static pages (e.g., `new-page.html`).
- Prefer editing `css/style.css` rather than adding new stylesheets unless the change is large and isolated.
- No automated formatter or linter is configured; keep changes minimal and consistent with surrounding code.

## Testing Guidelines
- No automated tests are present in the repo.
- Manual checks: open the affected HTML pages in a browser and verify layout, navigation links, and asset loading.
- If you rely on the gulp workflow, run `npm test` to execute any configured checks.

## Commit & Pull Request Guidelines
- Recent commits use short, imperative summaries (e.g., “Update CNAME”, “add more resources”).
- Keep commit messages concise and focused on the change.
- PRs should include:
  - A brief description of what changed and why.
  - Screenshots or screen recordings for visual updates.
  - Linked issue or ticket if one exists.

## Configuration Tips
- `CNAME` controls the custom domain; coordinate changes with deployment.
- Update `img/` and `font/` assets cautiously to avoid breaking page references.

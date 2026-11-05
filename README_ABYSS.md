# Abyss Guild Armory — GitHub Migration Pack v1.3.0

This is a **non-destructive update for the existing FATE Guild Armory repository**, not a blank replacement site. It keeps the existing JavaScript, parser, build pipeline, tests, raw session exports, character identity tracking, raid history, loot and rolls.

## Destination

- GitHub account/organization: `abyss-raids`
- Repository: `abyss-stats`
- Expected GitHub Pages project URL (after names and Pages settings are changed): `https://abyss-raids.github.io/abyss-stats/`

## Install through GitHub's website

1. **Back up the whole current repository** by going to `https://github.com/Fate-Raids/fate-stats` > **Code** > **Download ZIP**. Separately preserve `raid-exports/` (real history).
2. In your GitHub account/organization settings, change `fate-raids` to `abyss-raids` if it is available. In the repository **Settings** > **General**, rename `fate-stats` to `abyss-stats`.
3. Open the renamed `abyss-stats` repo. Use **Add file** > **Upload files** and drag in the CONTENTS of this migration pack, retaining paths:
   - `.github/workflows/deploy.yml`
   - `scripts/abyss-brand.mjs`
   - `assets/abyss-crest.svg`
   - `assets/abyss-theme.css`
   (The two documentation files are optional.)
4. **Do not delete** existing `index.html`, `assets/site.js`, `assets/site.css`, `assets/parser.js`, `assets/catalog.js`, `scripts/build-archive.mjs`, `tests/`, `data/`, or `raid-exports/`. Do not replace them with empty folders from this pack.
5. Go to repo **Settings** > **Pages** and select **GitHub Actions** for Build and deployment. A commit to `main` should trigger **Publish Abyss Guild Armory** in the **Actions** tab. You can also run the workflow manually.
6. When deployment succeeds, visit `https://abyss-raids.github.io/abyss-stats/`. Ensure the browser actually shows `ABYSS` and check **Armory**, **Raid Chronicles**, **Loot Treasury**, **Roll Analyzer**, **Statistics** and **Text Size**.

## What changes

The site title, side branding, header, footer, hero copy, live browser page title and site favicon/crest become **ABYSS**. The existing 6 archive views and character details are preserved. A new Abyss-themed palette overlays the old stone/bronze look. Site CSS typography variables, 3D canvas IDs and the existing localStorage font preference key are intentionally preserved for compatibility. The 3D preview keeps its prior experimental limitations.

**Historical data stays unchanged:** This pack does not edit or rename old guild fields in PlusOne exports; a 2026 FATE raid remains an authentic historical FATE raid in the archive. The current public site's guild masthead is Abyss.

## How the rebrand works

The original repository's `npm test` and `npm run build` run first. Next, `node scripts/abyss-brand.mjs --dist` updates only `dist/index.html`, `dist/assets/site.js` and publishes the new crest and CSS overlay in `dist/assets/`. All generated `dist/data/` JSON is untouched. The source files stay recoverable and diff-free. The repository may still contain old FATE references in historical documentation; these are not visitors' site branding.

Optional: `node scripts/abyss-brand.mjs --source` changes the original `index.html` and `assets/site.js` in your local checkout, but this is **not needed** for GitHub deployment; the workflow patches the published output automatically. Do not run it against a different site codebase without reviewing the changes.

## Rollback

Remove `.github/workflows/deploy.yml` and restore your previous working workflow/source from the downloaded repository backup. The archive JSON was never modified by this pack.

## Notes

- If you upload exports later, add each **new** PlusOne export as a separate JSON file under `raid-exports/`; future GitHub Actions runs regenerate the guild histories.
- If a different workflow already exists in `.github/workflows/`, disable that older Pages publisher to avoid competing deployments. The old repo currently shows a file under `.github/workflow/` (singular), which GitHub Actions does not execute.
- The output site is hosted under a **repository subpath**, so all shipped image/data URLs remain relative. No hardcoded old GitHub Pages URL is added.
- GitHub username availability and whether the user has permission to rename it were not checked. You must rename the account and repository on GitHub; this ZIP cannot do so.

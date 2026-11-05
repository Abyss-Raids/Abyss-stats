# Abyss Guild Armory v1.3.0 — Branding & GitHub Pages update

- Changed public-facing guild identity from **FATE** to **ABYSS** without modifying archive exports.
- Added original Abyss heraldic rift crest / favicon and deep midnight, teal, silver visual palette.
- Kept all archive navigation, plus-one loot tracking, raider details, equipment snapshots, SoftRes records, roll histograms, JSON preview and text scaling from the existing site.
- Added the new Pages deployment workflow under the correct `.github/workflows/` directory; runs existing Node 22 tests and site build then performs a presentation-only patch.
- Updated expected GitHub Pages location for username `abyss-raids` and repository `abyss-stats`.
- Preserved the original source modules and historical raw JSON records with no reformatting or guild-name rewrites.

Limitation: This is an **overlay package**, not a full copy of the original repository, and cannot stand on its own without the existing site source.

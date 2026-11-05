# ABYSS Guild Armory — v1.4.0

World of Warcraft: Forever · PvE Guild · Raid Chronicles & Guild Statistics.

## Live website

https://abyss-raids.github.io/Abyss-stats/

GitHub repository: https://github.com/Abyss-Raids/Abyss-stats

**The capital A in Abyss-stats is required in the GitHub Pages URL.**

## What's on the site

- Abyss homepage title card, rift crest, and dark midnight/teal/silver palette.
- Guild overview with PvE identity, progression-together philosophy and preserved raid history.
- Armory, Raid Chronicles, Loot Treasury, Roll Analyzer and Guild Statistics.
- Characters, equipment snapshots, awards and roll history appear once actual PlusOne session exports are uploaded.

## How it deploys

On pushes to main, GitHub Actions runs npm test, npm run build, and publishes the dist folder. The actual source files include Abyss branding; no post-build search-and-replace is required.

Choose Settings > Pages > Build and deployment: GitHub Actions.

## History and compatibility

Original session exports under raid-exports/ are preserved, including original guild names if they contain FATE. The code and generated data do not rewrite historical loot, identity, character IDs or raid records.

Internal CSS variables and device preference storage keys that mention fate remain for compatibility; these are not displayed as guild branding.

## Troubleshooting

If the lowercase /abyss-stats/ path gives a 404, use /Abyss-stats/ or the included 404 redirect. Refresh with Ctrl+Shift+R after successful deployment.

An empty raid-exports directory produces a working but empty archive until real exports are published.

## Disclaimer

Unofficial fan project; not affiliated with Blizzard Entertainment.

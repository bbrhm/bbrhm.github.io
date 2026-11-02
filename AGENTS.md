# Website editing

Read README.md first. This repository is bbrhm's public personal site. The sibling `bbrhm` repository contains the GitHub profile README. Application repositories are private and outside this task's edit scope unless the user asks otherwise.

## Voice and appearance

- Matter of fact, modest and low key. Describe what exists in plain language.
- Use warm off-white, brown/taupe text and neutral surfaces. Green is a small accent for links, focus and status, not the base colour of the site. Dark mode uses warm brown neutrals too.
- Use normal system sans-serif headings at modest sizes. The user found oversized italic Instrument Serif headings and the circular monogram too classy; do not bring those back. Keep the two-column project previews, stacked on phones.
- Use existing project artwork and screenshots. Keep illustration labels, historical screenshot descriptions and source credits accurate. Do not invent product screenshots.
- Avoid marketing copy, superlatives, invented biography, achievements, audience figures, testimonials, badges and decorative dashboards.
- Use the full names Arabic Reader Toolkit and Open Map Driver. Check their current root summaries before changing factual descriptions. Do not copy operational details from private repositories into this public site.
- Link to the public deployments. Do not add links to private source repos as though visitors can access them.

## Structure and checks

- Add projects in `src/_data/projects.json`, and articles as Markdown under `src/articles/`.
- Do not create sample articles for public display. `draft: true` and future dates exclude articles from output.
- Keep article slugs stable. Preserve the shared article layout, feed, sitemap and accessible navigation.
- Keep the site static; it does not need a client framework, accounts, a database or analytics for its present purpose.
- Run `npm run check`. Check narrow and wide layouts, and light and dark themes when browser preview is available.
- Publish through the Pages workflow. Do not commit `_site/`, `node_modules/`, `.DS_Store`, credentials or copied private application files.
- Keep the profile README's short project descriptions and public links consistent when they change here.

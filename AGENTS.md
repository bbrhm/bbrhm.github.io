# Website editing

Read README.md first. This repository is bbrhm's public personal site. The sibling `bbrhm` repository contains the GitHub profile README. Application repositories are private and outside this task's edit scope unless the user asks otherwise.

## Voice and appearance

- Matter of fact, modest and low key. Describe what exists in plain language.
- Keep the warm paper background, dark text, muted green, restrained serif headings and simple list layout.
- The user explicitly chose the first website design (commit `cefc62ce132c85d44d17d7ea96627897a362812a`) and asked to restore it after rejecting subsequent redesigns. Preserve that design for future content updates.
- Do not reintroduce large italic display headings, Instrument Serif, circular monograms, two-column image cards, project previews, or the later editorial/portfolio styling. Treat general requests to improve the site as refinements within the original design.
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

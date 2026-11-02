# Website editing

Read README.md first. This repository is bbrhm's public personal site. The sibling `bbrhm` repository contains the GitHub profile README. Application repositories are private and outside this task's edit scope unless the user asks otherwise.

## Voice and appearance

- Matter of fact, modest and low key. Describe what exists in plain language.
- Use sans-serif fonts for all interface and article text. Keep the original simple list layout and modest typography.
- Day mode uses warm off-white and taupe neutrals. Night mode uses almost-black (`#0b0b0b`) with near-neutral charcoal surfaces; the user rejected the previous brown background. Do not use brown or green-tinted dark surfaces. Green is limited to small accents such as links, focus indicators and status labels; retain existing project icon artwork.
- The user explicitly chose the first website design (commit `cefc62ce132c85d44d17d7ea96627897a362812a`) and asked to restore it after rejecting subsequent redesigns. Preserve that design for future content updates.
- Do not reintroduce large italic display headings, Instrument Serif, circular monograms, two-column image cards, project previews, or the later editorial/portfolio styling. Treat general requests to improve the site as refinements within the original design.
- Each project is one full-row native link with a clear keyboard focus outline and accessible project name/description. Do not nest links or buttons inside it. Omit redundant category labels, and hide the Articles count while there are no published articles.
- Motion should be short and subtle, with no loops or hidden content dependency. Honour reduced-motion preferences and keep keyboard focus clear.
- Keep the header name as plain `bbrhm`, with no trailing decorative dot. Under it, show `أبو إبراهيم` as small subtext in self-hosted IBM Plex Sans Arabic, with `lang="ar"`, `dir="rtl"` and no Arabic letter spacing. Keep the share image and page titles consistent with the main name.
- Day/night mode uses a small header switch and `src/assets/theme.js`. Start from the device preference, persist a manual choice, restore it before paint, and keep the control keyboard-accessible. Without JavaScript the site follows the device preference. Preserve warm neutrals in both themes.
- Keep descriptive titles, canonical links, Open Graph/Twitter metadata, the share image, JSON-LD, robots.txt, sitemap and feed consistent. Structured data must describe actual content; do not invent credentials, ratings, dates or achievements. JSON-LD is inert data, not executable browser JavaScript.
- Avoid marketing copy, superlatives, invented biography, achievements, audience figures, testimonials, badges and decorative dashboards.
- Use the full names Arabic Reader Toolkit and Open Map Driver. Check their current root summaries before changing factual descriptions. Do not copy operational details from private repositories into this public site.
- Link to the public deployments. Do not add links to private source repos as though visitors can access them.

## Structure and checks

- Add projects in `src/_data/projects.json`, and articles as Markdown under `src/articles/`.
- Do not create sample articles for public display. `draft: true` and future dates exclude articles from output.
- Keep article slugs stable. Preserve the shared article layout, feed, sitemap and accessible navigation.
- Keep the site static; it does not need a client framework, accounts or a database for its present purpose. The user-requested theme switch and Google Analytics tag are intentional.
- The owner explicitly enabled Google Analytics with measurement ID `G-373S98MM0S`. Preserve the supplied snippet in `src/_includes/analytics.njk`, included once in the shared head. Do not add duplicate initialization, custom events or change the measurement ID without a request.
- Run `npm run check`. Check narrow and wide layouts, and light and dark themes when browser preview is available.
- Publish through the Pages workflow. Do not commit `_site/`, `node_modules/`, `.DS_Store`, credentials or copied private application files.
- Keep the profile README's short project descriptions and public links consistent when they change here.

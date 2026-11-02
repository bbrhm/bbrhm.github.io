# bbrhm.github.io

Personal website: projects, demos and articles. Built with Eleventy, published on GitHub Pages. The output is static HTML and CSS; there is no browser JavaScript, analytics or remote font dependency.

## Local preview

Use Node 22 (Node 20.19+ also works).

```sh
npm ci
npm run dev
```

Open `http://localhost:8080`. Run `npm run check` before publishing. Generated files go in `_site/` and are not committed.

## Add or edit a project

Edit `src/_data/projects.json`. Entries appear in their listed order. Copy a small project icon into `src/assets/` and use its root-relative path. Use the public site or demo URL; the application source repositories are private.

An optional `preview` adds a project illustration or screenshot. Include its original `previewWidth`/`previewHeight`, descriptive `previewAlt`, and a short `previewCaption`. Add `creditUrl`/`creditLabel` where needed. Historical screenshots must be described as earlier versions. The current previews reuse the applications' published reading illustration and earlier driving screenshot.

## Add an article

Create `src/articles/article-slug.md`:

```markdown
---
title: Article title
description: A short summary.
date: 2026-11-02
draft: true
---

Start the article here. The layout supplies the title, date and summary.

## A section

Write in Markdown.
```

Change the date to the publication date and remove `draft: true` to publish. The filename sets the URL: `/articles/article-slug/`. The homepage, articles index, Atom feed and sitemap update automatically. Drafts and future-dated articles are excluded from the build. A future-dated article needs a new build on or after its date; there is no scheduled publishing job. Dates are interpreted in UTC.

For images, add files under `src/assets/` and use descriptive alt text. Keep the article filename stable after publication. There are no published articles initially.

## Publish

The `Website` workflow checks pushes and pull requests. A push to `main` publishes after a successful build. Pull requests only build.

For the initial setup, go to [Settings → Pages](https://github.com/bbrhm/bbrhm.github.io/settings/pages) and select **GitHub Actions** as the source. Then run the [Website workflow](https://github.com/bbrhm/bbrhm.github.io/actions/workflows/pages.yml) if the first deployment ran before Pages was enabled. This needs to be done once.

## Files

- `src/_data/projects.json`: project listing.
- `src/articles/*.md`: articles.
- `src/_includes/`: shared page and article layouts.
- `src/assets/site.css`: styles; dark mode follows the device preference.
- `src/_data/site.json`: site details.
- `../bbrhm/README.md`: separate GitHub profile repository; keep project descriptions consistent.

Project artwork is copied from the respective applications. Instrument Serif is bundled locally under the SIL Open Font License. See [THIRD_PARTY.md](THIRD_PARTY.md). No application source code is included here.

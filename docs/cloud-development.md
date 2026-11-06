# Codex cloud development

This is the source for [bbrhm.github.io](https://bbrhm.github.io). Read [AGENTS.md](../AGENTS.md) for design and content preferences and [README.md](../README.md) for article authoring. Each cloud checkout can work independently of the owner's computer and other repositories.

## Environment setup

Connect the GitHub repository `bbrhm/bbrhm.github.io` and select the branch for the task. Configure the environment as follows:

| Setting | Value |
| --- | --- |
| Runtime | Node 22, matching `.nvmrc` and GitHub Actions |
| Setup script | `npm ci` |
| Maintenance script, if supported | `npm ci` to refresh dependencies when a cached environment resumes |
| Environment variables / secrets | None required |
| Agent internet access | Not required for routine editing, builds or checks after setup |

Run setup commands from the repository root. Dependency installation needs access to the npm registry. The lockfile is committed; use `npm ci` rather than updating packages as part of unrelated tasks. Setup belongs in the cloud environment settings; `.nvmrc` records the runtime but does not configure a cloud environment by itself.

No Firebase CLI, OpenAI API key, Google Analytics account access, private app checkout, Python or system font installation is required for the normal build. Project icons, the Arabic font and the share image are already committed. Python/Pillow and a supplied sans-serif font are needed only when deliberately regenerating the share image; see the README.

## Work and validation

1. Read the task, `AGENTS.md` and the relevant source. Current project facts are in `src/_data/projects.json`; site identity and URLs are in `src/_data/site.json`.
2. Make the requested change within the existing simple layout. Templates live in `src/_includes/`, styles in `src/assets/site.css`, and theme behavior in `src/assets/theme.js`.
3. Run `npm run check` and `git diff --check`. The check command rebuilds from scratch, runs theme behavior tests and validates generated pages, links, metadata and the single analytics initialization. It does not verify live service availability or Analytics event delivery.
4. For visual changes, run `npm run dev` and use the environment's browser preview for port 8080 if available. Inspect mobile and desktop, both themes, keyboard navigation and reduced motion. If preview is unavailable, state that limitation rather than claiming visual verification.
5. Review `git diff` and `git status --short`. Leave only intentional source changes. `npm run clean` removes generated `_site/`; `node_modules/` is ignored. Neither belongs in a commit.

The website is static Eleventy output with a small theme script and the owner-provided Google tag. Keep the current stack for routine changes. The article about Arabic learning is planned, but the owner has not supplied its text. Do not invent it or publish sample posts.

For a new article, use the README's Markdown/front matter format and keep `draft: true` until publication is requested. Drafts and future-dated posts are excluded, including from the feed and sitemap. Dates use UTC; a future date requires another build after that date to become public. A draft is still committed source in this public repository, so it is not private storage for unpublished material.

## Review and publication

Cloud tasks can return a branch/diff or PR for review. The `Website` GitHub Actions workflow runs the same `npm ci` and `npm run check` on Ubuntu/Node 22. Pull requests validate without deploying; a push or merge to `main` publishes through GitHub Pages. Check that workflow's deployment result before reporting the change as live. Pages must use **GitHub Actions** as its source, as described in the README.

The profile is a separate repository, [bbrhm/bbrhm](https://github.com/bbrhm/bbrhm). If a project name, URL, access status or short description changes here, update the profile when it is in scope and accessible. Otherwise, list the companion edit in the task result. Do not require sibling folders or copy private application code into this repository.

## Example tasks

- “Refine the mobile spacing while keeping the current layout, typography and day/night palettes. Run the checks and prepare a PR.”
- “Format the Arabic-learning article text below as a Markdown draft. Keep my wording, add the supplied Arabic examples with `lang="ar" dir="rtl"`, and do not publish it yet.”
- “Add this demo to the project list using the supplied description, public URL, status and icon. Keep the full-row link behavior and run the checks.”

These settings follow the [official cloud environment documentation](https://learn.chatgpt.com/docs/environments/cloud-environment). Codex reads the repository's [AGENTS.md instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md) at task startup; changes to preferences should be recorded there for later tasks.

import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve("_site");
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]
);
for (const path of ["index.html", "articles/index.html", "404.html", "feed.xml", "sitemap.xml", "robots.txt", ".nojekyll"]) {
  assert(existsSync(join(root, path)), `Missing output: ${path}`);
}
const pages = walk(root).filter((file) => file.endsWith(".html"));
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `Expected one page title: ${file}`);
  assert(html.includes('href="#main"'), `Missing skip link: ${file}`);
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  for (const [, attributes, content] of scripts) {
    assert(/^\s*type="application\/ld\+json"\s*$/.test(attributes), `Unexpected executable script: ${file}`);
    const schema = JSON.parse(content);
    assert.equal(schema["@context"], "https://schema.org", `Invalid structured data: ${file}`);
    assert(schema["@graph"].some((item) => item["@type"] === "Person"), `Missing author: ${file}`);
  }
  const noindex = html.includes('name="robots" content="noindex"');
  assert.equal(scripts.length, noindex ? 0 : 1, `Unexpected structured data count: ${file}`);
  assert(/<title>[^<]+<\/title>/.test(html), `Missing page title: ${file}`);
  assert(/<meta name="description" content="[^"]+">/.test(html), `Missing description: ${file}`);
  assert(html.includes('name="twitter:card" content="summary_large_image"'), `Missing sharing metadata: ${file}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)[1];
  const expectedPath = file.slice(root.length).replace(/index\.html$/, "");
  assert.equal(new URL(canonical).pathname, expectedPath, `Incorrect canonical URL: ${file}`);
  const shareImage = html.match(/<meta property="og:image" content="([^"]+)">/)[1];
  const imageUrl = new URL(shareImage);
  if (imageUrl.origin === "https://bbrhm.github.io") {
    assert(existsSync(join(root, decodeURIComponent(imageUrl.pathname))), `Missing share image: ${file}`);
  }
  assert(!/\{%|\{\{/.test(html.replace(/<pre[\s\S]*?<\/pre>/g, "")), `Unrendered template: ${file}`);
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|data:)/.test(target)) continue;
    const url = new URL(target, `https://bbrhm.github.io/${file.slice(root.length + 1)}`);
    const targetPath = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    assert(targetPath === root || targetPath.startsWith(`${root}/`), `Link escapes site: ${target}`);
    const output = targetPath.endsWith("/") || !/\.[^/]+$/.test(targetPath)
      ? join(targetPath, "index.html") : targetPath;
    assert(existsSync(output), `Broken local link in ${file}: ${target}`);
    if (url.hash && output.endsWith(".html")) {
      const destination = output === file ? html : readFileSync(output, "utf8");
      assert(destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor: ${target}`);
    }
  }
}
const home = readFileSync(join(root, "index.html"), "utf8");
const projects = JSON.parse(readFileSync("src/_data/projects.json", "utf8"));
for (const project of projects) {
  assert(new URL(project.url).protocol === "https:", `Project link must use HTTPS: ${project.name}`);
  assert(home.includes(project.name) && home.includes(project.url), `Project missing from homepage: ${project.name}`);
}
console.log(`Checked ${pages.length} pages: links, anchors, titles, canonical URLs, sharing metadata and structured data pass.`);

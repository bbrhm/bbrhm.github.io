import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../src/assets/theme.js", import.meta.url), "utf8");

function visit({ saved = null, dark = false, readBlocked = false, writeBlocked = false, ready = false } = {}) {
  const root = { dataset: {} };
  const metas = [{ content: "#f6f2eb" }, { content: "#0b0b0b" }];
  const documentEvents = {}, windowEvents = {}, mediaEvents = {}, buttonEvents = {};
  const button = {
    hidden: true, attributes: {}, title: "",
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, callback) { buttonEvents[name] = callback; }
  };
  const media = {
    matches: dark,
    addEventListener(name, callback) { mediaEvents[name] = callback; }
  };
  const document = {
    documentElement: root, readyState: ready ? "complete" : "loading",
    querySelectorAll() { return metas; },
    querySelector() { return button; },
    addEventListener(name, callback) { documentEvents[name] = callback; }
  };
  const window = {
    matchMedia() { return media; },
    localStorage: {
      getItem() { if (readBlocked) throw new Error("Storage blocked"); return saved; },
      setItem(key, value) { if (writeBlocked) throw new Error("Storage blocked"); saved = value; }
    },
    addEventListener(name, callback) { windowEvents[name] = callback; }
  };
  vm.runInNewContext(source, { window, document });
  return {
    root, button, metas,
    saved: () => saved,
    ready: () => documentEvents.DOMContentLoaded?.(),
    click: () => buttonEvents.click(),
    device: (matches) => { media.matches = matches; mediaEvents.change(); },
    storage: (newValue, key = "bbrhm-theme") => windowEvents.storage({ key, newValue })
  };
}

test("the device theme is set before the controls load, then the button switches and saves it", () => {
  const page = visit();
  assert.equal(page.root.dataset.theme, "light");
  assert.equal(page.button.hidden, true);
  page.ready();
  assert.equal(page.button.hidden, false);
  assert.equal(page.button.attributes["aria-label"], "Switch to night mode");
  page.click();
  assert.equal(page.root.dataset.theme, "dark");
  assert.equal(page.saved(), "dark");
  assert.equal(page.button.attributes["aria-label"], "Switch to day mode");
  assert(page.metas.every((meta) => meta.content === "#0b0b0b"));
  page.click();
  assert.equal(page.root.dataset.theme, "light");
  assert.equal(page.saved(), "light");
  assert(page.metas.every((meta) => meta.content === "#f6f2eb"));
});

test("saved day and night preferences override the device and survive a new page", () => {
  for (const theme of ["light", "dark"]) {
    const page = visit({ saved: theme, dark: theme === "light", ready: true });
    assert.equal(page.root.dataset.theme, theme);
    assert.equal(page.button.hidden, false);
    page.device(theme === "light");
    assert.equal(page.root.dataset.theme, theme);
    page.click();
    const nextPage = visit({ saved: page.saved(), dark: theme === "dark" });
    assert.equal(nextPage.root.dataset.theme, theme === "light" ? "dark" : "light");
  }
});

test("device changes apply until a visitor chooses an appearance", () => {
  const page = visit();
  page.ready();
  page.device(true);
  assert.equal(page.root.dataset.theme, "dark");
  page.click();
  page.device(false);
  page.device(true);
  assert.equal(page.root.dataset.theme, "light");
});

test("invalid preferences and unavailable storage do not break switching", () => {
  const invalid = visit({ saved: "invalid", dark: true, ready: true });
  assert.equal(invalid.root.dataset.theme, "dark");
  const blocked = visit({ readBlocked: true, writeBlocked: true, ready: true });
  blocked.click();
  assert.equal(blocked.root.dataset.theme, "dark");
  assert.equal(blocked.saved(), null);
  blocked.device(true);
  blocked.device(false);
  assert.equal(blocked.root.dataset.theme, "dark");
  blocked.click();
  assert.equal(blocked.root.dataset.theme, "light");
});

test("other tabs can change or clear a preference without unrelated storage affecting it", () => {
  const page = visit({ dark: true, ready: true });
  page.storage("light");
  assert.equal(page.root.dataset.theme, "light");
  page.storage("dark", "unrelated-key");
  assert.equal(page.root.dataset.theme, "light");
  page.storage("dark");
  assert.equal(page.root.dataset.theme, "dark");
  page.storage("light");
  page.storage(null);
  assert.equal(page.root.dataset.theme, "dark");
  page.storage("light");
  page.storage(null, null);
  assert.equal(page.root.dataset.theme, "dark");
});

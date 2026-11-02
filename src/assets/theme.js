(() => {
  const key = "bbrhm-theme";
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const validTheme = (value) => value === "light" || value === "dark" ? value : null;
  let preference = null;
  let button = null;

  try {
    preference = validTheme(window.localStorage.getItem(key));
  } catch {
    // The switch still works when browser storage is unavailable.
  }

  function applyTheme() {
    const theme = preference || (system.matches ? "dark" : "light");
    root.dataset.theme = theme;
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.content = theme === "dark" ? "#211e1a" : "#f6f2eb";
    });
    if (button) {
      const label = theme === "dark" ? "Switch to day mode" : "Switch to night mode";
      button.setAttribute("aria-label", label);
      button.title = label;
      button.hidden = false;
    }
  }

  // Set the saved appearance before the stylesheet and page are painted.
  applyTheme();

  function connectButton() {
    button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    button.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(key, preference);
      } catch {
        // Retain this page's choice in memory if storage is blocked.
      }
      applyTheme();
    });
    applyTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", connectButton, { once: true });
  } else {
    connectButton();
  }
  system.addEventListener("change", () => {
    if (!preference) applyTheme();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    preference = validTheme(event.newValue);
    applyTheme();
  });
})();

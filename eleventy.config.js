export default function (eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: true });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });
  eleventyConfig.addCollection("articles", (collection) =>
    collection.getFilteredByGlob("src/articles/**/*.md")
      .filter((item) => !item.data.draft && item.date <= new Date())
      .sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addPreprocessor("drafts", "md,njk", (data) => {
    if (data.draft || (data.date && new Date(data.date) > new Date())) return false;
  });
  eleventyConfig.addFilter("readableDate", (date) => new Intl.DateTimeFormat("en-AU", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
  }).format(date));
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString());
  eleventyConfig.addFilter("absoluteUrl", (path) => new URL(path, "https://bbrhm.github.io").href);
  eleventyConfig.addFilter("jsonLd", (value) => JSON.stringify(value)
    .replace(/[<>&\u2028\u2029]/g, (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`));
  eleventyConfig.addFilter("latestUpdate", (articles) => articles.length
    ? new Date(Math.max(...articles.map((post) => new Date(post.data.updated || post.date).getTime())))
    : new Date("2026-11-02T00:00:00Z"));
  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk"
  };
}

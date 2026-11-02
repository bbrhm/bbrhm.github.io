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
  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk"
  };
}

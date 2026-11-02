export default {
  layout: "article.njk",
  section: "articles",
  article: true,
  permalink: ({ page }) => `/articles/${page.fileSlug}/`
};

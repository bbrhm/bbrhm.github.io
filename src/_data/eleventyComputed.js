export default {
  seo(data) {
    const { site, page } = data;
    const url = new URL(page.url, site.url).href;
    const title = data.title ? `${data.title} · ${site.name}` : `${site.name} · Projects & articles`;
    const description = data.description || site.description;
    const image = new URL(data.image || site.socialImage, site.url).href;
    const personId = `${site.url}/#person`;
    const websiteId = `${site.url}/#website`;
    const author = { "@type": "Person", "@id": personId, name: site.name, url: `${site.url}/`, sameAs: [site.github] };
    const pageData = {
      "@type": data.article ? "BlogPosting" : data.section === "articles" ? "CollectionPage" : "WebPage",
      "@id": `${url}#page`, url, name: title, description,
      inLanguage: "en", isPartOf: { "@id": websiteId }, author: { "@id": personId }
    };
    if (data.article) {
      pageData.headline = data.title;
      pageData.mainEntityOfPage = url;
      pageData.datePublished = new Date(page.date).toISOString();
      pageData.dateModified = new Date(data.updated || page.date).toISOString();
      if (data.image) pageData.image = image;
    } else if (page.url === "/") {
      pageData.mainEntity = {
        "@type": "ItemList",
        itemListElement: data.projects.map((project, index) => ({
          "@type": "ListItem", position: index + 1,
          item: { "@type": "CreativeWork", name: project.name, description: project.description, url: project.url, creator: { "@id": personId } }
        }))
      };
    }
    return {
      title, description, url, image,
      imageAlt: data.imageAlt || (data.image ? data.title : site.socialImageAlt),
      imageWidth: data.image ? data.imageWidth : 1200,
      imageHeight: data.image ? data.imageHeight : 630,
      published: data.article ? pageData.datePublished : null,
      modified: data.article ? pageData.dateModified : null,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebSite", "@id": websiteId, name: site.name, url: `${site.url}/`, description: site.description, inLanguage: "en", publisher: { "@id": personId } },
          author, pageData
        ]
      }
    };
  }
};

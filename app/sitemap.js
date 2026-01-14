import tools from '../data/tools.json';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freetoolbox.app';

export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes];
}


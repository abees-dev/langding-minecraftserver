import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'],
    },
    sitemap: [
      `${siteConfig.websiteUrl}/sitemap.xml`,
      `${siteConfig.websiteUrl}/rss.xml`,
    ],
    host: siteConfig.websiteUrl,
  };
}


import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blogs';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.websiteUrl;

  const posts = getAllPosts();

  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const isCoreInfo = post.category === 'Thông Tin Server' || Boolean(post.featured);
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: isCoreInfo ? 'daily' : 'weekly',
      priority: isCoreInfo ? 0.95 : 0.8,
    };
  });

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return [...staticEntries, ...blogPostEntries];
}


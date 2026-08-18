import { getAllPosts, absoluteAssetUrl } from '@/lib/blogs';
import { siteConfig } from '@/config/site';

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = siteConfig.websiteUrl;

  const rssItems = posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const coverImage = absoluteAssetUrl(post.coverImage);
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author><![CDATA[${post.author}]]></author>
      <category><![CDATA[${post.category}]]></category>
      <media:content url="${coverImage}" medium="image" />
    </item>`;
    })
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title><![CDATA[${siteConfig.fullName} - Blog & Tin Tức]]></title>
    <link>${baseUrl}/blog</link>
    <description><![CDATA[Trải nghiệm máy chủ Minecraft RPG Việt Nam đỉnh cao. Cập nhật bài viết thông tin máy chủ AetherMine, cẩm nang hướng dẫn tân thủ đào quặng.]]></description>
    <language>vi-VN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import { siteConfig } from '@/config/site';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  featured?: boolean;
  contentHtml?: string;
  readTime: string;
}

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

/**
 * Absolute URL for OG/JSON-LD (keeps external https URLs as-is).
 */
export function absoluteAssetUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  return new URL(pathOrUrl, siteConfig.websiteUrl).toString();
}

/**
 * Demote every markdown heading by +1 so the page H1 (post title) stays unique.
 * Caps at depth 6.
 */
function demoteHeadings() {
  return (tree: { type?: string; depth?: number; children?: unknown[] }) => {
    const visit = (node: { type?: string; depth?: number; children?: unknown[] }) => {
      if (node.type === 'heading' && typeof node.depth === 'number') {
        node.depth = Math.min(node.depth + 1, 6);
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          visit(child as { type?: string; depth?: number; children?: unknown[] });
        }
      }
    };
    visit(tree);
  };
}

/**
 * Tính thời gian đọc ước tính dựa trên số từ
 */
function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} phút đọc`;
}

/**
 * Lấy danh sách tất cả các bài viết Markdown (đã memoize với React cache)
 */
export const getAllPosts = cache((): BlogPost[] => {
  // Tạo thư mục nếu chưa tồn tại
  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(blogsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      const readTime = calculateReadTime(matterResult.content);

      return {
        slug,
        title: matterResult.data.title || 'Bài viết không tiêu đề',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        author: matterResult.data.author || 'AetherMine Team',
        category: matterResult.data.category || 'Thông Tin Server',
        tags: matterResult.data.tags || [],
        excerpt: matterResult.data.excerpt || '',
        coverImage:
          matterResult.data.coverImage ||
          'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
        featured: Boolean(matterResult.data.featured),
        readTime,
      } as BlogPost;
    });

  // Sắp xếp bài viết mới nhất lên đầu
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
});

/**
 * Bài liên quan: ưu tiên cùng category / tags, fallback bài mới nhất.
 */
export function getRelatedPosts(
  post: BlogPost,
  allPosts: BlogPost[] = getAllPosts(),
  limit = 3,
): BlogPost[] {
  return allPosts
    .filter((p) => p.slug !== post.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === post.category) score += 3;
      score += candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      return { candidate, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.candidate.date < b.candidate.date ? 1 : -1;
    })
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

/**
 * Lấy nội dung bài viết theo Slug và chuyển Markdown sang HTML (đã memoize với React cache)
 */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Chuyển đổi Markdown thành HTML string (kèm plugin remarkGfm để hỗ trợ Table/GFM)
    const processedContent = await remark()
      .use(demoteHeadings)
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(matterResult.content);

    const contentHtml = processedContent.toString();
    const readTime = calculateReadTime(matterResult.content);

    return {
      slug,
      title: matterResult.data.title || 'Bài viết không tiêu đề',
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      author: matterResult.data.author || 'AetherMine Team',
      category: matterResult.data.category || 'Thông Tin Server',
      tags: matterResult.data.tags || [],
      excerpt: matterResult.data.excerpt || '',
      coverImage:
        matterResult.data.coverImage ||
        'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
      featured: Boolean(matterResult.data.featured),
      contentHtml,
      readTime,
    };
  } catch (error) {
    console.error(`Lỗi đọc bài viết [${slug}]:`, error);
    return null;
  }
});

/**
 * Lấy tất cả các danh mục độc nhất
 */
export function getBlogCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return ['Tất cả', ...Array.from(categories)];
}

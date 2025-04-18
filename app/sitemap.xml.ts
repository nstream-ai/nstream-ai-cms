import { getAllPostSlugs } from '@/lib/markdown';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const posts = getAllPostSlugs();
  const blogPosts = posts.map((post) => ({
    url: `https://blog.nstream.ai/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Add static pages
  const staticPages = [
    {
      url: 'https://blog.nstream.ai',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://blog.nstream.ai/blog',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  return [...staticPages, ...blogPosts];
}

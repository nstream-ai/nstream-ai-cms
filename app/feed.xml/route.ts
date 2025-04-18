import { getAllPosts } from '@/lib/markdown';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nstream-ai-cms.vercel.app';
  const posts = await getAllPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Nstream AI Blog</title>
        <link>${baseUrl}</link>
        <description>Insights and updates from Nstream AI</description>
        <language>en-US</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${posts
          .map(
            (post) => `
          <item>
            <title>${post.frontMatter.title}</title>
            <link>${baseUrl}/blog/${post.slug}</link>
            <description>${post.frontMatter.summary}</description>
            <pubDate>${new Date(post.frontMatter.date).toUTCString()}</pubDate>
            <guid>${baseUrl}/blog/${post.slug}</guid>
          </item>
        `
          )
          .join('')}
      </channel>
    </rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 
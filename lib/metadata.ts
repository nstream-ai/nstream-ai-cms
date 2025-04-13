import { Metadata } from 'next';
import { PostFrontMatter } from '@/types/blog';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "book" | "profile"; // Use valid OpenGraph types
  date?: string;
  tags?: string[];
};

// Default site metadata
const siteConfig = {
  name: 'Nstream AI Blog',
  description: 'Insights and updates from Nstream AI',
  url: 'https://yourdomain.com', // Replace with your actual domain
  ogImage: '/og-image.jpg', // Create a default OG image and place in public folder
};

// Helper function to generate metadata for pages
export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  date,
  tags,
}: SEOProps): Metadata {
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const ogImage = image || `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: `${siteConfig.name}`,
    description: description || siteConfig.description,
    authors: [{ name: 'Nstream AI' }],
    keywords: tags || [],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: 'en_US',
      type: type as "website" | "article" | "book" | "profile",
      ...(date && type === 'article' ? { publishedTime: date } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [ogImage],
    },
  };
}

// Generate blog post metadata from frontmatter
export function generatePostMetadata(post: { slug: string; frontMatter: PostFrontMatter }) {
  return generateMetadata({
    title: post.frontMatter.title,
    description: post.frontMatter.summary || `${post.frontMatter.title} - Read the latest from Nstream AI`,
    image: post.frontMatter.heroImage,
    url: `/blog/${post.slug}`,
    type: 'article',
    date: post.frontMatter.date,
    tags: post.frontMatter.tags,
  });
}
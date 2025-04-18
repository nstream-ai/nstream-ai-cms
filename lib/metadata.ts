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
  description: 'Explore the latest insights on AI, machine learning, and technology from Nstream AI. Stay updated with our expert analysis and industry trends.',
  url: 'https://nstream.ai', // Update this with your actual domain
  ogImage: '/images/nstream-og-image.jpg', // Default OG image
  twitterHandle: '@NstreamAI', // Add your Twitter handle
  locale: 'en_US',
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
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title: pageTitle,
    description: description || siteConfig.description,
    authors: [{ name: 'Nstream AI' }],
    keywords: tags || [],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: pageTitle,
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
      locale: siteConfig.locale,
      type: type as "website" | "article" | "book" | "profile",
      ...(date && type === 'article' ? { 
        publishedTime: date,
        authors: ['Nstream AI'],
      } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description || siteConfig.description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
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
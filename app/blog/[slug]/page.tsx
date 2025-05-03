import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';
import { generatePostMetadata } from '@/lib/metadata';
import PostContent from './PostContent'; // We'll extract the Post component to a separate file
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import Script from 'next/script';

interface PageParams {
  params: Promise<{slug: string}>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  return generatePostMetadata(post);
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: PageParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  // Compute safe image URL if heroImage exists
  const imageUrl = post.frontMatter.heroImage
    ? (post.frontMatter.heroImage.startsWith('http')
        ? post.frontMatter.heroImage
        : `${baseUrl}${post.frontMatter.heroImage}`)
    : undefined;

  // Google Analytics gtag snippet
  const gaScripts = GA_ID ? (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
gtag('js', new Date());
gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
      </Script>
    </>
  ) : null;

  // Generate JSON-LD structured data for the blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontMatter.title,
    datePublished: post.frontMatter.date,
    dateModified: post.frontMatter.date,
    author: {
      '@type': 'Person',
      name: post.frontMatter.author,
    },
    image: imageUrl,
    description: post.frontMatter.summary || '',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${siteConfig.ogImage}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${slug}`,
    },
    keywords: post.frontMatter.tags?.join(', ') || '',
  };

  return (
    <>
      {gaScripts}
      {/* Add JSON-LD script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Render the post content */}
      <PostContent post={post} />
    </>
  );
}
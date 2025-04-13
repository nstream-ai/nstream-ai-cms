import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';
import { generatePostMetadata } from '@/lib/metadata';
import PostContent from './PostContent'; // We'll extract the Post component to a separate file
import { Metadata } from 'next';

interface PageParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return generatePostMetadata(post);
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: PageParams) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  
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
    image: post.frontMatter.heroImage,
    description: post.frontMatter.summary || '',
    publisher: {
      '@type': 'Organization',
      name: 'Nstream AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/logo.png', // Replace with your actual logo URL
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourdomain.com/blog/${slug}`, // Replace with your domain
    },
    keywords: post.frontMatter.tags?.join(', ') || '',
  };

  return (
    <>
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
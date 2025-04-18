import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';
import { generatePostMetadata } from '@/lib/metadata';
import { ContentBlockRenderer } from '@/app/ContentBlockRenderer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Using any to bypass type checking temporarily
type Props = any;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = typeof params.slug === 'string' ? params.slug : params.slug[0];
  const post = await getPostBySlug(slug);
  return generatePostMetadata(post);
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const slug = typeof params.slug === 'string' ? params.slug : params.slug[0];
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontMatter.title,
    datePublished: post.frontMatter.date,
    dateModified: post.frontMatter.date,
    author: {
      '@type': 'Person',
      name: post.frontMatter.author
    },
    description: post.frontMatter.summary,
    image: post.frontMatter.heroImage,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`
  };

  return (
    <article className="prose prose-lg mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {post.content.map((block, index) => (
        <ContentBlockRenderer key={index} block={block} />
      ))}
    </article>
  );
}
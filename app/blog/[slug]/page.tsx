import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';
import { generatePostMetadata } from '@/lib/metadata';
import PostContent from './PostContent'; // We'll extract the Post component to a separate file
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentBlockRenderer from '@/app/ContentBlockRenderer';

interface PageParams {
  params: Promise<{slug: string}>;
}

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

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
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
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.slug}`
  };

  return (
    <article className="prose prose-lg mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContentBlockRenderer content={post.content} />
    </article>
  );
}
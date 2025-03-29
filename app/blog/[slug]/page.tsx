import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Add the async keyword here
export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { frontMatter, content } = await getPostBySlug(slug);
  
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">{frontMatter.title}</h1>
      <p className="text-gray-500 mb-8">By {frontMatter.author} on {frontMatter.date}</p>
      <article className="prose lg:prose-xl">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
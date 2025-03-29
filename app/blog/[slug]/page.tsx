import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';

// Define interfaces for our data structures
interface PostFrontMatter {
  title: string;
  date: string;
  author: string;
}

interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
}

interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post(props: PageParams) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(slug) as Post;
  const { frontMatter, content } = post;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">{frontMatter.title}</h1>
      <p className="text-gray-500 mb-8">By {frontMatter.author} on {frontMatter.date}</p>
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
}
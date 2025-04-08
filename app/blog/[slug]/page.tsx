import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';

// Define interfaces for our data structures
interface PostFrontMatter {
  title: string;
  date: string;
  author: string;
  image: string;
  youtube: string;
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
    <div className=" mx-auto py-8 px-4 bg-white text-black flex flex-col justify-center align-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-2">{frontMatter.title}</h1>
      <p className="text-gray-500 mb-8">By {frontMatter.author} on {frontMatter.date}</p>
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      {frontMatter.image && (
        <div className="my-6">
          <img 
            src={frontMatter.image} 
            alt={frontMatter.title} 
            className="rounded-lg w-[600px]"
          />
        </div>
      )}
      {frontMatter.youtube && (
        <div className="mb-6 aspect-w-16 aspect-h-9">
          <iframe width="560" height="315" 
          src={frontMatter.youtube} 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          ></iframe>
        </div>
      )}
    </div>
  );
}
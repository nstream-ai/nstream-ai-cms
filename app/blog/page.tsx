import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

export default function BlogPage() {
  const posts = getAllPosts();
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border p-4 rounded-md">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold hover:text-blue-600">
              {post.frontMatter.title}
            </Link>
            <p className="text-gray-500 text-sm mt-1">
              By {post.frontMatter.author} on {post.frontMatter.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
// ✅ app/blog/page.tsx — Server Component
import { getAllPosts } from '@/lib/markdown';
import BlogPage from './BlogPage';

export default function BlogWrapperPage() {
  const posts = getAllPosts();
  return <BlogPage posts={posts} />;
}

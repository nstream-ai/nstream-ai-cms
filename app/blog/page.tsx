// app/blog/page.tsx
import { getAllPosts } from '../../lib/markdown';
import BlogPage from './BlogPage';

export default async function Page() {
  // Await the posts to resolve the Promise before passing to BlogPage
  const posts = await getAllPosts();
  
  return <BlogPage posts={posts} />;
}
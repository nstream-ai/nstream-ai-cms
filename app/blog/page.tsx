import { getAllPosts } from '../../lib/markdown';
import BlogPage from './BlogPage';
import { generateMetadata as genMetadata } from '@/lib/metadata';

export const metadata = genMetadata({
  title: 'Blog',
  description: 'Explore the latest articles, insights and updates from Nstream AI',
  url: '/blog',
});

export default async function Page() {
  const posts = await getAllPosts();
  return <BlogPage posts={posts} />;
}
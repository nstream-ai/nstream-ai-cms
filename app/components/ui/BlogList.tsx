import React from 'react';
import Card from './Card';
import { formatDate } from '@/lib/utils';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card
          key={post.slug}
          href={`/blog/${post.slug}`}
          title={post.title}
          description={post.description}
          imageSrc={post.coverImage}
          imageAlt={`Cover image for ${post.title}`}
          footer={
            <div className="flex justify-between items-center">
              <time
                dateTime={post.date}
                className="text-sm text-gray-500"
              >
                {formatDate(post.date)}
              </time>
              <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Read more →
              </span>
            </div>
          }
        />
      ))}
    </div>
  );
};

export default BlogList;
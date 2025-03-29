import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map(fileName => {
    return {
      slug: fileName.replace(/\.md$/, '')
    };
  });
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const { data: frontMatter, content } = matter(fileContents);
  
  return {
    slug,
    frontMatter,
    content
  };
}

export function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(({ slug }) => getPostBySlug(slug))
    .sort((post1, post2) => {
      return new Date(post1.frontMatter.date) > new Date(post2.frontMatter.date) ? -1 : 1;
    });
  
  return posts;
}
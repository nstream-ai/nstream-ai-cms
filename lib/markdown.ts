import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Import your Post type and content block interfaces
import { Post, PostFrontMatter, ContentBlock, TextBlock, ImageBlock, VideoBlock, QuoteBlock, HeadingBlock, ListBlock } from '../types/blog'; // Adjust the import path as needed

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

// Helper function to convert markdown content to content blocks
function markdownToContentBlocks(markdown: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  
  // Split the content by double newlines (paragraph breaks)
  const sections = markdown.split(/\n\n+/);
  
  sections.forEach(section => {
    section = section.trim();
    
    // Skip empty sections
    if (!section) return;
    
    // Check if it's a heading
    const headingMatch = section.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length as 1 | 2 | 3;
      blocks.push({
        type: 'heading',
        text: headingMatch[2].trim(),
        level
      });
      return;
    }
    
    // Check if it's an image
    const imageMatch = section.match(/!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/);
    if (imageMatch) {
      blocks.push({
        type: 'image',
        src: imageMatch[2],
        alt: imageMatch[1] || '',
        caption: imageMatch[3] || undefined
      });
      return;
    }
    
    // Check if it's a video embed
    const videoMatch = section.match(/\[video:\s*(.*?)(?:\s+"(.*?)")?]/i);
    if (videoMatch) {
      blocks.push({
        type: 'video',
        url: videoMatch[1],
        caption: videoMatch[2] || undefined
      });
      return;
    }
    
    // Check if it's a quote
    const quoteMatch = section.match(/^>\s+(.+?)(?:\n>\s+--\s+(.*?))?$/s);
    if (quoteMatch) {
      blocks.push({
        type: 'quote',
        text: quoteMatch[1].trim(),
        author: quoteMatch[2] ? quoteMatch[2].trim() : undefined
      });
      return;
    }
    
    // Check if it's a bullet list
    if (section.match(/^[*-]\s+.+?(?:\n[*-]\s+.+?)*$/)) {
      const items = section
        .split(/\n/)
        .filter(line => line.trim().startsWith('* ') || line.trim().startsWith('- '))
        .map(line => line.replace(/^[*-]\s+/, '').trim());
      
      blocks.push({
        type: 'list',
        items,
        style: 'bullet'
      });
      return;
    }
    
    // Check if it's a numbered list
    if (section.match(/^\d+\.\s+.+?(?:\n\d+\.\s+.+?)*$/)) {
      const items = section
        .split(/\n/)
        .filter(line => /^\d+\.\s/.test(line.trim()))
        .map(line => line.replace(/^\d+\.\s+/, '').trim());
      
      blocks.push({
        type: 'list',
        items,
        style: 'number'
      });
      return;
    }
    
    // Otherwise, it's a paragraph
    blocks.push({
      type: 'text',
      text: section
    });
  });
  
  return blocks;
}

// Get all post slugs for static paths
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      slug: fileName.replace(/\.md$/, '')
    };
  });
}

// Get post data for a single post based on slug
export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);
  
  // Convert the markdown content to content blocks
  const contentBlocks = markdownToContentBlocks(content);

  // Return the post object with the new schema
  return {
    slug,
    frontMatter: data as PostFrontMatter,
    content: contentBlocks
  };
}

// Get all posts for the blog index page
export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug,
      frontMatter: data as PostFrontMatter
    };
  });
  
  // Sort posts by date in descending order (newest first)
  return allPostsData.sort((a, b) => {
    if (a.frontMatter.date < b.frontMatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
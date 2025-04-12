// types/blog.ts

export interface PostFrontMatter {
    title: string;
    date: string;
    author: string;
    heroImage?: string; 
    summary?: string;
    tags?: string[];
    featuredVideo?: string;
    category?: string;
  }
  
  export type ContentBlock =
    | TextBlock
    | ImageBlock
    | VideoBlock
    | QuoteBlock
    | HeadingBlock
    | ListBlock;
  
  export interface TextBlock {
    type: 'text';
    text: string;
  }
  
  export interface ImageBlock {
    type: 'image';
    src: string;
    alt?: string;
    caption?: string;
  }
  
  export interface VideoBlock {
    type: 'video';
    url: string;
    thumbnail?: string;
    caption?: string;
  }
  
  export interface QuoteBlock {
    type: 'quote';
    text: string;
    author?: string;
  }
  
  export interface HeadingBlock {
    type: 'heading';
    text: string;
    level: 1 | 2 | 3; // h1, h2, or h3
  }
  
  export interface ListBlock {
    type: 'list';
    items: string[];
    style: 'bullet' | 'number';
  }
  
  export interface Post {
    slug: string;
    frontMatter: PostFrontMatter;
    content: ContentBlock[];
  }
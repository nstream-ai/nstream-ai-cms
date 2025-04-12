import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';
import Image from 'next/image';
import searchIcon from '../../../assets/searchIcon.png';
import SocialIcons from '@/app/SocialIcons';
import nstreamLogo from '../../../assets/nstreamLogo.png'
import Footer from '@/app/Footer';
import ShareButton from '@/app/Share';

// New schema interfaces
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

// Component to render different content blocks
const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'text':
      return <p className="text-[20px] font-normal mb-6 text-[#474747]">{block.text}</p>;
    
    case 'image':
      return (
        <div className="my-6 flex flex-col items-center">
          <img
            src={block.src}
            alt={block.alt || ''}
            className="rounded-lg w-full max-w-[936px]"
          />
          {block.caption && (
            <p className="text-[16px] text-[#777777] mt-2">{block.caption}</p>
          )}
        </div>
      );
    
    case 'video':
      return (
        <div className="my-6 aspect-w-16 aspect-h-9">
          <iframe 
            width="100%" 
            height="400"
            src={block.url}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="rounded-lg"
          ></iframe>
          {block.caption && (
            <p className="text-[16px] text-[#777777] mt-2">{block.caption}</p>
          )}
        </div>
      );
    
    case 'quote':
      return (
        <div className="my-6 pl-6 border-l-4 border-[#DFDFDF]">
          <p className="text-[20px] italic font-normal text-[#474747] mb-2">{block.text}</p>
          {block.author && (
            <p className="text-[16px] text-[#777777]">— {block.author}</p>
          )}
        </div>
      );
    
    case 'heading':
      switch (block.level) {
        case 1:
          return <h1 className="text-[28px] font-normal mb-4 mt-8 text-[#474747]">{block.text}</h1>;
        case 2:
          return <h2 className="text-[23px] font-normal mb-4 mt-6 text-[#474747]">{block.text}</h2>;
        case 3:
          return <h3 className="text-[20px] font-medium mb-3 mt-4 text-[#474747]">{block.text}</h3>;
      }
    
    case 'list':
      if (block.style === 'bullet') {
        return (
          <ul className="list-disc pl-8 mb-6">
            {block.items.map((item, index) => (
              <li key={index} className="mb-2">
                <p className="text-[20px] font-normal text-[#474747]">{item}</p>
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <ol className="list-decimal pl-8 mb-6">
            {block.items.map((item, index) => (
              <li key={index} className="mb-2">
                <p className="text-[20px] font-normal text-[#474747]">{item}</p>
              </li>
            ))}
          </ol>
        );
      }
  }
};

export default async function Post(props: PageParams) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(slug) as Post;
  const { frontMatter, content } = post;

  return (
    <div className="mx-auto pt-8 px-4 bg-white text-black flex flex-col justify-between align-center items-center min-h-screen">
      {/* Header */}
      <div className="flex justify-around flex-col sm:flex-row gap-[20px] sm:gap-[0px] items-center w-full">
        <div className='w-full sm:w-[29%] h-[40px] items-center gap-[10px] flex justify-center'>
          <Image src={nstreamLogo} alt='nstreamLogo' />
          <p className='text-[16px] sm:text-[24px] sm:text-[44px] text-[#474747]'>Nstream AI</p>
        </div>
        <div className="flex justify-around w-full sm:w-[50%] items-center gap-[80px]">
          <div className='relative sm:mt-0 mt-[10px] w-full sm:w-[400px]'>
            <input
              className='h-[40px] bg-[#F4F4F4] w-full sm:w-[400px] rounded-sm placeholder-[#474747] pl-4'
              placeholder='Search'
            />
            <button className='absolute top-0 right-0 bg-[#FFBA9D] w-[40px] h-[40px] rounded-sm flex justify-center items-center'>
              <Image src={searchIcon} alt='searchIcon' className='h-[16px] w-[16px]' />
            </button>
          </div>
        </div>
      </div>

      {/* BLOG CONTENT */}
      <div className='flex flex-col justify-center items-center w-full sm:w-[70%] lg:w-[50%] mt-[10%] sm:mt-[4%] text-[#474747]'>
        <div className='text-left w-full'>
          {frontMatter.category && (
            <div><h1 className="text-[#777777] text-[16px] mb-2">{frontMatter.category}</h1></div>
          )}
          <div><h1 className="text-[28px] font-normal mb-2">{frontMatter.title}</h1></div>
          <div><p className="text-[#777777] text-[16px] mb-8">{frontMatter.date} | {frontMatter.author}</p></div>
        </div>
        
        {/* Hero Image */}
        {frontMatter.heroImage && (
          <div className="my-2 flex justify-center w-full">
            <img
              src={frontMatter.heroImage}
              alt={frontMatter.title}
              className="rounded-lg w-full h-auto max-h-[400px] object-cover"
            />
          </div>
        )}
        
        {/* Content Blocks */}
        <div className="w-full mt-6">
          {content.map((block, index) => (
            <ContentBlockRenderer key={index} block={block} />
          ))}
        </div>
        
        {/* Tags */}
        {frontMatter.tags && frontMatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 mb-4 w-full">
            {frontMatter.tags.map(tag => (
              <span key={tag} className="bg-[#F4F4F4] text-[#474747] px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Share */}
        <div className='flex justify-start items-center gap-[6%] w-full mt-[4%]'>
          <ShareButton />
          <SocialIcons />
        </div>
      </div>
      
      <div className='w-full mt-12'>
        <Footer />
      </div>
    </div>
  );
}
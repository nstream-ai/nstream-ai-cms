import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/blog';
import { ContentBlockRenderer } from '@/app/ContentBlockRenderer';
import ShareButton from '@/app/components/Share';
import Footer from '@/app/components/Footer';

export default function PostContent({ post }: { post: Post }) {
  const { frontMatter, content } = post;

  return (
    <div className="mx-auto pt-4 px-4 bg-[#FCFCF8] text-black flex flex-col justify-between align-center items-center min-h-screen">
      {/* Header */}
      <div className="flex flex-row items-center justify-between w-full px-2 sm:px-4 py-2">
        <Link href="https://nstream.ai" className="cta-button min-w-[100px] w-[120px] sm:w-[158px] h-[36px] sm:h-[43px] rounded-md bg-[#f8f6f4] flex justify-end items-center" data-cta-type="cross-domain">
          <Image src="/nstream-logo-with-text.svg" alt="Nstream AI Logo" width={100} height={36} className="sm:w-[144px] sm:h-[72px] w-[100px] h-[36px] object-contain" />
        </Link>
        <Link href="https://docs.nstream.ai" target="_blank" rel="noopener noreferrer" title="Open Nstream Docs in a new tab" className="cta-button px-2 sm:px-6 py-2 rounded-md bg-[#f8f6f4] flex justify-center items-center transition hover:bg-[#f0eaea] min-w-[60px] min-h-[36px] text-sm sm:text-lg" data-cta-type="cross-domain">
          <span className="text-[#474747] font-medium flex items-center gap-[2px]">Docs
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline align-middle relative top-[1px] ml-[2px]" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L19 5M19 5H9m10 0v10" /></svg>
          </span>
        </Link>
      </div>
      <div className="w-full border-b border-[#ececec] my-2 sm:my-4 mx-2 sm:mx-0"></div>

      {/* BLOG CONTENT */}
      <article className='article-content flex flex-col justify-center items-center w-full sm:w-[70%] lg:w-[50%] mt-[10%] sm:mt-[4%] text-[#474747]'>
        <div className='text-left w-full'>
          {frontMatter.category && (
            <div><h1 className="category text-[#777777] text-[16px] mb-2">{frontMatter.category}</h1></div>
          )}
          <div><h1 className="text-[28px] font-normal mb-2">{frontMatter.title}</h1></div>
          <div><p className="author text-[#777777] text-[16px] mb-8">{frontMatter.date} | {frontMatter.author}</p></div>
        </div>
        
        {/* Hero Image */}
        {frontMatter.heroImage && (
          <div className="my-2 flex justify-center w-full">
            <div className="relative w-full h-[400px]">
              <Image
                src={frontMatter.heroImage}
                alt={frontMatter.title}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                priority
              />
            </div>
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
        <div className='social-share flex justify-start items-center gap-[6%] w-full mt-[4%]'>
          <ShareButton />
        </div>
      </article>
      
      <div className='w-full mt-12'>
        <Footer />
      </div>
    </div>
  );
}
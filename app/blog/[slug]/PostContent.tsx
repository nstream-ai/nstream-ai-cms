import Image from 'next/image';
import nstreamLogo from '../../../assets/nstreamLogo.png';
import SocialIcons from '@/app/SocialIcons';
import Footer from '@/app/Footer';
import ShareButton from '@/app/Share';
import { Post } from '@/types/blog';
import { ContentBlockRenderer } from '../../ContentBlockRenderer';

export default function PostContent({ post }: { post: Post }) {
  const { frontMatter, content } = post;

  return (
    <div className="mx-auto pt-8 px-4 bg-[#FCFCF8] text-black flex flex-col justify-between align-center items-center min-h-screen">
      {/* Header */}
      <div className="flex justify-around flex-col sm:flex-row gap-[20px] sm:gap-[0px] items-center w-full">
        <div className='w-full sm:w-fit px-3 py-6 rounded-md h-[40px] bg-[#f8f6f4] items-center gap-[10px] flex justify-center'>
          <Image src={nstreamLogo} alt='nstreamLogo' />
          <p className='text-[16px] sm:text-[20px] font-medium text-[#474747]'>Nstream AI</p>
        </div>
        <div className="flex justify-around w-full sm:w-[50%] items-center gap-[80px]">
          {/* Header content */}
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
import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';
import Image from 'next/image';
import searchIcon from '../../../assets/searchIcon.png';
import SocialIcons from '@/app/SocialIcons';
import nstreamLogo from '../../../assets/nstreamLogo.png'
import Footer from '@/app/Footer';

// Define interfaces for our data structures
interface PostFrontMatter {
  title: string;
  date: string;
  author: string;
  image: string;
  youtube: string;
  category: string;
  para1: string;
  subheading1: string;
  para2: string;
  subsubheadingpara1: string;
  subsubheadingpara2: string;
  subheading2: string;
  point1: string;
  point2: string;
}

interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
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

export default async function Post(props: PageParams) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(slug) as Post;
  const { frontMatter, content } = post;

  return (
    <div className=" mx-auto pt-8 px-4 bg-white text-black flex flex-col justify-between align-center items-center min-h-screen">
      {/* Header */}
      <div className="flex justify-around flex-col sm:flex-row items-center w-full">
        <div className='w-full sm:w-[29%] h-[40px] items-center sm:gap-[10px] flex justify-center'>
          <Image src={nstreamLogo} alt='nstreamLogo' />
          <p className='text-[24px] sm:text-[44px] text-[#474747]'>Nstream AI</p></div>
        <div className="flex justify-around w-[50%] items-center gap-[80px]">

          <div className='relative sm:mt-0 mt-[10px]'>
            <input
              className='border border-1 h-[40px] bg-[#F4F4F4] w-full sm:w-[400px] rounded-sm placeholder-[#474747] pl-4'
              placeholder='Search'
            // value={query}
            // onChange={(e) => {
            // setQuery(e.target.value);
            // setPage(1);
            // }}
            />
            <button className='absolute top-0 right-0 bg-[#FFBA9D] w-[40px] h-[40px] rounded-sm flex justify-center items-center'>
              <Image src={searchIcon} alt='searchIcon' className='h-[16px] w-[16px]' />
            </button>
          </div>
        </div>
      </div>

      {/* BLOGS CONTENT*/}
      <div className='flex flex-col justify-center items-center w-[50%] mt-[4%] text-[#474747]'>
        <div className='text-left w-full'>
          <div><h1 className="text-[#777777] text-[16px] mb-2">{frontMatter.category}</h1></div>
          <div><h1 className="text-[28px] font-normal mb-2">{frontMatter.title}</h1></div>
          <div><p className="text-[#777777] text-[16px] mb-8">{frontMatter.date} | {frontMatter.author}</p></div>
        </div>
        <div className='flex justify-center items-center w-full'>
          {frontMatter.image && (
            <div className="my-2 flex justify-center">
              <img
                src={frontMatter.image}
                alt={frontMatter.title}
                className="rounded-lg w-[936px] h-[400px]"
              />
            </div>
          )}
        </div>
        <div className='mt-6'><p className="text-[20px] font-normal mb-2">{frontMatter.para1}</p></div>
        <div className='flex flex-col gap-[20px] mt-[20px]'>
          <p className="text-[23px] font-normal mb-2">{frontMatter.subheading1}</p>
          <p className="text-[20px] font-normal mb-2">{frontMatter.para2}</p>
          <div className='pl-[4%] border-l-1 border-l-[#DFDFDF] flex flex-col gap-[10px]'>
            <p className="text-[20px] font-normal mb-2">{frontMatter.subsubheadingpara1}</p>
            <p className="text-[20px] font-normal mb-2">{frontMatter.subsubheadingpara2}</p>
          </div>
        </div>
        <div className='flex flex-col gap-[20px] mr-20 mt-[20px]'>
          <p className="text-[23px] font-normal mb-2">{frontMatter.subheading2}</p>
          <ul className="list-disc pl-5">
            <li><p className="text-[20px] font-normal mb-2">{frontMatter.point1}</p></li>
            <li><p className="text-[20px] font-normal mb-2">{frontMatter.point2}</p></li>
          </ul>
        </div>
        <div className='flex justify-start items-center gap-[6%] w-full mt-[4%]'>
          <p className='text-[20px] font-normal text-[#474747]'>Share</p> 
          <SocialIcons />
        </div>
      </div>
      {/* {frontMatter.youtube && (
        <div className="mb-6 aspect-w-16 aspect-h-9">
          <iframe width="560" height="315"
            src={frontMatter.youtube}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      )} */}
      <div className='w-full'>
        <Footer />
      </div>
    </div>
  );
}
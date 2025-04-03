import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';
import Image from 'next/image';
import searchIcon from '../../assets/searchIcon.png'

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto py-8 px-4 bg-white">
      {/* header */}
      <div className="flex justify-around items-center">
        <div><p className='text-[48px] text-[#474747]'>Meliora</p></div>
        <div className="flex justify-around items-center gap-[20px]">
          <div className='flex gap-[40px] text-[16px] text-[#474747]'>
            <button>Home</button>
            <button>Blog</button>
            <button>Contact us</button>
            <button>More</button>
          </div>
          <div className='relative'>
            <input className='border border-1 h-[40px] bg-[#F4F4F4] placeholder-[#474747] pl-4' placeholder='Search' />
            <button><Image src={searchIcon} alt='searchIcon' className='absolute top-0 right-0 h-[16px] w-[16px]' /></button>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col items-center mt-[80px]'>
        <div className='px-[20%] w-full'>
          <div><p className='text-black font-normal text-2xl'>Recent Posts</p></div>
          <div className='mt-[20px]'>
            <ul className="space-y-0">
              {posts.map((post) => (
                <li key={post.slug} className="border-b-2 p-4 py-8 flex flex-col rounded-md ">
                  <p className='my-4 text-[#777777] text-xs'>{post.frontMatter.date}</p>
                  <Link href={`/blog/${post.slug}`} className="text-xl font-normal text-[#474747] hover:text-grey-600">
                    {post.frontMatter.title}
                  </Link>
                  {/* <p className="text-gray-500 text-sm mt-1">
                    By {post.frontMatter.author} on {post.frontMatter.date}
                  </p> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
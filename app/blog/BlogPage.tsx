'use client';

import Link from 'next/link';
import { useState, useEffect, Key } from 'react';
import nstreamLogo from '../../assets/nstreamLogo.png'
import Image from "next/image";
import Footer from '../Footer';
import { Post, PostFrontMatter } from '@/types/blog';

// Create a type for blog listing that doesn't require content
type BlogPost = {
    slug: string;
    frontMatter: PostFrontMatter;
    content?: Post['content'];
};

interface BlogPageProps {
    posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState('All');
    const [categories, setCategories] = useState<string[]>(['All']);

    const postsPerPage = 4;

    // Extract unique categories from posts on component mount
    useEffect(() => {
        if (posts && posts.length > 0) {
            const uniqueCategories = ['All'];
            posts.forEach(post => {
                if (post.frontMatter.category && !uniqueCategories.includes(post.frontMatter.category)) {
                    uniqueCategories.push(post.frontMatter.category);
                }
            });
            setCategories(uniqueCategories);
        }
    }, [posts]);

    // Filter posts based on query and selected tab
    const filteredPosts = posts?.filter((post) => {
        const matchesTab = activeTab === 'All' || post.frontMatter.category === activeTab;
        return matchesTab;
    }) || [];

    const maxPage = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPagePosts = filteredPosts.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (page < maxPage) setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <div className="mx-auto pt-8 px-4 min-h-screen flex flex-col justify-between bg-[#FCFCF8]">
            {/* Header */}
            <div className="flex justify-around flex-col sm:flex-row gap-[20px] sm:gap-[0px] items-center w-full">
                <div className='w-full sm:w-fit px-3 py-6 rounded-md h-[40px] bg-[#f8f6f4] items-center gap-[10px] flex justify-center'>
                    <Image src={nstreamLogo} alt='nstreamLogo' />
                    <p className='text-[16px] sm:text-[20px] font-medium text-[#474747]'>Nstream AI</p>
                </div>
                <div className="flex justify-around w-full sm:w-[50%] items-center gap-[80px]">
                    {/* <div className='relative sm:mt-0 mt-[10px] w-full sm:w-[400px]'>
                        <input
                            className='h-[40px] bg-[#F4F4F4] w-full sm:w-[400px] rounded-sm placeholder-[#474747] pl-4'
                            placeholder='Search'
                            value={query}
                            onChange={handleSearch}
                        />
                        <button className='absolute top-0 right-0 bg-[#FFBA9D] w-[40px] h-[40px] rounded-sm flex justify-center items-center'>
                            <Image src={searchIcon} alt='searchIcon' className='h-[16px] w-[16px]' />
                        </button>
                    </div> */}
                </div>
            </div>

            <div className='flex flex-col sm:flex-row justify-center min-h-[800px]'>
                <div className=' w-[40%] flex flex-col items-center'>
                    {/* Left column content */}
                </div>
                {/* Posts */}
                <div className='w-full flex flex-col items-start mt-[60px]'>
                    <div className='pr-[10%] w-full'>
                        <div><p className='text-black font-normal text-2xl'>Recent Posts</p></div>

                        {/* Tabs */}
                        <div className="mt-4 relative">
                            {/* Horizontal line below tabs */}
                            <div className="absolute left-0 right-0 top-full h-[1px] bg-gray-300 z-0" />

                            <div className="flex gap-6 relative z-10 pb-1 whitespace-nowrap">
                                {categories.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            setActiveTab(tab);
                                            setPage(1);
                                        }}
                                        className={`relative px-1 pb-2 text-sm font-medium ${activeTab === tab ? 'text-[#474747]' : 'text-gray-500 hover:text-[#474747]'}`}
                                    >
                                        {tab}

                                        {/* Underline only on active tab */}
                                        {activeTab === tab && (
                                            <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-[#474747] rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Post List */}
                        <div className='mt-[20px]'>
                            <ul className="space-y-0">
                                {currentPagePosts.map((post) => (
                                    <li key={post.slug} className="border-b-2 p-4 py-8 flex flex-col rounded-md ">
                                        <p className='my-4 text-[#777777] text-xs'>{post.frontMatter.date}</p>
                                        <div className='flex flex-col sm:flex-row justify-between w-full gap-4'>
                                            <Link 
                                                href={`/blog/${post.slug}`}
                                                className="text-xl font-normal text-[#474747] hover:text-red-600 transition duration-300 ease-in-out"
                                                data-blog-title={post.frontMatter.title}
                                                onClick={() => {
                                                    if (typeof window !== 'undefined') {
                                                        window.dataLayer = window.dataLayer || [];
                                                        window.dataLayer.push({
                                                            event: 'blog_list_click',
                                                            blog_title: post.frontMatter.title,
                                                            blog_url: `/blog/${post.slug}`,
                                                        });
                                                    }
                                                }}
                                            >
                                                {post.frontMatter.title}
                                            </Link>
                                            {/* Tags */}
                                            {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                                                <div className="flex flex-wrap justify-start sm:justify-end gap-2">
                                                    {post.frontMatter.tags.map((tag: Key | null | undefined) => (
                                                        <span key={tag} className="bg-[#F4F4F4] text-[#474747] px-3 py-1 rounded-md text-sm">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                                {currentPagePosts.length === 0 && (
                                    <p className="text-center text-[#777777] mt-10">No posts found.</p>
                                )}
                            </ul>
                        </div>

                        {/* Pagination */}
                        {maxPage > 1 && (
                            <div className="flex justify-start items-center gap-2 mt-8">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={page === 1}
                                    className="px-3 py-2 border rounded-sm text-[#474747] hover:bg-gray-100 disabled:opacity-30"
                                >
                                    {'<'}
                                </button>
                                {[...Array(maxPage)].map((_, index) => {
                                    const pageNum = index + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`px-4 py-2 ${page === pageNum
                                                ? 'text-[#FFBA9D]'
                                                : 'bg-white text-[#474747] border-[#474747] hover:bg-[#f0f0f0]'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={handleNextPage}
                                    disabled={page === maxPage}
                                    className="px-3 py-2 border rounded-sm text-[#474747] hover:bg-gray-100 disabled:opacity-30"
                                >
                                    {'>'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='sm:hidden -[60%] justify-start sm:ml-[16%] sm:flex sm:flex-col gap-[10px] items-start mt-[8%]'>
                    {/* Mobile content */}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
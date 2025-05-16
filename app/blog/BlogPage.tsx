'use client';

import Link from 'next/link';
import { useState, useEffect, Key } from 'react';
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
        <div className="mx-auto pt-4 px-4 min-h-screen flex flex-col justify-between bg-[#FCFCF8]">
            {/* Header */}
            <div className="flex flex-row items-center justify-between w-full px-2 sm:px-4 py-2">
                <Link href="https://nstream.ai" className="min-w-[100px] w-[120px] sm:w-[158px] h-[36px] sm:h-[43px] rounded-md bg-[#f8f6f4] flex justify-end items-center">
                    <Image src="/nstream-logo-with-text.svg" alt="Nstream AI Logo" width={100} height={36} className="sm:w-[144px] sm:h-[72px] w-[100px] h-[36px] object-contain" />
                </Link>
                <Link href="https://docs.nstream.ai" target="_blank" rel="noopener noreferrer" title="Open Nstream Docs in a new tab" className="px-2 sm:px-6 py-2 rounded-md bg-[#f8f6f4] flex justify-center items-center transition hover:bg-[#f0eaea] min-w-[60px] min-h-[36px] text-sm sm:text-lg">
                    <span className="text-[#474747] font-medium flex items-center gap-[2px]">Docs
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline align-middle relative top-[1px] ml-[2px]" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L19 5M19 5H9m10 0v10" /></svg>
                    </span>
                </Link>
            </div>
            <div className="w-full border-b border-[#ececec] my-2 sm:my-4 mx-2 sm:mx-0"></div>
            <div className='flex flex-col sm:flex-row justify-center flex-1'>
                <div className='w-full max-w-3xl flex flex-col items-start mt-4 sm:mt-8 mx-auto px-2 sm:px-8 lg:px-12'>
                    <div className='w-full'>
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
                                            <span className="absolute left-0 bottom-[-4px] w-full h-[4px] bg-[#9B2020] rounded-full shadow-sm" />
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
                                                className="text-xl font-normal text-[#474747] hover:text-[#9B2020] transition duration-300 ease-in-out"
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
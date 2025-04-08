'use client';

import Link from 'next/link';
import searchIcon from '../../assets/searchIcon.png';
import { useState } from 'react';
import fbIcon from '../../assets/fbIcon.png'
import githubIcon from '../../assets/githubIcon.png'
import linkedinIcon from '../../assets/linkedinIcon.png'
import xIcon from '../../assets/xIcon.png'
import copyright from '../../assets/copyright.png'
import Image from "next/image";

export default function BlogPage({ posts }) {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState('All');
    const [mainTab, setMainTab] = useState('Home');

    const postsPerPage = 4;

    // Filter posts based on query and selected tab
    const filteredPosts = posts.filter((post) => {
        const matchesQuery = post.frontMatter.title.toLowerCase().includes(query.toLowerCase());
        const matchesTab = activeTab === 'All' || post.frontMatter.category === activeTab;
        return matchesQuery && matchesTab;
    });

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
        <div className="mx-auto pt-8 px-4 bg-white min-h-screen flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-around items-center">
                <div><p className='text-[48px] text-[#474747]'>Meliora</p></div>
                <div className="flex justify-around items-center gap-[80px]">
                    <div className="flex gap-[40px] text-[16px] text-[#474747] relative">
                        {['Home', 'Blog', 'Contact us', 'More'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setMainTab(tab)}
                                className={`relative pb-1 font-medium ${mainTab === tab ? 'text-[#474747]' : 'text-gray-500 hover:text-[#474747]'}`}
                            >
                                {tab}
                                {mainTab === tab && (
                                    <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-[#474747] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className='relative'>
                        <input
                            className='border border-1 h-[40px] bg-[#F4F4F4] rounded-sm placeholder-[#474747] pl-4'
                            placeholder='Search'
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setPage(1);
                            }}
                        />
                        <button className='absolute top-0 right-0 bg-[#FFBA9D] w-[40px] h-[40px] rounded-sm flex justify-center items-center'>
                            <Image src={searchIcon} alt='searchIcon' className='h-[16px] w-[16px]' />
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts */}
            <div className='w-full flex flex-col items-center mt-[80px]'>
                <div className='px-[20%] w-full'>
                    <div><p className='text-black font-normal text-2xl'>Recent Posts</p></div>

                    {/* Tabs */}
                    <div className="mt-4 relative">
                        {/* Horizontal line below tabs */}
                        <div className="absolute left-0 right-0 top-full h-[1px] bg-gray-300 z-0" />

                        <div className="flex gap-6 relative z-10">
                            {['All', 'Design Theory', 'Tech', 'User Interface'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        setPage(1);
                                    }}
                                    className={`relative px-1 pb-2 text-sm font-medium ${activeTab === tab ? 'text-[#474747]' : 'text-gray-500 hover:text-[#474747]'
                                        }`}
                                >
                                    {tab}

                                    {/* Underline only on active tab */}
                                    {activeTab === tab && (
                                        <span className="absolute left-0 bottom-[-1px] w-full h-[3px] bg-[#474747] rounded-full" />
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
                                    <Link href={`/blog/${post.slug}`} className="text-xl font-normal text-[#474747] hover:text-grey-600">
                                        {post.frontMatter.title}
                                    </Link>
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

            {/* Footer */}
            <div className='flex justify-between px-[10%] items-center bg-[#F4F4F4] py-[20px]'>
                <div className='flex text-[#474747] items-center gap-[4px]'>
                    <p>Copyright</p>
                    <Image src={copyright} alt='copyright' className='w-[16px] h-[14px]'/>
                    <p>2020 Meliora, Inc</p>
                </div>
                <div className='flex gap-[40px]'>
                    <Image src={fbIcon} alt='fbIcon' className='w-[12px] h-[18px]' />
                    <Image src={linkedinIcon} alt='linkedinIcon' className='w-[16px] h-[18px]'/>
                    <Image src={githubIcon} alt='githubIcon' className='w-[16px] h-[18px]'/>
                    <Image src={xIcon} alt='xIcon' className='w-[16px] h-[18px]'/>
                </div>
            </div>
        </div>
    );
}

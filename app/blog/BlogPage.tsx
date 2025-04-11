'use client';

import Link from 'next/link';
import searchIcon from '../../assets/searchIcon.png';
import { useState } from 'react';
import fbIcon from '../../assets/fbIcon.png'
import githubIcon from '../../assets/githubIcon.png'
import linkedinIcon from '../../assets/linkedinIcon.png'
import xIcon from '../../assets/xIcon.png'
import copyright from '../../assets/copyright.png'
import up from '../../assets/up.png'
import Image from "next/image";

/* eslint-disable @typescript-eslint/no-explicit-any */
type BlogPageProps = {
    posts: {
        slug: any;
        frontMatter: {
            [key: string]: any;
        };
        content: string;
    }[];
};
/* eslint-disable @typescript-eslint/no-explicit-any */

const SocialIcons = () => {
    return (
        <div className='flex gap-[40px]'>
            <Image src={fbIcon} alt='fbIcon' className='w-[12px] h-[18px]' />
            <Image src={linkedinIcon} alt='linkedinIcon' className='w-[16px] h-[18px]' />
            <Image src={githubIcon} alt='githubIcon' className='w-[16px] h-[18px]' />
            <Image src={xIcon} alt='xIcon' className='w-[16px] h-[18px]' />
        </div>
    )
}

export default function BlogPage({ posts }: BlogPageProps) {
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
        <div className="bg-[#f1efed] min-h-screen">
            {/* Hero Section */}
            <div className="bg-[#18375A] text-white py-16 text-center">
                <h1 className="text-5xl font-bold mb-4">Nstream Blogs</h1>
                <p className="text-lg">Stay updated with the latest insights and trends in AI and technology.</p>
            </div>

            {/* Blog Grid */}
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {post.frontMatter.image ? (
                            <Image
                                src={post.frontMatter.image}
                                alt={post.frontMatter.title || 'Blog Image'}
                                width={400}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Image Available</span>
                            </div>
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2 text-[#0266ff]">
                                {post.frontMatter.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{post.frontMatter.excerpt}</p>
                            <Link href={`/blog/${post.slug}`} className="text-[#0266ff] hover:underline">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="bg-[#18375A] text-white py-6 text-center">
                <p>&copy; 2025 Nstream AI. All rights reserved.</p>
            </footer>
        </div>
    );
}

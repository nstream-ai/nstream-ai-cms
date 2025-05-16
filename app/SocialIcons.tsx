'use client';

import githubIcon from '../assets/githubIcon.png'
import linkedinIcon from '../assets/linkedinIcon.png'
import Image from 'next/image'

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const handleOutboundClick = (url: string) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'outbound_click',
      outbound_url: url,
      blog_url: window.location.pathname,
    });
  }
};

const SocialIcons = () => {
    return (
        <div className='flex gap-[40px]'>
            <a href='https://www.linkedin.com/company/nstream-ai/' 
            target='_blank' onClick={() => handleOutboundClick
            ('https://www.linkedin.com/company/nstream-ai/') }><Image 
            src={linkedinIcon} alt='linkedinIcon' className='w-[18px] 
            h-[18px]' /></a>
            <a href='https://github.com/nstream-ai' target='_blank' onClick={() => handleOutboundClick('https://github.com/nstream-ai') }>
                <Image src={githubIcon} alt='githubIcon' className='w-[18px] h-[18px]' />
            </a>
            <a href='https://x.com/nstream_ai' target='_blank' onClick={() => handleOutboundClick('https://x.com/nstream_ai') }>
                <span className="w-[18px] h-[18px] flex items-center justify-center text-[#474747]">
                    <svg viewBox="0 0 1200 1227" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h273.5l326.5 441.5L926.5 0H1200L750 623.5L1200 1227H926.5L600 785.5L273.5 1227H0l450-603.5L0 0Z" fill="currentColor"/>
                    </svg>
                </span>
            </a>
        </div>
    )
}

export default SocialIcons;
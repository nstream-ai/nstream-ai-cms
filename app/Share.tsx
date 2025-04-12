'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import share from '../assets/share.png';
import shareHover from '../assets/share.png';

interface ShareButtonProps {
  url?: string;
}

const ShareButton = ({ url }: ShareButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    // Set URL once component mounts in the browser
    setCurrentUrl(url || window.location.href);
  }, [url]);

  const handleShare = () => {
    // Check if it's mobile (using navigator.share API availability)
    if (typeof navigator !== 'undefined' && navigator.share) {
      // Mobile device - use native share
      navigator.share({
        title: document.title,
        url: currentUrl
      }).catch(error => console.error('Error sharing:', error));
    } else {
      // Desktop - copy link to clipboard
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl)
          .then(() => {
            setShowCopyTooltip(true);
            setTimeout(() => setShowCopyTooltip(false), 2000);
          })
          .catch(error => console.error('Could not copy text: ', error));
      }
    }
  };

  return (
    <div className="relative inline-block">
      <Image
        src={isHovered ? shareHover : share}
        alt="share"
        className="w-[30px] h-[30px] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleShare}
      />
      
      {showCopyTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
          Link copied!
        </div>
      )}
    </div>
  );
};

export default ShareButton;
'use client';

import { useState, useEffect } from 'react';

interface ShareButtonProps {
  url?: string;
}

const sharePlatforms = [
  {
    type: 'x',
    label: 'X',
    url: (shareUrl: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
  },
  {
    type: 'linkedin',
    label: 'LinkedIn',
    url: (shareUrl: string, title: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
  },
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    url: (shareUrl: string, title: string) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`,
  },
];

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const ShareButton = ({ url }: ShareButtonProps) => {
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrentUrl(url || window.location.href);
    setTitle(document.title);
    setMounted(true);
  }, [url]);

  if (!mounted) return null;

  const handleShare = (type: string, shareUrl: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'blog_event_social_share',
      share_type: type,
      blog_url: window.location.pathname,
    });
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          setShowCopyTooltip(true);
          setTimeout(() => setShowCopyTooltip(false), 2000);
        })
        .catch(error => console.error('Could not copy text: ', error));
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'blog_event_social_share',
        share_type: 'copy',
        blog_url: window.location.pathname,
      });
    }
  };

  return (
    <div className="relative inline-block">
      <div className="flex gap-2">
        {sharePlatforms.map(platform => (
          <button
            key={platform.type}
            className="share-button px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
            data-share-type={platform.type}
            aria-label={`Share on ${platform.label}`}
            onClick={() => handleShare(platform.type, platform.url(currentUrl, title))}
          >
            {platform.label}
          </button>
        ))}
        <button
          className="share-button px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          data-share-type="copy"
          aria-label="Copy link"
          onClick={handleCopy}
        >
          Copy Link
        </button>
      </div>
      {showCopyTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
          Link copied!
        </div>
      )}
    </div>
  );
};

export default ShareButton;
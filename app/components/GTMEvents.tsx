'use client';
import { useEffect } from 'react';

export default function GTMEvents() {
  useEffect(() => {
    // Article View Tracking
    if (document.querySelector('article')) {
      const articleTitle = document.querySelector('h1')?.textContent || '';
      const author = document.querySelector('.author')?.textContent || '';
      const category = document.querySelector('.category')?.textContent || '';
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'blog_event_article_view',
        article_title: articleTitle,
        author,
        category,
      });
    }

    // Social Share Tracking
    const handleShareClick = (e: MouseEvent) => {
      const shareButton = (e.target as HTMLElement).closest('.share-button');
      if (shareButton) {
        const shareType = shareButton.getAttribute('data-share-type') || 'unknown';
        window.dataLayer.push({
          event: 'blog_event_social_share',
          share_type: shareType,
        });
      }
    };

    // Outbound Link Tracking
    const handleOutboundClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (link && link instanceof HTMLAnchorElement && link.hostname !== window.location.hostname) {
        window.dataLayer.push({
          event: 'blog_event_outbound_link',
          outbound_url: link.href,
          outbound_text: link.textContent?.trim() || '',
        });
      }
    };

    // Cross Domain CTA Tracking
    const handleCTAClick = (e: MouseEvent) => {
      const ctaButton = (e.target as HTMLElement).closest('.cta-button');
      if (ctaButton && ctaButton.getAttribute('data-cta-type') === 'cross-domain') {
        window.dataLayer.push({
          event: 'blog_event_cross_domain_cta',
          cta_type: ctaButton.getAttribute('data-cta-type'),
          cta_text: ctaButton.textContent?.trim() || '',
        });
      }
    };

    document.addEventListener('click', handleShareClick);
    document.addEventListener('click', handleOutboundClick);
    document.addEventListener('click', handleCTAClick);

    return () => {
      document.removeEventListener('click', handleShareClick);
      document.removeEventListener('click', handleOutboundClick);
      document.removeEventListener('click', handleCTAClick);
    };
  }, []);

  return null;
} 
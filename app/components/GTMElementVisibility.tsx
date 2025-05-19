'use client';
import { useEffect } from 'react';

export default function GTMElementVisibility() {
  useEffect(() => {
    // Define elements to track
    const elementsToTrack = [
      { selector: 'article', key: 'article-content' },
      { selector: '.cta-section', key: 'cta-section' },
      { selector: '.social-share', key: 'social-share' },
    ];

    // Intersection Observer callback
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const elementId = entry.target.id || entry.target.className || entry.target.tagName;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'blog_event_element_visibility',
            element_id: elementId,
            element_type: entry.target.tagName.toLowerCase(),
            visibility_ratio: entry.intersectionRatio,
            is_visible: true,
          });
        }
      });
    }, {
      threshold: [0.5],
      rootMargin: '0px',
    });

    // Observe all elements
    elementsToTrack.forEach(({ selector }) => {
      document.querySelectorAll(selector).forEach(element => {
        observer.observe(element);
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
} 
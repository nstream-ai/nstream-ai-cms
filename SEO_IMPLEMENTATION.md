# SEO Implementation and Analytics Workflow

## Overview

This document outlines the SEO implementation and analytics workflow for the following sites:
- nstream.ai
- blog.nstream.ai
- docs.nstream.ai

## SEO Implementation

### Metadata and Structured Data

- **Global Metadata**: Each site uses Next.js's Metadata API in `app/layout.tsx` to set default titles, descriptions, Open Graph, Twitter cards, and robots rules.
- **Per-Page Metadata**: Dynamic pages (e.g., blog posts) generate metadata using `generateMetadata()` to ensure unique titles, descriptions, and structured data.
- **JSON-LD**: Blog posts include a `BlogPosting` schema with dynamic values (title, date, author, image, etc.) to enable rich results in Google.

### Sitemap and Robots

- **Sitemap**: Each site generates a `sitemap.xml` using the `app/sitemap.xml.ts` file. URLs are constructed using a `baseUrl` (from `NEXT_PUBLIC_SITE_URL` or `siteConfig.url`).
- **Robots**: The `app/robots.ts` file defines rules and points to the sitemap using the same `baseUrl`.

## Google Analytics 4 (GA4) and Google Tag Manager (GTM)

### GA4 Measurement ID

- **Environment Variable**: Each site uses `NEXT_PUBLIC_GA_ID` to store the GA4 Measurement ID (e.g., `G-XXXXXXXXXX`).
- **Gtag Snippet**: The GA4 snippet is injected in the `<head>` of `app/layout.tsx` using Next's `<Script>` component.

### Google Tag Manager (GTM)

- **Container ID**: Each site uses `NEXT_PUBLIC_GTM_ID` to store the GTM Container ID (e.g., `GTM-XXXXXX`).
- **GTM Snippet**: The GTM loader script is injected in the `<head>` of `app/layout.tsx`, and the noscript fallback is added immediately after the `<body>` opens.

## Workflow

1. **Initialization**:
   - Set `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_GTM_ID` in `.env.local` for each site.
   - Ensure `NEXT_PUBLIC_SITE_URL` is set to the correct domain.

2. **Deployment**:
   - Deploy each site with the correct environment variables.
   - Verify that the GA4 and GTM snippets are present in the page source.

3. **Testing**:
   - Use Google's Rich Results Tester to verify structured data.
   - Check GA4 and GTM dashboards to ensure data is being collected.

4. **Maintenance**:
   - Regularly update metadata and structured data as needed.
   - Monitor GA4 and GTM for any issues or updates.

## Next Steps

- **Rich Results Testing**: Regularly test structured data with Google's Rich Results Tester.
- **Analytics Dashboard**: Set up a dashboard to monitor site performance and user engagement.
- **Documentation**: Keep this document updated with any changes or improvements.

## User Engagement Tracking Plan for blog.nstream.ai

### What to Track

**A. Blog List Page**
- Clicks on blog post links (to measure which posts attract attention)

**B. Blog Post Page**
- Scroll depth (how far users read)
- Time on page (engagement)
- Clicks on share buttons (which posts are being shared, and where)
- Outbound link clicks (if you link to external resources)
- (Optional) Copy events (if users copy text from your blog)

### How to Track (GA4 + GTM Workflow)

#### A. Set Up GTM and GA4
- GTM is installed on your site.
- In GTM, add a GA4 Configuration tag with your Measurement ID and trigger it on all pages.

#### B. Track Blog Post Clicks (from List)
1. In GTM, create a new **Trigger**:
   - Type: "Click – Just Links"
   - Fire on: Some Link Clicks
   - Condition: Click URL contains `/blog/`
2. Create a new **GA4 Event Tag**:
   - Event Name: `blog_list_click`
   - Parameters:
     - `blog_title` (use Click Text or a custom attribute)
     - `blog_url` (use Click URL)
   - Trigger: The trigger you just created.

#### C. Track Scroll Depth on Blog Posts
1. In GTM, create a **Scroll Depth Trigger**:
   - Vertical Scroll Depths: 25, 50, 75, 100
   - Fire on: Page Path matches `/blog/*`
2. Create a **GA4 Event Tag**:
   - Event Name: `blog_scroll`
   - Parameters:
     - `scroll_depth` (use built-in Scroll Depth Threshold)
     - `blog_url` (use Page Path)
   - Trigger: The scroll trigger above.

#### D. Track Share Button Clicks
1. Add a `data-share-type` attribute to each share button in your code (e.g., `data-share-type="twitter"`).
2. In GTM, create a **Click Trigger**:
   - Type: "Click – All Elements"
   - Fire on: Some Clicks
   - Condition: Click Element matches CSS selector `[data-share-type]`
3. Create a **GA4 Event Tag**:
   - Event Name: `blog_share`
   - Parameters:
     - `share_type` (use Click Element's data-share-type)
     - `blog_url` (use Page Path)
   - Trigger: The share button trigger.

#### E. Track Outbound Link Clicks
1. In GTM, create a **Click Trigger**:
   - Type: "Click – Just Links"
   - Fire on: Some Link Clicks
   - Condition: Click URL does not contain your domain
2. Create a **GA4 Event Tag**:
   - Event Name: `outbound_click`
   - Parameters:
     - `outbound_url` (use Click URL)
     - `blog_url` (use Page Path)
   - Trigger: The outbound link trigger.

#### F. (Optional) Track Copy Events
1. In GTM, create a **Custom Event Trigger**:
   - Event Name: `copy`
2. In your blog post page code, add:
   ```js
   document.addEventListener('copy', function() {
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({ event: 'copy' });
   });
   ```
3. Create a **GA4 Event Tag**:
   - Event Name: `blog_copy`
   - Parameter: `blog_url` (use Page Path)
   - Trigger: The custom event trigger.

### Reporting
- In GA4, create custom reports or explorations for:
  - Most clicked blog posts (from list)
  - Scroll depth distribution per post
  - Most shared posts and share destinations
  - Outbound link destinations
  - (Optional) Copy events

### Documentation & Maintenance
- Document all GTM tags, triggers, and variables.
- Test each event in GTM Preview mode and GA4 DebugView.
- Update tracking as your site evolves (e.g., new share buttons, new blog sections).

### Example: Blog Share Button Code
```jsx
<button data-share-type="twitter" onClick={...}>Share on Twitter</button>
<button data-share-type="linkedin" onClick={...}>Share on LinkedIn</button>
```

### Next Steps
1. Implement the above GTM tags/triggers.
2. Add any missing data attributes in your codebase.
3. Test in GTM Preview and GA4 DebugView.
4. Document your setup for future reference.

## Engagement Tracking: Implementation Gaps & Action Plan

### What's Not Yet Implemented

1. **Share Button Tracking**
   - `data-share-type` attribute is missing on share buttons.
   - No dataLayer push for share events.
2. **Blog List Click Tracking**
   - No custom attribute or dataLayer push on blog post links in the blog list.
3. **Scroll Depth Tracking**
   - No scroll tracking code or GTM trigger set up.
4. **Outbound Link Tracking**
   - No data attributes or dataLayer push for outbound links.
5. **Copy Event Tracking**
   - No code to push a `copy` event to the dataLayer.

### What to Add: Tag Names, Triggers, Variables, and Code

#### A. Code Changes

**1. Share Button Example**
```jsx
<button
  data-share-type="twitter"
  onClick={() => {
    // ...existing share logic...
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'blog_share',
      share_type: 'twitter',
      blog_url: window.location.pathname,
    });
  }}
>
  Share on Twitter
</button>
```

**2. Blog List Link Example**
```jsx
<a
  href={`/blog/${slug}`}
  data-blog-title={title}
  onClick={() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'blog_list_click',
      blog_title: title,
      blog_url: `/blog/${slug}`,
    });
  }}
>
  {title}
</a>
```

**3. Copy Event (in blog post page)**
```js
document.addEventListener('copy', function() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'blog_copy',
    blog_url: window.location.pathname,
  });
});
```

**4. Outbound Link Example**
```jsx
<a
  href={externalUrl}
  target="_blank"
  rel="noopener"
  data-outbound-link
  onClick={() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'outbound_click',
      outbound_url: externalUrl,
      blog_url: window.location.pathname,
    });
  }}
>
  External Resource
</a>
```

#### B. GTM Setup

**Variables:**
- `Click URL` (built-in)
- `Click Text` (built-in)
- `Click Element` (built-in)
- `Page Path` (built-in)
- `Data Layer Variable: blog_title`
- `Data Layer Variable: blog_url`
- `Data Layer Variable: share_type`
- `Data Layer Variable: outbound_url`
- `Data Layer Variable: scroll_depth` (if using custom scroll events)

**Triggers:**
- **Blog List Click**: Custom Event Trigger for `blog_list_click`
- **Share Button Click**: Custom Event Trigger for `blog_share`
- **Scroll Depth**: Built-in Scroll Depth Trigger (or custom event if you push to dataLayer)
- **Outbound Link Click**: Custom Event Trigger for `outbound_click`
- **Copy Event**: Custom Event Trigger for `blog_copy`

**Tags:**
- **GA4 Event: blog_list_click**
- **GA4 Event: blog_share**
- **GA4 Event: blog_scroll**
- **GA4 Event: outbound_click**
- **GA4 Event: blog_copy**

### Next Steps
1. Add the above code snippets to your React components.
2. Configure the listed variables, triggers, and tags in GTM.
3. Test each event in GTM Preview and GA4 DebugView.
4. Update this document as you implement and verify each step. 
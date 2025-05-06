Absolutely! Here’s a **framework/checklist** for designing and implementing SEO and analytics best practices for any Next.js (or modern web) project, especially when you have multiple sites/subdomains (e.g., `nstream.ai`, `blog.nstream.ai`, `docs.nstream.ai`). This framework is modular and can be adapted for any site in your ecosystem.

---

# SEO & Analytics Implementation Framework for Multi-Site Domains

## 1. **Project Setup**

- **Directory Structure:**  
  Organize each site as a separate Next.js project or as sub-apps in a monorepo.
- **Environment Variables:**  
  Use `.env.local` for site-specific values (e.g., `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`).

---

## 2. **Metadata & Structured Data**

- **Global Metadata:**  
  Use Next.js Metadata API or `<Head>` to set:
  - Title (with template)
  - Description
  - Keywords
  - Open Graph & Twitter Card
  - Canonical URL
  - Robots meta
- **Per-Page Metadata:**  
  Use dynamic metadata for blog posts, docs, or product pages.
- **Structured Data (JSON-LD):**  
  - Organization schema on all pages
  - BlogPosting/Article schema on blog posts
  - FAQ/HowTo/Product schema where relevant

---

## 3. **Sitemap & Robots.txt**

- **Sitemap:**  
  - Generate dynamically using site config/environment variable for base URL.
  - Include all important pages (blogs, docs, products, etc.).
- **Robots.txt:**  
  - Allow/disallow as needed.
  - Reference sitemap.

---

## 4. **Analytics & Tag Management**

- **Google Analytics 4 (GA4):**
  - Add GA4 Measurement ID via env variable.
  - Inject gtag.js or use Google Tag Manager.
- **Google Tag Manager (GTM):**
  - Add GTM container for each site.
  - Use GTM to manage all analytics and marketing tags.
- **Cross-Domain Tracking:**
  - Configure GA4 and GTM for cross-domain tracking if users move between subdomains.

---

## 5. **Event & Engagement Tracking**

- **Standard Events:**
  - Page views, scrolls, outbound clicks, shares, form submissions, downloads.
- **Custom Events:**
  - Blog post clicks, doc navigation, product interactions.
- **Data Layer Variables:**
  - Use consistent naming across sites (e.g., `blog_title`, `doc_section`, `outbound_url`).
- **GTM Setup:**
  - Create variables, triggers, and tags for each event.
  - Mark key events as conversions in GA4.

---

## 6. **Performance & Accessibility**

- **Core Web Vitals:**  
  - Optimize LCP, FID, CLS.
  - Use Next.js image optimization, font preloading, and code splitting.
- **Accessibility:**  
  - Use semantic HTML, alt text, ARIA labels.
  - Test with Lighthouse and screen readers.

---

## 7. **Content & Indexing**

- **Canonical URLs:**  
  - Ensure each page has a canonical tag.
- **Noindex/Noarchive:**  
  - Use for staging, internal, or duplicate pages.
- **Open Graph & Twitter Cards:**  
  - Ensure every shareable page has a rich preview.

---

## 8. **Testing & Monitoring**

- **Rich Results Testing:**  
  - Use Google’s Rich Results Tester for structured data.
- **GTM Preview & GA4 DebugView:**  
  - Test all events before publishing.
- **Search Console & Analytics:**  
  - Register each site in Google Search Console.
  - Monitor for crawl errors, indexing, and performance.

---

## 9. **Documentation & Maintenance**

- **SEO/Analytics README:**  
  - Document all tags, triggers, variables, and custom events.
  - Keep a changelog for updates.
- **Regular Audits:**  
  - Schedule periodic reviews of SEO, analytics, and site health.

---

## 10. **Reusable Code & Config**

- **Config Files:**  
  - Centralize site config (name, URL, social links, etc.) for easy reuse.
- **Components:**  
  - Create reusable SEO, Analytics, and Structured Data components.
- **Templates:**  
  - Use templates for blog posts, docs, and product pages with built-in SEO.

---

## **Example: Applying to a New Site (e.g., docs.nstream.ai)**

1. **Copy the framework and config files.**
2. Set up `.env.local` with site-specific URLs and analytics IDs.
3. Implement global and per-page metadata.
4. Add structured data for docs (e.g., FAQ, HowTo).
5. Set up sitemap and robots.txt.
6. Add GTM and GA4, configure cross-domain if needed.
7. Track doc navigation, search, and outbound clicks.
8. Test, document, and monitor.

---

**This framework ensures every site in your domain family is SEO-optimized, analytics-ready, and easy to maintain.**  
Let me know if you want a starter template or code snippets for any section!

# Next.js Markdown Blog

A simple, responsive blog built with Next.js that automatically generates pages from Markdown files.

## 📚 How It Works

This blog uses a combination of Next.js, gray-matter, and remark to transform Markdown files into blog posts.

### Key Technologies

#### gray-matter

[Gray Matter](https://github.com/jonschlinkert/gray-matter) is a powerful library that parses front matter from Markdown files. Front matter is metadata at the top of a Markdown file, separated by `---` delimiters.

**What it does:**
- Extracts structured data (like title, date, author) from the front of Markdown files
- Separates the front matter from the content
- Supports YAML, JSON, and other formats

**Example:**
```markdown
---
title: Hello World
date: 2025-03-29
author: John Doe
---

# This is my blog post

Content goes here...
```

Gray Matter parses this into:
```javascript
{
  data: { title: 'Hello World', date: '2025-03-29', author: 'John Doe' },
  content: '# This is my blog post\n\nContent goes here...'
}
```

#### remark/unified

[Remark](https://github.com/remarkjs/remark) is part of the unified ecosystem for processing Markdown content.

**What it does:**
- Parses Markdown into a syntax tree
- Allows transformation of the content
- Can convert Markdown to HTML (using remark-rehype and rehype-stringify)

**How we use it:**
```javascript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// Process markdown to HTML
const processedContent = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(markdownContent);
  
const contentHtml = processedContent.toString();
```

## 🚀 How Pages Are Generated

1. **File-based routing:** Next.js creates a page for each Markdown file
2. **Content processing:**
   - `gray-matter` extracts front matter (metadata) and content from Markdown files
   - `remark` and its plugins transform Markdown content into HTML
3. **Static Site Generation:** Pages are pre-rendered at build time using Next.js's `getStaticProps` and `getStaticPaths`

## 📝 Creating New Blog Posts

To create a new blog post:

1. Add a new `.md` file to the `content/posts` directory
2. Include front matter at the top with the following fields:
   ```markdown
   ---
   title: 'Your Title Here'
   date: 'YYYY-MM-DD'
   author: 'Your Name'
   ---
   ```
3. Write your content in Markdown format
4. Push to GitHub to trigger a rebuild on your hosting platform (e.g., Vercel)

## 🔄 GitHub Integration

When you push changes to GitHub:

1. The hosting platform (Vercel) detects the changes
2. It rebuilds the site, processing any new or modified Markdown files
3. The updated content is automatically deployed

## 💻 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/next-markdown-blog.git

# Navigate to the project directory
cd next-markdown-blog

# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit `http://localhost:3000` to see your blog.

## 📋 Key Dependencies

- **Next.js:** React framework for server-rendered applications
- **gray-matter:** For parsing front matter from markdown files
- **unified/remark/rehype:** For processing and transforming Markdown content
- **Tailwind CSS:** For styling (optional)

## 📚 Further Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Gray Matter Documentation](https://github.com/jonschlinkert/gray-matter)
- [Unified/Remark Documentation](https://github.com/remarkjs/remark)

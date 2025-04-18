export const siteConfig = {
  name: 'Nstream AI',
  description: 'Explore the latest insights on AI, machine learning, and technology from Nstream AI',
  url: 'https://blog.nstream.ai',
  ogImage: '/images/nstream-og-image.jpg',
  links: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/NstreamAI',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/nstream-ai',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/nstream-ai',
  },
  metadata: {}
} as const; 
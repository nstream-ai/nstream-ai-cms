import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">My Markdown Blog</h1>
      <p className="text-xl mb-8">Welcome to my Next.js blog that uses Markdown files.</p>
      <Link href="/blog" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Read Blog Posts
      </Link>
    </main>
  );
}
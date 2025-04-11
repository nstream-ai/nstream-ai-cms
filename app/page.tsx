import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Nstream AI CMS</h1>
        <p className="text-xl mb-6">Your one-stop solution for managing AI-driven content seamlessly.</p>
        <Link href="/blog" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200">
          Explore Blog Posts
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold mb-4">Feature 1</h3>
            <p>Streamline your content management with AI-powered tools.</p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold mb-4">Feature 2</h3>
            <p>Seamless integration with your existing workflows.</p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold mb-4">Feature 3</h3>
            <p>Advanced analytics to track and optimize performance.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 Nstream AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AlertCircle } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  date: string;
  content: string;
  image: string;
  author: string;
  excerpt: string;
}

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      setPost(result.data);
    } catch (err) {
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-4">{error || 'Blog post not found'}</p>
        <button
          onClick={() => router.push('/components/blog/blog')}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => router.push('/components/blog/blog')}
            className="text-white hover:text-gray-300 transition-colors flex items-center gap-2"
          >
            ← Back to Blog
          </button>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        {/* Meta information */}
        <div className="flex items-center text-gray-600 mb-8">
          <span>{new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>

        {/* Excerpt/Summary Box */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8 border-4 border-black shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center font-serif">
            <span className="bg-black text-white px-3 py-1 rounded-md mr-2 text-sm font-sans">Summary</span>
          </h2>
          <p className="text-gray-700 italic leading-relaxed font-serif text-lg">
            {post.excerpt}
          </p>
        </div>
        
        {/* Featured Image */}
        <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content Section */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Main Content</h2>
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-white p-8 rounded-lg shadow-sm">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail; 
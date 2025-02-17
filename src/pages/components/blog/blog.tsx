import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/router';
interface BlogPost {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

interface ApiResponse {
  success: boolean;
  data: BlogPost[];
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/blog');

        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();

        if (!result.success) {
          throw new Error('Failed to fetch blogs');
        }

        // Ensure we always have an array, even if empty
        setBlogPosts(result.data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        setBlogPosts([]); // Ensure blogPosts is an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[600px] bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-gray-50 p-4">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
        </div>
        <p className="text-gray-600 text-center max-w-md mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 
                   transition-colors duration-300 flex items-center gap-2"
        >
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700 mb-3">No Blog Posts Yet</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          We're working on creating amazing content for you. Please check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Enhanced Header Section */}
      <header className="relative py-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-500 opacity-90"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover expert tips, insights, and the latest trends in home services and maintenance.
          </p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post._id}
              className="bg-gray-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300 
                       hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 
                           hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <button
                  className="inline-flex items-center gap-2 text-black font-semibold 
                           hover:text-gray-600 transition-colors duration-300"
                  onClick={() => router.push(`/components/blog/${post._id}`)}
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-black text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-medium">BLOG by NISHIT_PARMAR</p>
          <p className="text-gray-400 mt-2">Sharing knowledge, empowering homes</p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
import React, { useEffect, useState } from 'react';
import { AlertCircle, CalendarIcon, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 pb-16">
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog) => (
            <div 
              key={blog._id} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-gray-700 transition-colors">
                  {blog.title}
                </h2>
                
                <div className="text-gray-600 mb-4 flex items-center gap-2 text-sm">
                  <CalendarIcon className="w-4 h-4" />
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>

                <p className="text-gray-700 mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Fixed Read More Button */}
                <div className="mt-auto pt-4">
                  <button
                    onClick={() => router.push(`/components/blog/${blog._id}`)}
                    className="group relative w-full bg-black text-white py-3 px-6 rounded-lg 
                             overflow-hidden transition-all duration-300 hover:scale-105
                             hover:shadow-lg active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gray-100 
                                  opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gray-100 
                                  opacity-0 group-hover:opacity-100 transition-all duration-300 
                                  group-hover:translate-x-1" />
                    <div className="relative z-10 flex items-center justify-center gap-2 
                                  transition-transform duration-300 group-hover:scale-105
                                  group-hover:text-black">
                      <span className="font-semibold">Read More</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 
                                         transition-all duration-300" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center gap-2 text-red-600 py-12">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}
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
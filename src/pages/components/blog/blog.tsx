import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

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
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-gray-600">
          Loading blogs...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <AlertCircle className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Error Loading Blogs</h2>
        </div>
        <p className="text-gray-600 text-center max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-800">No Blog Posts Found</h2>
        <p className="text-gray-600 mt-2">Check back later for new content!</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black m-0 p-0">
      {/* Header Section */}
      <header className="py-10 text-center bg-gray-100">
        <h1 className="text-5xl font-bold text-gray-800">Our Blog</h1>
        <p className="mt-2 text-lg text-gray-600">Explore insights and tips for a cleaner, healthier home.</p>
      </header>

      {/* Blog Posts Section */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div 
            key={post._id} 
            className="border border-gray-300 rounded-lg overflow-hidden group relative transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-image.jpg';
                }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
              <div className="absolute inset-0 bg-black bg-opacity-80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <span className="text-lg font-bold mb-2">{post.title}</span>
                <p className="text-sm">{post.excerpt}</p>
                <button 
                  className="mt-4 border border-white text-white py-2 px-4 text-center rounded hover:bg-white hover:text-black transition-colors duration-300"
                  onClick={() => {
                    console.log(`Navigate to blog post: ${post._id}`);
                  }}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="py-10 text-center">
        <p className="text-gray-600">BLOG by NISHIT_PARMAR</p>
      </footer>
    </div>
  );
};

export default Blog;
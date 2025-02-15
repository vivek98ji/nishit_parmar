'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Plus, AlertCircle } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    image: '',
  });

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      const result = await response.json();
      
      if (!result.success) {
        throw new Error('Failed to fetch blogs');
      }
      
      setBlogs(result.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newBlog,
          date: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }

      // Reset form and refresh blogs
      setNewBlog({ title: '', excerpt: '', image: '' });
      setShowForm(false);
      fetchBlogs();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create blog');
    }
  };

  // Handle blog deletion
  const handleDelete = async (blogId: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: blogId }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }

      fetchBlogs();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          Add New Blog
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 mb-4 p-4 bg-red-50 rounded-md">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="grid gap-4">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Excerpt</label>
              <textarea
                value={newBlog.excerpt}
                onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Image URL</label>
              <input
                type="url"
                value={newBlog.image}
                onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Create Blog Post
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-lg overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-image.jpg';
              }}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-2">
                {new Date(blog.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{blog.excerpt}</p>
              <button
                onClick={() => handleDelete(blog._id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 size={20} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsAdmin;

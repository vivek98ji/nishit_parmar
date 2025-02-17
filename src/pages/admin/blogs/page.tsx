'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Plus, AlertCircle, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
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
    content: '',
    image: '',
  });

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const router = useRouter();

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

  // Handle edit click
  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowForm(true);
    setNewBlog({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
    });
  };

  // Update handleSubmit to handle both create and edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingBlog && blogs.length >= 10) {
      setError('Maximum limit of 10 blogs reached. Please delete some blogs before adding new ones.');
      setShowForm(false);
      return;
    }

    try {
      const url = editingBlog ? `/api/blog/${editingBlog._id}` : '/api/blog';
      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
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
      setNewBlog({ title: '', excerpt: '', content: '', image: '' });
      setShowForm(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save blog');
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
        <h1 className="text-3xl font-bold">Manage Blogs ({blogs.length}/10)</h1>
        <button
          onClick={() => {
            if (blogs.length >= 10) {
              setError('Maximum limit of 10 blogs reached. Please delete some blogs before adding new ones.');
            } else {
              setShowForm(!showForm);
              setError(null);
            }
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          <Plus size={20} />
          Add New Blog
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 mb-4 p-4 bg-gray-50 border border-red-200 rounded-md">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingBlog(null);
                  setNewBlog({ title: '', excerpt: '', content: '', image: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>

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
                className="w-full p-2 border rounded h-20"
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

            <div>
              <label className="block mb-2">Main Content</label>
              <textarea
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                className="w-full p-2 border rounded min-h-[200px]"
                placeholder="Write your blog content here..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              {editingBlog ? 'Update Blog Post' : 'Create Blog Post'}
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
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Edit2 size={20} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsAdmin;

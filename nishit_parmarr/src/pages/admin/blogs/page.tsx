import React, { useState } from 'react';

interface Blog {
    id: number;
    title: string;
    content: string;
    author: string;
}

const AdminBlogManagement: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [author, setAuthor] = useState<string>('');

    const handleAddBlog = () => {
        if (title.trim() === '' || content.trim() === '' || author.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        const newBlog: Blog = {
            id: Date.now(),
            title,
            content,
            author,
        };
        setBlogs([...blogs, newBlog]);
        setTitle('');
        setContent('');
        setAuthor('');
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-extrabold text-center mb-10 uppercase tracking-wide">
                Admin Blog Management
            </h1>

            {/* Blog Form */}
            <div className="bg-gray-900 p-8 rounded-2xl shadow-xl max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Add a New Blog</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full p-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full p-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Blog Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                    />
                    <input
                        type="text"
                        className="w-full p-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Author Name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <button
                        onClick={handleAddBlog}
                        className="w-full bg-white text-black py-3 rounded-xl hover:bg-gray-300 transition"
                    >
                        Add Blog
                    </button>
                </div>
            </div>

            {/* Blog List */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transform transition-transform"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">{blog.title}</h2>
                        <p className="text-gray-400 text-sm mb-4">By {blog.author}</p>
                        <p className="text-gray-300 line-clamp-3">{blog.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminBlogManagement;

import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      title: 'The Importance of Regular Cleaning',
      date: 'October 1, 2023',
      excerpt: 'Regular cleaning is essential for maintaining a healthy living environment. Discover the benefits of a clean home.',
      image: '/img/showcase/service3.jpg',
    },
    {
      title: 'Top 5 Home Maintenance Tips',
      date: 'September 15, 2023',
      excerpt: 'Learn the top five maintenance tips to keep your home in excellent condition throughout the year.',
      image: '/img/showcase/service2.jpg',
    },
    {
      title: 'Eco-Friendly Cleaning Solutions',
      date: 'September 5, 2023',
      excerpt: 'Explore eco-friendly cleaning solutions that are safe for your family and the environment.',
      image: '/img/showcase/service1.jpg',
    },
    {
      title: 'Seasonal Cleaning Checklist',
      date: 'August 20, 2023',
      excerpt: 'Stay organized with our seasonal cleaning checklist to keep your home in top shape.',
      image: '/img/showcase/service2.jpg',
    },
    {
      title: 'DIY Home Maintenance Tips',
      date: 'July 10, 2023',
      excerpt: 'Learn simple DIY maintenance tips to save money and keep your home in great condition.',
      image: '/img/showcase/service3.jpg',
    },
  ];

  return (
    <div className="bg-white text-black m-0 p-0">
      {/* Header Section */}
      <header className="py-10 text-center bg-gray-100">
        <h1 className="text-5xl font-bold text-gray-800">Our Blog</h1>
        <p className="mt-2 text-lg text-gray-600">Explore insights and tips for a cleaner, healthier home.</p>
      </header>

      {/* Blog Posts Section */}
      <div className="max-w-6xl mx-auto p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden group relative transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src={post.image} alt={post.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.date}</p>
              <p className="absolute inset-0 bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <span className="text-lg font-bold mb-2">{post.title}</span>
                {post.excerpt}
                <a href="#" className="mt-4 border border-white text-white py-2 px-4 text-center rounded hover:bg-white hover:text-black transition-colors duration-300">
                  Read More
                </a>
              </p>
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

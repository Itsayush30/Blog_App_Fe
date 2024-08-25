import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogApp = () => {
  const [blogs, setBlogs] = useState([]); // Initialize blogs as an empty array
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/v1/posts');
        // Extract data from response and set it to blogs
        setBlogs(response.data.data); 
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handlePost = async () => {
    const blog = { title, content };

    try {
      if (editId) {
        const response = await axios.put(`http://localhost:3002/api/v1/posts/${editId}`, blog);
        setBlogs(blogs.map(b => (b._id === editId ? response.data.data : b)));
        setEditId(null);
      } else {
        const response = await axios.post('http://localhost:3002/api/v1/posts', blog);
        // Add the new blog to the existing blogs array
        setBlogs([...blogs, response.data.data]);
      }

      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error posting or updating blog:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3002/api/v1/posts/${id}`);
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
      setEditId(id);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/v1/posts/${id}`);
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-2xl">Welcome to Blogs</h1>
      </header>

      <main className="flex-grow p-4">
        <form
          className="mb-4 p-4 bg-gray-100 rounded shadow-md"
          onSubmit={e => {
            e.preventDefault();
            handlePost();
          }}
        >
          <div className="mb-2">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="5"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {editId ? 'Update Blog' : 'Post Blog'}
          </button>
        </form>

        <div className="space-y-4">
          {blogs.map(blog => (
            <div key={blog._id} className="p-4 bg-white rounded shadow-md">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-700">{blog.content}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="mr-2 text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-blue-600 text-white text-center py-2">
        <p>© 2024 BlogApp</p>
      </footer>
    </div>
  );
};

export default BlogApp;

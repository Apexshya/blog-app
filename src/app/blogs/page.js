'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', description: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') router.push('/login');

    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(savedBlogs.reverse());
  }, []);

  const handleAddOrEditBlog = () => {
    let updatedBlogs = [...blogs];

    if (isEditing) {
      updatedBlogs[editIndex] = newBlog;
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedBlogs = [...updatedBlogs, newBlog];
    }

    localStorage.setItem('blogs', JSON.stringify([...updatedBlogs].reverse()));
    setBlogs(updatedBlogs);
    setNewBlog({ title: '', description: '', image: '' });
  };

  const handleEdit = (index) => {
    setNewBlog(blogs[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);
    setNewBlog({ title: '', description: '', image: '' });
  };

  const handleDelete = (index) => {
    const filtered = blogs.filter((_, i) => i !== index);
    localStorage.setItem('blogs', JSON.stringify(filtered.reverse()));
    setBlogs(filtered);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Manage Blogs</h2>

      {/* Blog Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {blogs.map((blog, i) => (
          <div key={i} className="bg-white rounded shadow overflow-hidden">
            <img
              src={blog.image || 'https://via.placeholder.com/400x200'}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{blog.title}</h3>
              <p className="text-sm text-gray-700">{blog.description}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(i)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Blog Form */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Blog' : 'Add a New Blog'}
        </h3>
        <input
          placeholder="Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          placeholder="Description"
          value={newBlog.description}
          onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          placeholder="Image URL"
          value={newBlog.image}
          onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleAddOrEditBlog}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {isEditing ? 'Update Blog' : 'Add Blog'}
          </button>
          {isEditing && (
            <button
              onClick={handleCancelEdit}
              className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

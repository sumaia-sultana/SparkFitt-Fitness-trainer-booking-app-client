import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';

const AddForum = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      return Swal.fire('Error', 'All fields are required.', 'warning');
    }

    const forumData = {
      ...formData,
      name: user?.displayName || 'Anonymous',
      photo: user?.photoURL || '',
      email: user?.email,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/forums', forumData);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Forum created successfully!', 'success');
        setFormData({ title: '', content: '' });
        navigate("/community")
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong while adding forum.', 'error');
    }
  };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-[#064877] mb-6">Create New Forum</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* User Info (readonly) */}
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-12 h-14 rounded-md object-cover"/>
          <div className=''>
            <input
            type="text"
            value={user?.displayName}
            readOnly
            className="bg-gray-100 text-gray-700 px-3 py-0.5 rounded w-full"/>
            <input
            type="email"
            value={user?.email}
            readOnly
            className="bg-gray-100 text-gray-700 px-3 py-0.5 rounded w-full"/>
            
          </div>
           
        </div>

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter forum title"/>
        </div>
        {/* Category Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2">
            <option value="">Select Category</option>
            <option value="Fitness">Fitness</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">content</label>
          <textarea
            name="content"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Write forum content..."
          />
        </div>

        <button
          type="submit"
          className="bg-[#064877] hover:bg-[#0c5a99] text-white px-6 py-2 rounded">
          Post Forum
        </button>
      </form>
    </div>
    );
};

export default AddForum;
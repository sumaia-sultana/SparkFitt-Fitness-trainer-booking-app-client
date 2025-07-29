import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { imageUpload } from '../../../api/utils';

const AddClass = () => {
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: '',
    details: '',
    imageFile: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'imageFile') {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      
    setLoading(true);

    if (!formData.imageFile) {
      Swal.fire('Error', 'Please upload an image.', 'error');
      setLoading(false);
      return;
    }

    try {
      // 👉 Upload image using your custom utility
      const imageUrl = await imageUpload(formData.imageFile);

      // 👉 Prepare the new class data
      const newClass = {
        name: formData.name,
        description: formData.details,
        image: imageUrl
      };

      // 👉 Send data to backend
      const res = await axiosSecure.post('/classes', newClass);

      if (res.data.insertedId) {
        Swal.fire('Success!', 'Class added successfully!', 'success');
        setFormData({ name: '', details: '', imageFile: null });
      } else {
        throw new Error('Failed to insert');
      }

    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to add class.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-[#064877] text-center">Add New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="details"
          placeholder="Class Details"
          value={formData.details}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#064877] text-white px-4 py-2 rounded hover:bg-[#5f8cad]"
        >
          {loading ? 'Uploading...' : 'Add Class'}
        </button>
      </form>
    </div>
  );
};

export default AddClass;

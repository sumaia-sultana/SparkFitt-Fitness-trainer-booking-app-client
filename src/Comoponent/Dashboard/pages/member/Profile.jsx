import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import LoadSpinner from '../../../Shared/LoadSpinner';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
     const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [file, setFile] = useState(null);
 

  // Fetch user profile info from backend
  const { data: userInfo = {}, isPending, refetch } = useQuery({
  enabled: !!user?.email, // only run when user is available
  queryKey: ['user-profile', user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/${user.email}`);
    return res.data;
  },
});

  // ✅ Set initial name & photoURL from backend/user
  useEffect(() => {
    if (user && userInfo) {
      setName(userInfo.name || user.displayName || '');
      setPhotoURL(userInfo.photo || user.photoURL || '');
    }
  }, [user, userInfo]);


  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let uploadedPhotoURL = photoURL;
 

      // Update in your backend database
      await axiosSecure.patch(`/users/${user.email}`, {
        name,
        photo: uploadedPhotoURL,
      });

      Swal.fire('Success', 'Profile updated successfully!', 'success');
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading && isPending || !user ) return <LoadSpinner />;

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 rounded-2xl shadow-lg bg-white space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Profile</h2>

      <div className="flex items-center gap-4">
        <img
          src={file ? URL.createObjectURL(file) : photoURL || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-28 rounded-full object-cover "
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="text"
          value={user.email}
          readOnly
          className="w-full border bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"/>
      </div>

      <div>
        <label className="block font-medium mb-1">Last Login</label>
        <input
          type="text"
          value={new Date(user.metadata.lastSignInTime).toLocaleString()}
          readOnly
          className="w-full border bg-gray-100 rounded-lg px-3 py-2"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-[#064877] text-white py-2 rounded-lg hover:bg-[#6b9dc1] transition">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
    );
};

export default Profile;
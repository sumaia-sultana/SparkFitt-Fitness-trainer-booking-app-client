import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadSpinner from '../../../Shared/LoadSpinner';

const AllSubscribers = () => {
     const [subscribers, setSubscribers] = useState([]);
     const [loading, setLoading] = useState(true);
      const axiosSecure = useAxiosSecure();
  
  useEffect(() => {
    axiosSecure.get('/subscribers')
      .then((res) => {
        setSubscribers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching subscribers:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) return <div className="text-center mt-10"><LoadSpinner/> </div>;

    return (
       <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Newsletter Subscribers</h2>
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left">#</th>
            <th className="px-4 py-2 border-b text-left">MongoDB ID</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((sub, index) => (
            <tr key={sub._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b text-blue-600">{sub._id}</td>
              <td className="px-4 py-2 border-b">{sub.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default AllSubscribers;
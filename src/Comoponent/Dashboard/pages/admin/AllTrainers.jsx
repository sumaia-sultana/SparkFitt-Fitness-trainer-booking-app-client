import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllTrainers = () => {
    const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch all trainers
  useEffect(() => {
    axiosSecure.get('/trainers') // assumes you have a route to get only trainers
      .then(res => {
        setTrainers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // Remove trainer (set role to member)
  const handleRemoveTrainer = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will lose Trainer privileges.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove trainer!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/trainers/remove/${id}`)
          .then(res => {
            if (res.data.modifiedCount > 0) {
              setTrainers(prev => prev.filter(trainer => trainer._id !== id));
              Swal.fire('Removed!', 'Trainer has been demoted to Member.', 'success');
            }
          })
          .catch(err => {
            console.error(err);
            Swal.fire('Error', 'Failed to remove trainer.', 'error');
          });
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
         <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#3624bf] mb-6">All Trainers</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded p-4">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">#</th>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer, index) => (
              <tr key={trainer._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{trainer.name}</td>
                <td className="px-4 py-2 border-b">{trainer.email}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleRemoveTrainer(trainer._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"  >
                    Remove Trainer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllTrainers;
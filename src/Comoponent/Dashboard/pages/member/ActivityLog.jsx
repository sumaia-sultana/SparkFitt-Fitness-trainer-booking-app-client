import React, { useState } from 'react';
import LoadSpinner from '../../../Shared/LoadSpinner';
import ErrorPage from '../../../../Pages/ErrorPage';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import { Modal } from 'flowbite-react';

const ActivityLog = () => {
    const axiosSecure = useAxiosSecure();
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: applicants = [], isLoading, isError } = useQuery({
    queryKey: ['trainerApplications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/:id');
      return res.data;
    },
  });

  const filteredApplicants = applicants.filter(
    (user) => user.status === 'pending' || user.status === 'rejected'
  );

  if (isLoading) return <LoadSpinner />;
  if (isError) return <ErrorPage />;

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback('');
  };

    return (
         <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Activity Log</h2>

      {filteredApplicants.length === 0 ? (
        <p>No pending or rejected trainer applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((user) => (
                <tr key={user._id} className="border-b">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td
                    className={`font-semibold ${
                      user.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                    }`}
                  >
                    {user.status}
                  </td>
                  <td>
                    {user.status === 'rejected' && (
                      <button
                        onClick={() => openModal(user.rejectionMessage || 'No feedback provided')}
                        className="text-blue-600 hover:text-blue-800">
                        <FaEye />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h3 className="text-lg font-bold mb-2">Rejection Feedback</h3>
          <p>{selectedFeedback}</p>
        </Modal>
      )}
    </div>
    );
};

export default ActivityLog;
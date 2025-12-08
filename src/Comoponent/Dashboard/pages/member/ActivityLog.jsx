import React, { useState } from 'react';
import LoadSpinner from '../../../Shared/LoadSpinner';
import ErrorPage from '../../../../Pages/ErrorPage';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Modal } from 'flowbite-react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';
 

const ActivityLog = () => {
    const axiosSecure = useAxiosSecure();
  const [selectedFeedback, setSelectedFeedback] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
   const { user, loading: authLoading } = useAuth();
   const { role, roleLoading   } = useRole();
   const [isModalOpen, setIsModalOpen] = useState(false);
      const [feedback, setFeedback] = useState(false);
   const {
    data: userApplication = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userActivity', user?.email],
    enabled:
      !!user?.email &&
      
      
      !authLoading &&
      !roleLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/activity-log/${user.email}`);
      return res.data?.applications  ;
    },
  });

  if (authLoading || roleLoading || isLoading) return <LoadSpinner />;
  if (isError) return <ErrorPage />;

 if (role !== 'member') {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Your Activity Log</h2>
        <p>Only members can view trainer application activity.</p>
        
      </div>
    );
  }

  // ✅ Handle no application yet
  if (!userApplication) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Your Activity Log</h2>
        <p>No trainer application found.</p>
      </div>
    );
  }

  // ✅ Always convert to array for consistent rendering
  const applicationsArray = Array.isArray(userApplication)
    ? userApplication
    : [userApplication];

  const openModal = async (id) => {
    setFeedback(true);
    setSelectedFeedback('');
    setIsModalOpen(true);

     try {
      const res = await axiosSecure.get(`/rejected-trainer/${id}`);
      setSelectedFeedback(res.data.trainer?.feedback || 'No feedback provided');
    } catch (err) {
      console.error(err);
      setSelectedFeedback('Error fetching feedback.');
    } finally {
      setFeedback(false);
    }
  };


  const closeModal = () => {
    setSelectedFeedback('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Activity Log</h2>

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
            {applicationsArray.map((member) => (
              <tr key={member._id} className="border-b text-center">
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td className={`font-semibold ${member.status === 'pending' ? 'text-yellow-500' : member.status === 'rejected' ? 'text-red-500' : 'text-green-600'}`}>
                  {member.status}
                </td>
               
                <td className='text-center justify-center items-center'>
                   <div className="flex justify-center items-center h-full">
              
                   </div>
                  {member.status === 'rejected' && (
                    <button
                      onClick={() => openModal(member._id || 'No feedback provided')}
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

      <Modal show={isModalOpen} onClose={closeModal}>
  
  <div className='m-5 p-5 border-2 rounded-md border-[#186196]'>
    <h3 className='text-xl font-semibold text-red-500'>Rejection Feedback</h3>
    {feedback ? (
      <div className="flex justify-center items-center">
        <LoadSpinner />
      </div>
    ) : (
      <p className="text-gray-800 py-2 font-mono">{selectedFeedback}</p>
    )}

    <div className='text-center  pt-10'>
    <button
      onClick={closeModal}
      className="px-4 py-2 bg-[#064877] text-white rounded-md hover:bg-[#6cb0e0]">
      Close
    </button>
  </div>
  </div>
  
</Modal>

    </div>
    );
    
};

export default ActivityLog;
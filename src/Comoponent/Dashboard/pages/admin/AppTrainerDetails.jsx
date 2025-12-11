import React, { useState } from 'react';
import Swal from 'sweetalert2';
import LoadSpinner from '../../../Shared/LoadSpinner';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Label, Modal, ModalBody, ModalHeader, Textarea } from 'flowbite-react';
 

const AppTrainerDetails = () => {
    const { id } = useParams();
     console.log(id);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
   const [feedback, setFeedback] = useState('');
 const queryClient = useQueryClient(); // ✅ Correct

  const axiosSecure = useAxiosSecure();

   const { data: trainer, isLoading, isError } = useQuery({
    queryKey: ['trainer-details', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applied-trainers/${id}`);
     
      return res.data;
      
    },
    
  });

  
  const handleApprove = async () => {
    try {
      await axiosSecure.patch(`/approve-trainer/${id}`);
      Swal.fire('Approved!', 'Trainer has been approved.', 'success');
      queryClient.invalidateQueries(['trainer-details', id]);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to approve trainer.', 'error');
    }
  };

  const handleReject = () => {
    setSelectedTrainer(trainer); // set the currently loaded trainer
    setShowModal(true);
  };

  const handleRejectSubmit = async () => {
    try {
      await axiosSecure.post(`/reject-trainer/${id}`, { feedback });
      Swal.fire('Rejected', 'Trainer has been rejected.', 'error');
      setShowModal(false);
      setFeedback('');
      navigate('/dashboard/applied-trainers');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to reject trainer.', 'error');
    }
  };

  if (isLoading) return <LoadSpinner />;
  if (isError || !trainer) return <div>  </div>;

    return (
    <div className="max-w-3xl mx-auto px-4 py-8">
  <h2 className="text-2xl font-bold text-[#3624bf] mb-6">Trainer Application Details</h2>

  <div className=" rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
    {/* Trainer Photo */}
    <div className="flex-shrink-0">
      <img
        src={trainer.photo || 'https://via.placeholder.com/100'}
        alt={trainer.name}
        className="w-32 h-32 rounded-full object-cover border-2  "
      />
    </div>

    {/* Trainer Info */}
    <div className="flex-1 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold  ">{trainer.name}</h3>
        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
          {trainer.status || 'Pending'}
        </span>
      </div>
      <div className=" space-y-2">
        <p><span className="font-semibold">Email:</span> {trainer.email}</p>
        <p><span className="font-semibold">Age:</span> {trainer.age}</p>
        <p><span className="font-semibold">Skills:</span> {trainer.skills?.join(', ') || 'N/A'}</p>
        <p><span className="font-semibold">Available Days:</span> {trainer.availableDays?.join(', ') || 'N/A'}</p>
        <p><span className="font-semibold">Available Time:</span> {trainer.availableTime || 'N/A'}</p>
      </div>

      {/* Action Buttons */}
      
     <div className="flex gap-3">
     <button onClick={() => handleApprove(trainer._id)} className="btn bg-[#3624bf] text-white py-1.5 px-2 rounded-md hover:bg-[#58829f]">
        Approved
     </button>
     <button onClick={() => handleReject(trainer)} className="bg-red-700 hover:bg-red-400 btn text-white py-1 px-5 rounded-md">
       Reject
     </button>
   </div>
    </div>
  </div>
        {/* --- Modal for Rejecting Trainer --- */}
      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
  <ModalHeader />
  <ModalBody>
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900">Reject Trainer</h3>

      {selectedTrainer && (
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Name:</strong> {selectedTrainer.name}</p>
          <p><strong>Email:</strong> {selectedTrainer.email}</p>
          <p><strong>Skills:</strong> {selectedTrainer.skills?.join(", ")}</p>
        </div>
      )}

      <div>
        <div className="mb-2 block">
          <Label htmlFor="feedback" value="Rejection Feedback" />
        </div>
        <Textarea
          id="feedback"
          placeholder="Write your feedback here..."
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required/>
      </div>

      <div className="flex justify-end gap-2">
        <Button color="gray" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button color="failure" onClick={handleRejectSubmit}>
          Submit
        </Button>
      </div>
    </div>
  </ModalBody>
</Modal>
</div>

  ); 
};

export default AppTrainerDetails;
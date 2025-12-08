import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadSpinner from '../../../Shared/LoadSpinner';
import Swal from 'sweetalert2';
 

const BookedTrainer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);


  const { data: bookedTrainers = [], isLoading, isError } = useQuery({
    queryKey: ['bookedTrainers', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data.filter(booking => booking.userEmail === user.email); // Assuming this returns an array of booked slots
    }
  });

  const handleReviewOpen = (trainer) => {
    setSelectedTrainer(trainer);
    setFeedback('');
    setRating(0);
    setIsReviewOpen(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!feedback || rating === 0) {
      Swal.fire('Warning', 'Please provide both feedback and rating.', 'warning');
      return;
    }
    setSubmitting(true);
    try {
       const reviewData = {
        trainerName: selectedTrainer.trainerName, // ✅ Use name instead of email/id
        userName: user.displayName,
        userEmail: user.email,
        feedback,
        rating,
        date: new Date()// Match backend's expected "date" field
    };

        await axiosSecure.post('/reviews', reviewData);

      Swal.fire('Thank you!', 'Your review has been submitted.', 'success');
      setIsReviewOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to submit review.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <LoadSpinner />;
  if (isError) return <div>Error loading bookings.</div>;

  if (bookedTrainers.length === 0) {
    return <div className="text-center  p-10">
    <h1 className='text-red-500 text-xl font-mono font-semibold'>No bookings yet!</h1>
    <p className='text-[#064877] font-bold font-mono text-2xl'>Make your first book now!!</p>
    </div>;
  }

    return (
         <div className="lg:p-6">
      <h2 className="text-xl font-bold mb-4">Your Booked Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookedTrainers.map((booking) => (
          <div
            key={booking._id}
            className="border rounded lg:p-4 p-3 shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-1">{booking.trainerName}</h3>
            <p><strong>Slot:</strong> {booking.slotName}</p>
            <p><strong>Package:</strong> {booking.packageName}</p>
            <p><strong>Price:</strong> ${booking.price}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
           
            <button
              onClick={() => handleReviewOpen(booking)}
              className="mt-4 bg-[#064877] text-white px-4 py-2 rounded hover:bg-[#064877]">
              Review
            </button>
          </div>
        ))}
      </div>
         {/* Review Modal */}
    {isReviewOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <label className="block mb-2 font-medium">Your Feedback</label>
        <textarea
          rows="4"
          className="w-full border rounded-lg px-3 py-2 mb-4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />

        <div className="flex items-center mb-4 gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl cursor-pointer ${
                star <= rating ? 'text-yellow-400' : 'text-gray-400'
              }`}>
              ★
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsReviewOpen(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm" >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded bg-[#064877] text-white hover:bg-[#6c9ec2] text-sm"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
    );
};

export default BookedTrainer;
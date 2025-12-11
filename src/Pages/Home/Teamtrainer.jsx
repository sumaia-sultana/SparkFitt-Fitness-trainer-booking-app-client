import React from 'react';
import useAxiosSecure from '../../Comoponent/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadSpinner from '../../Comoponent/Shared/LoadSpinner';

const Teamtrainer = ({reviews}) => {
    const axiosSecure = useAxiosSecure();

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/team-trainers');
      return res.data;
    }
  });
   if (!reviews || !Array.isArray(reviews)) {
    return null;  
  }

  if (isLoading) return <LoadSpinner />;
  if (isError) return <p className="text-red-500 text-center">Failed to load trainers</p>;

  
  // Compute average rating for each trainer
  const trainersWithRatings = trainers.map(trainer => {
    const trainerReviewData = reviews.find(
      r => r.trainerName?.trim().toLowerCase() === trainer.name?.trim().toLowerCase()
    );
    const trainerReviews = trainerReviewData?.reviews || [];
    const avgRating =
      trainerReviews.length > 0
        ? trainerReviews.reduce((sum, r) => sum + Number(r.rating), 0) / trainerReviews.length
        : 0;
    return { ...trainer, avgRating, trainerReviews };
  });

   // Sort trainers by avgRating descending (highest rating first)
   const topTrainers = trainersWithRatings.sort((a, b) => b.avgRating - a.avgRating);

  
    return (
        <section className="py-12 light:bg-gray-100">
      <h2 className="text-3xl font-bold text-[#3624bf] text-center mb-8">Meet Our Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
        {topTrainers.slice(0,3).map((trainer) => {
     
         return(
           <div key={trainer._id} className="light:bg-white shadow-md rounded-lg p-6 text-center">
            <img
              src={trainer.photo}
              alt={trainer.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{trainer.name}</h3>
                
                  <div  
                  className="text-yellow-400">
                      {'⭐'.repeat(Math.round(trainer.avgRating))}</div>
              
               
              <p className="text-sm">
              <strong>Experience:</strong> {trainer.experience }
            </p>
            {Array.isArray(trainer.skills) && trainer.skills.length > 0 ? (
  <div className="flex flex-wrap gap-2 justify-center my-2">
    {trainer.skills.map((skill, i) => (
      <button
        key={i}
        className="px-3 py-1 bg-green-100 text-green-500 rounded-full text-sm"
      >
        {skill.split(' ')[0]} {/* takes only the first word */}
      </button>
    ))}
  </div>
) : (
  <span className="text-gray-500 text-sm">No bio provided</span>
)}
     </div>
         )
})}
      </div>
    </section>
    );
};

export default Teamtrainer;
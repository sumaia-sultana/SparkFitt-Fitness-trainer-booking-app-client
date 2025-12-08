import React from 'react';
import useAxiosSecure from '../../Comoponent/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadSpinner from '../../Comoponent/Shared/LoadSpinner';

const Teamtrainer = () => {
    const axiosSecure = useAxiosSecure();

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/team-trainers');
      return res.data;
    }
  });

  if (isLoading) return <LoadSpinner />;
  if (isError) return <p className="text-red-500 text-center">Failed to load trainers</p>;

    return (
        <section className="py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
        {trainers.slice(0, 3).map((trainer) => (
          <div key={trainer._id} className="bg-white shadow-md rounded-lg p-6 text-center">
            <img
              src={trainer.photo}
              alt={trainer.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{trainer.name}</h3>
            <p className="text-sm text-gray-600 my-2">{trainer.skills || 'No bio provided'}</p>
            <p className="text-sm text-gray-800">
              <strong>Experience:</strong>   {trainer.experience }
            </p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default Teamtrainer;
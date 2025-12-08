import { Carousel } from 'flowbite-react';
 
import ReviewCard from './ReviewCard';
import useAxiosSecure from '../../Comoponent/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const Review = () => {
    const axiosSecure = useAxiosSecure()
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
      return res.data;
    }
  });
  const slides = useMemo(() => {
   
  const allReviews = reviews.flatMap(trainerReview => {
    if (!Array.isArray(trainerReview.reviews)) return [];
    return trainerReview.reviews.map(singleReview => ({
      ...singleReview,
      trainerName: trainerReview.trainerName,
      trainerPhoto: trainerReview.trainerPhoto,
      trainerEmail: trainerReview.trainerEmail
    }));
  });


  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  return chunkArray(allReviews, 3); // 3 per slide
}, [reviews]);

 
if (isLoading) return <p className="text-center mt-4">Loading reviews...</p>;
  if (isError) return <p className="text-center mt-4">Failed to load reviews.</p>;
  if (!reviews.length) return <p className="text-center mt-4">No reviews available.</p>;

    return (
    <div className="w-full max-w-6xl mx-auto mt-28 mb-28 z-10 relative">
    <Carousel slideInterval={7000} className="rounded-lg">
      {slides.map((group, index) => (
        <div
          key={index}
          className="flex gap-6 justify-center items-stretch px-6 py-8"
        >
          {group.map((review) => (
            <ReviewCard key={`${review.trainerName}-${review._id}`} review={review} />
          ))}
        </div>
      ))}
    </Carousel>
  </div>
    );
};

export default Review;
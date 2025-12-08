import React from 'react';

const ReviewCard = ({ review }) => {
    console.log({ review });
    
     if (!review) return null; // or show a fallback component

  const { trainerName,
    trainerPhoto,
    
   rating = 0,
 
      } = review;

    return (
        <div className="bg-white shadow-md my-10 rounded-lg p-4 w-full flex-shrink-0 max-w-sm">
      <div className=" items-center gap-3 mb-2">
        <img
          src={trainerPhoto}
          alt={trainerName}
          className="w-24 h-24 rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{trainerName}</h3>
           
        </div>
      </div>
       
      <div className="text-yellow-400">{'⭐'.repeat(Number(rating))}</div>
    </div>
    );
};

export default ReviewCard;
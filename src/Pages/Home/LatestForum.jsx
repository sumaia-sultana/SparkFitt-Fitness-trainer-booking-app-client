import React from 'react';
import useAxiosSecure from '../../Comoponent/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import LoadSpinner from '../../Comoponent/Shared/LoadSpinner';
import { CiCalendar } from "react-icons/ci";

const LatestForum = () => {
    const axiosSecure = useAxiosSecure()
     const { data: posts = [], isLoading } = useQuery({
    queryKey: ['latestForumPosts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/forum/latest');
      return res.data;
    },
  });

  const formateDate = (isoDate) => {
    if(!isoDate) return "";
    const dateObj = new Date(isoDate);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", {month: "short"});
    const year = dateObj.getFullYear();
    return`${day} ${month}, ${year}`
    
  }

  if (isLoading) return <div><LoadSpinner/> </div>;

    return (
        <div className="  ">
      <h2 className="text-2xl text-center text-[#3624bf] font-bold mb-4"> Latest Community Posts</h2>
      <div className="px-5 py-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.slice(0, 6).map(post => (
          <div key={post._id} className="  p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{post.content?.slice(0, 80)}...</p>
            <div className='flex justify-between'>
              <Link
              to={`/forums/${post._id}`}
              className="text-blue-500 hover:underline text-sm">
               Read More
            </Link>
            <span className='text-sm flex gap-1 text-[#E8EC3A]'><CiCalendar  size={18} />{formateDate(post.createdAt)} </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default LatestForum;
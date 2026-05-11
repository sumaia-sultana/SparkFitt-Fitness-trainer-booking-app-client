import React from 'react';
import useAxiosSecure from '../../Comoponent/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import LoadSpinner from '../../Comoponent/Shared/LoadSpinner';
import { CiCalendar } from "react-icons/ci";
import FeaturedCls from './FeaturedCls';

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
        <div className="flex space-x-2">
          
      <div className='w-2/3 '>
        
        <h2 className="text-4xl text-center text-[#6366f1] font-bold mb-4"> Latest Community Posts</h2>
      <div className="  py-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.slice(0, 6).map(post => (
          <div key={post._id} className="bg-[#f5f5f4] border-[#d6d3d1] border dark:bg-[#2c2825] dark:border-[#3a3633]  p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-lg text-[#1e293b] dark:text-[#e2e8f0] font-semibold">{post.title}</h3>
            <p className="text-sm text-[#4b5563] dark:text-[#e2e8f0] mb-2">{post.content?.slice(0, 80)}...</p>
            <div className='flex justify-between'>
              <Link
              to={`/forums/${post._id}`}
              className="text-[#818cf8] hover:underline text-sm">
               Read More
            </Link>
            <span className='text-sm flex gap-1 text-[#6b7280] dark:text-[#d1d5db]'><CiCalendar  size={18} />{formateDate(post.createdAt)} </span>
            </div>
          </div>
        ))}
      </div>
      </div>
      <FeaturedCls/>
    </div>
    );
};

export default LatestForum;
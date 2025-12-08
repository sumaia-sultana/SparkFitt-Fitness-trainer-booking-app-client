import React from 'react';
import useAxiosSecure from '../../Comoponent/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import LoadSpinner from '../../Comoponent/Shared/LoadSpinner';

const LatestForum = () => {
    const axiosSecure = useAxiosSecure()
     const { data: posts = [], isLoading } = useQuery({
    queryKey: ['latestForumPosts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/forum/latest');
      return res.data;
    },
  });

  if (isLoading) return <p><LoadSpinner/> </p>;

    return (
        <div className="my-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl text-[#064877] font-bold mb-4"> Latest Community Posts</h2>
      <div className="px-5 py-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.slice(0, 6).map(post => (
          <div key={post._id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{post.content?.slice(0, 80)}...</p>
            <Link
              to={`/forums/${post._id}`}
              className="text-blue-500 hover:underline text-sm">
               Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
    );
};

export default LatestForum;
 
import { useParams } from 'react-router';
import useAxiosSecure from '../../Comoponent/hooks/useAxiosSecure';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadSpinner from '../../Comoponent/Shared/LoadSpinner';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import useAuth from '../../Comoponent/hooks/useAuth';

const ForumDEtails = () => {
  const user = useAuth()
    const { id } = useParams();
     const queryClient = useQueryClient(); 
  const axiosSecure = useAxiosSecure();

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['forum', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forums/${id}`);
      return res.data;
    },
    enabled: !!id, 
  });

   const mutation = useMutation({
    mutationFn: async ({ forumId, type }) => {
      const res = await axiosSecure.patch(`/forums/${forumId}/${type}`, {
        email: user?.email, // still send if available, but not required for logic
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['forum', id]);
    },
    onError: (err) => {
      console.error('Vote failed:', err);
    },
  });

  const handleVote = (type) => {
    mutation.mutate({ forumId: id, type });
  };


  if (isLoading) return <LoadSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

    return (
         <div className="px-4 md:px-10 py-6">
      <h1 className="text-3xl font-bold text-[#3624bf] mb-4">{post.title}</h1>
      <p className="text-gray-700 leading-relaxed">{post.content ||  ''}</p>
      <div className="flex items-center gap-6 mt-6 text-gray-700">
        {/* Upvote */}
        <button
          onClick={() => handleVote('upvote')}
          disabled={mutation.isPending}
          className="flex items-center gap-2 text-green-600 hover:text-green-800 transition"
        >
          <FaArrowUp />
          <span>{post.upvotes?.length || 0}</span>
        </button>

        {/* Downvote */}
        <button
          onClick={() => handleVote('downvote')}
          disabled={mutation.isPending}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition">
          <FaArrowDown />
          <span>{post.downvotes?.length || 0}</span>
        </button>
      </div>

    </div>
    );
};

export default ForumDEtails;
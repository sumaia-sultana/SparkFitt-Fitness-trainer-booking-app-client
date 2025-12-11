 import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadSpinner from '../Shared/LoadSpinner';
import { SlBadge } from "react-icons/sl";
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query'; 
import { RiPoliceBadgeLine } from 'react-icons/ri';
 
const Community = ( ) => {

 const axiosSecure = useAxiosSecure(); // if you're using secure instance
   
  const {user} = useAuth()
    
    const formatedDate = (isoDate) => {
      if (!isoDate) return "" ;
        const dateObj = new Date(isoDate);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString("default", {month: "short"});
        const year = dateObj.getFullYear();
        return `${day} ${month} ${year}`
    }
    
    const { data: forums = [], isLoading, refetch } = useQuery({
    queryKey: ['forums'],
    queryFn: async () => {
      const res = await axiosSecure.get('/forums');
      console.log(res.data);
      return res.data;
    }
  });
      const handleVote = async (forumId, type) => {
  if (!user) {
    return Swal.fire('Login Required', 'Please log in to vote.', 'warning');
  }

  try {
    const res = await axiosSecure.patch(`/forums/${forumId}/${type}`, {
    email: user.email,
      
      
    });
    if (res.data.modifiedCount > 0) {
      Swal.fire('Success', `You ${type}d this post`, 'success');
       refetch(); 
      // Optional: refresh posts here
    }

  } catch (err) {
    console.error(err);
  }
};

  if (isLoading) return <LoadSpinner />;

    return (
    <>
          <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-">Community Forums</h2>
      
      {forums.length === 0 ? (
        <p>No forum posts found.</p>
      ) : (
        <div className="space-y-4">
          {forums.map((post) => (
  <div key={post._id} className="p-4 shadow-2xl hover:shadow-[#3624bf] rounded-2xl">
    <div>
      <h3 className="text-xl font-semibold">{post.title}</h3>
      
    </div>
    <p className="mt-2 whitespace-pre-line">{post.content}</p>
    <div className="mt-3 text-sm text-gray-500">
      Posted by <span className="font-medium">{post?.name  }
        </span> | {formatedDate(post.createdAt) }
    </div>
   {post?.role === "admin" && (
  <span className="flex items-center gap-1 text-xs text-white px-2 py-0.5 rounded-full">
    <span className=""><RiPoliceBadgeLine className="size-10 text-red-500" /></span> Admin
  </span>
)}

{post?.role === "trainer" && (
 <span className="flex items-center gap-1 text-xs text-white px-2 py-0.5 rounded-full">
    <span className=""><SlBadge   className="size-10 text-yellow-300" /></span> Trainer
  </span>
)}


    {/* Voting Buttons Per Post */}
    <div className="flex items-center gap-3 mt-4">
      <button onClick={() => handleVote(post._id, 'upvote')} className="text-green-600">
        <FaArrowUp />
      </button>
      <span>{post.upvotes?.length || 0}</span>
      <button onClick={() => handleVote(post._id, 'downvote')} className="text-red-600">
        <FaArrowDown />
      </button>
      <span>{post.downvotes?.length || 0}</span>
    </div>
     </div>
      ))}
        </div>
      )}
      
    </div>
    </>
    );
};

export default Community;
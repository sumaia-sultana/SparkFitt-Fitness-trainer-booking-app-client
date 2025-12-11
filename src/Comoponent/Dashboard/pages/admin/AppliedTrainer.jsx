 
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadSpinner from '../../../Shared/LoadSpinner';
import { Link } from 'react-router';
 
 const AppliedTrainer = () => {

  const axiosSecure = useAxiosSecure();
 
   
  const { data: trainers = [], isLoading, } = useQuery({
    queryKey: ["applied-trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applied-trainers");
      return res.data;
    },
  });


  if (isLoading) return <LoadSpinner />;
    return (
 <div className="lg:px-4 md:px-3 px-1 py-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-[#3624bf] mb-6">Applied Trainers</h2>

      {/* --- Desktop Table View --- */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full shadow-md border-gray-200">
          <thead>
            <tr className=" ">
              <th className="py-3 px-4 border-b text-left">Photo</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left">Skills</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer._id} className="border-t">
                <td className="py-3 px-4">
                  <img
                    src={trainer.photo}
                    alt={trainer.name}
                    className="w-12 h-12 rounded-full object-cover"/>
                </td>
                <td className="py-3 px-4">{trainer.name}</td>
                <td className="py-3 px-4">{trainer.email}</td>
                <td className="py-3 px-4">{trainer.skills?.join(", ")}</td>
                <td className="py-3 px-4"><span
               className={`text-xs font-semibold px-3 py-1 rounded-full 
            ${
           trainer.status === "approved"
          ? "bg-green-100 text-green-700"
          : trainer.status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}>
    {trainer.status}
        </span></td>
                <td className="py-3 px-4 flex gap-3 items-center">
                  <Link
                    to={`/dashboard/appTrainer-details/${trainer._id}`}
                    className="text-[#3624bf] py-5 hover:underline text-sm font-medium">
                    Details
                  </Link>
                   
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile Card View --- */}
      <div className="md:hidden space-y-4">
        {trainers.map((trainer) => (
          <div key={trainer._id} className="bg-white p-4 rounded-lg shadow">
            <div className=" items-center">
              <img src={trainer.photo} alt={trainer.name} className="w-16 h-16 object-cover" />
              <div>
                <h3 className="text-lg font-semibold">{trainer.name}</h3>
                <p className="text-sm text-gray-500">{trainer.email}</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-700 space-y-1">
              <p><strong>Skills:</strong> {trainer.skills?.join(', ')}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Link to={`/dashboard/appTrainer-details/${trainer._id}`}
                className="text-[#3624bf] hover:underline text-sm font-medium">
                Details
              
              </Link>
                
              
            </div>
          </div>
        ))}
      </div>


    </div>
    );
 };
 
 export default AppliedTrainer;

 
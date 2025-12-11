 
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadSpinner from '../../../Shared/LoadSpinner';
import ErrorPage from '../../../../Pages/ErrorPage';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const ManageSlot = () => {
  const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

 
  // Fetch slot using the useQuery hook
 const { data: slot = [], isLoading, error } = useQuery({
  queryKey: ['slots'],
  queryFn: async () => {
    const res = await axiosSecure.get('/slots');
    return res.data;
  }
});
 



const convertTo12HourFormat = (time24) => {
  if (!time24 || typeof time24 !== 'string' || !time24.includes(':')) {
    return 'Invalid time';
  }

  const [hour, minute] = time24.split(':');
  const h = parseInt(hour);
  if (isNaN(h)) return 'Invalid hour';

  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = ((h + 11) % 12 + 1);
  return `${hour12}:${minute} ${suffix}`;
};


  const handleToggleAvailability = async(id) => {
     try {
    const res = await axiosSecure.patch(`/slots/${id}/toggle`);
    if (res.data.modifiedCount > 0) {
         queryClient.setQueryData(['slots'], (oldData) =>
        oldData.map(slot =>
          slot._id === id ? { ...slot, available: !slot.available } : slot
        )
      );
      // Optionally refetch data or update UI locally
      Swal.fire('Updated', 'Slot availability updated!', 'success');
    } else {
      Swal.fire('No changes made', '', 'info');
    }
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'Failed to toggle availability.', 'error');
  }
  };

  const handleDelete = (_id) => {
     console.log(_id);
      Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }) .then((result) => {
      if (result.isConfirmed){
         axiosSecure.delete(`/slot/${_id}`, )
        .then(res => {
           if (res.data.deletedCount > 0) {
            Swal.fire({
            title: "Deleted!",
            text: "Slot has been removed from wishlist.",
            icon: "success"
          });
             queryClient.setQueryData(['slot'], (oldData) =>
            oldData.filter((s) => s._id !== _id)
          );
          
           } 
          
        })
        .catch(error => {
          console.error('Delete error:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete blog",
            icon: "error"
          }); 
        });
      }
    })
     
  };

  const handleEdit = (_id) => {
    navigate(`/dashboard/edit-slot/${_id}`)
  };

  
  if (isLoading) return <div><LoadSpinner/> </div>;
  
  if (error) return <div><ErrorPage/> </div>;
  const trainerSlots = slot.filter(s => s.trainerEmail === user?.email);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#3624bf]">Manage My Slot</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {trainerSlots.map((slot) => (
          <div key={slot._id} className="bg-white rounded-xl shadow-md p-4 border">
            <h3 className="text-xl font-semibold">{slot.type} Session:
              <span className='text-[#3624bf] text-lg'>{slot.slot_name} </span></h3>
            <p>
              🗓️ <strong>Date:</strong> {slot.date}
            </p>
            <p>
        🕒 <strong>Time:</strong> {convertTo12HourFormat(slot.startTime)} - {convertTo12HourFormat(slot.endTime)}
          </p>
            <p>
              📍 <strong>Location:</strong> {slot.location}
            </p>
            <p>
              👥 <strong>Participants:</strong> {slot.maxParticipants}
            </p>
            <p>
              ✅ <strong>Status:</strong> {slot.booked ? 'Booked' : 'Available'}
            </p>
            <p>
              ⚙️ <strong>Availability:</strong> {slot.available ? 'Enabled' : 'Disabled'}
            </p>
             
            <p>🎁 <strong>Package:</strong> {slot.packageType || 'N/A'}</p>
            <div className="mt-4 flex lg:justify-between justify-around gap-3">
              <button
                onClick={() => handleEdit(slot._id)}
                className=" hover:text-blue-500 text-[#3624bf] rounded flex items-center gap-1" >
                <FaEdit className='size-5' /> 
              </button>
              
              <button
      onClick={() => handleToggleAvailability(slot._id)}
      className={`btn btn-sm rounded-full text-white ${
        slot.available
          ? 'bg-[#3624bf] hover:bg-[#3624bf]'
          : 'bg-gray-500 hover:bg-gray-600'
      }`}
    >
      {slot.available ? <FaToggleOn/> : <FaToggleOff/> }
    </button>
              <button
                onClick={() => handleDelete(slot._id)}
                className=" hover:text-red-600 text-gray-600 rounded flex items-center gap-1"
              >
                <FaTrash />  
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSlot;

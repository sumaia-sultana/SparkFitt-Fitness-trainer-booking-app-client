 
import { Link, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadSpinner from '../../../Shared/LoadSpinner';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
 
// Optional: Format time helper
const convertTo12HourFormat = (timeStr) => {
  const [hour, minute] = timeStr.split(':');
  const h = parseInt(hour);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHour = h % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

const TrainerDetails = () => {
     const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const navigate = useNavigate()


  
  // Get current user info
   const { data: userInfo } = useQuery({
    queryKey: ['currentUser', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });
  

  // ✅ Fetch trainer
  const {
    data: trainer,
    isLoading: trainerLoading,
    error: trainerError,
  } = useQuery({
    queryKey: ['trainer', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ✅ Fetch all slots
  const {
    data: allSlots = [],
    isLoading: slotLoading,
    
  } = useQuery({
    queryKey: ['all-slots'],
    queryFn: async () => {
      const res = await axiosSecure.get('/slots');
      return res.data;
    },
  });

  const handleClick = (slotId) => {
    if (userInfo?.role === 'trainer') {
      Swal.fire({
        icon: 'info',
        title: 'Already a Trainer',
        text: 'You are already registered as a trainer.',
      });
    } else {
      navigate(`/booking-trainer/${slotId}`);

    }
  };

  // ✅ Filter slots for current trainer
const trainerSlots = allSlots.filter(
  (slot) => trainer?.email === slot.trainerEmail && slot.available
);


  // ✅ Loading/Error State
  if (trainerLoading || slotLoading) {
    return (
      <div className="py-10 text-center">
        <LoadSpinner />
      </div>
    );
  }

  if (trainerError || !trainer) {
    return <p className="text-center text-red-500">Trainer not found</p>;
  }

    return (
         <div>
      <div className="lg:flex mx-auto gap-3 px-10 py-5">
        {/* Left: Trainer Card */}
        <div className="bg-white w-full lg:w-1/3 shadow-md rounded-lg p-6 mb-6 lg:mb-0">
          <img
            src={trainer.photo || 'https://via.placeholder.com/200'}
            alt={trainer.name}
            className="w-64 h-64 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-[#3624bf] mb-2">{trainer.name}</h2>
            <p className="text-gray-600 mb-1"><strong>Email:</strong> {trainer.email}</p>
            <p className="text-gray-600 mb-1"><strong>Role:</strong> {trainer.role}</p>
            <p className="text-gray-600 mb-1"><strong>Experience:</strong> {trainer.experience}</p>
            <p className="text-gray-600 mb-1"><strong>Skills:</strong> {trainer.skills}</p>
            {trainer.specialty && (
              <p className="text-gray-600 mb-1"><strong>Specialty:</strong> {trainer.specialty}</p>
            )}
            {trainer.bio && (
              <p className="text-gray-700 mt-4">{trainer.bio}</p>
            )}
          </div>
        </div>

        {/* Right: Slots */}
       <div className="overflow-x-auto">
      <table className="min-w-full  border border-gray-300">
      <thead>
      <tr className="bg-[#3624bf]  ">
        <th className="py-2 px-2.5 w-32 border">Date</th>
        <th className="py-2 px-2.5 w-40 border">Time</th>
        <th className="py-2 px-2.5 w-32 border">Session Type</th>
        <th className="py-2 px-2.5 w-32 border">Class Type</th>
        <th className="py-2 px-2.5 w-32 border">Location</th>
        <th className="py-2 px-2.5 w-24 border">Package Type</th>
        <th className="py-2 px-2.5 w-40 border">Notes</th>
        <th className="py-2 px-2.5 w-32 border">Action</th>
      </tr>
      </thead>
      <tbody>
      {trainerSlots.map(slot => (
        <tr key={slot._id} className="hover:bg-gray-100">
          <td className="py-2 px-2 border text-center">{slot.date}</td>
          <td className="py-2 px-2 border text-center">
            {convertTo12HourFormat(slot.startTime)} - {convertTo12HourFormat(slot.endTime)}
          </td>
          <td className="py-2 px-1 border text-center">{slot.sessionType}</td>
          <td className="py-2 px-1 border text-center">{slot.classType}</td>
          <td className="py-2 px-1 border text-center">{slot.location}</td>
          <td className="py-2 px-1 border text-center">{slot.packageType}</td>
          <td className="py-2 px-1 border text-center">{slot.notes || '-'}</td>
          <td className="py-2 px-1 border text-center">
            <button  onClick={() => handleClick(slot._id)}
               
              className="text-white bg-[#3624bf] px-2 py-2 rounded hover:bg-[#043a5c] text-sm">
              Book Now
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      {/* CTA Button */}
      <div className="mx-auto p-10 text-center">
        <button className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[#3624bf] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
          <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#3624bf] group-hover:h-full"></span>
          <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg className="w-5 h-5 text-[#3624bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </span>
          <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </span>
          <span className="relative w-full  text-left transition-colors duration-200 ease-in-out group-hover:text-white">
            <Link to="/be-a-trainer">Be A Trainer</Link>
          </span>
        </button>
      </div>
    </div>
   
    );
};

export default TrainerDetails;


import React from 'react';
import { useQuery } from '@tanstack/react-query'; 
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadSpinner from '../../../Shared/LoadSpinner';
import {   useNavigate, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const BookingTrainer = () => {
  const { id } = useParams();
  // console.log({id});
  
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking-trainer/${id}`);
      // console.log('booking', data);
      return res.data; 
    },
  });
 
  
  const formatTo12Hour = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  let h = parseInt(hours, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${minutes} ${period}`;
};


  const packages = [
    {
      name: "Basic Membership",
      pkgName: "Basic",
      benefits: [
        "Access to gym facilities during regular operating hours.",
        "Use of cardio and strength training equipment.",
      ],
      price: 10,
    },
    {
      name: "Standard Membership",
      pkgName: "Standard",
      benefits: [
        "All benefits of the basic membership.",
        "Access to group fitness classes such as yoga, spinning, and Zumba.",
        "Access to locker rooms and showers.",
      ],
      price: 50,
    },
    {
      name: "Premium Membership",
      pkgName: "Premium",
      benefits: [
        "All benefits of the standard membership.",
        "Access to personal training sessions with certified trainers.",
        "Use of additional amenities like a sauna or steam room.",
        "Discounts on services such as massage therapy or nutrition counseling.",
      ],
      price: 100,
    },
  ];
  

  if (isLoading) return <LoadSpinner />;
  if (isError) return <p className="text-center text-red-500">Failed to load booking info.</p>;

  const {
    trainerName,
    startTime,
    endTime,
    date,
    slot_name,
    sessionType,
    classType,
    location,
    maxParticipants,
    packageType,
    classes = [],
  } = data || {};

  const classInfo = classes?.[0]; // Assuming one class is associated

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Trainer Booking</h2>

      <div className=" shadow p-4 rounded mb-6 space-y-2">
        <h1 className='text-xl ' >{slot_name} </h1>
        <p><strong>Trainer Name:</strong> {trainerName}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {formatTo12Hour(startTime)} - {formatTo12Hour(endTime)}</p>

        <p><strong>Session Type:</strong> {sessionType}</p>
        <p><strong>Class Type:</strong> {classType}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Max Participants:</strong> {maxParticipants}</p>
        
        <p><strong>Package Type:</strong> {packageType}</p>
        
      </div>

      {classInfo && (
        <div className="  shadow p-4 rounded mb-6">
          <h3 className="text-2xl font-semibold mb-2">Class Information</h3>
          <img src={classInfo.image} alt={classInfo.name} className="w-full h-64 object-cover rounded mb-4" />
          <p><strong>Class Name:</strong> {classInfo.name}</p>
          <p><strong>Description:</strong> {classInfo.description}</p>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold mb-4">Choose Your Membership Plan</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {packages.map((pkg, index) => (
            <div key={index} className="border rounded-lg shadow-sm p-4">
              <h4 className="text-xl font-bold mb-2">{pkg.name}</h4>
              <ul className="list-disc list-inside text-sm mb-3 space-y-1">
                {pkg.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
              <p className="text-lg font-semibold mb-3">Price: ${pkg.price}</p>
             <button
  className="bg-[#3624bf] text-white px-4 py-2 rounded hover:bg-[#58829f] w-full"
  onClick={() => {
    if (user?.email === data?.trainerEmail) {
      Swal.fire({
        icon: 'warning',
        title: 'Action Not Allowed',
        text: "You can't book your own slot as a trainer.",
        confirmButtonColor: '#064877',
      });
      return;
    }

     if (data?.packageType !== pkg.pkgName) {
       
      console.log(packageType);
      
      Swal.fire({
        icon: 'error',
        title: 'Package Mismatch',
        text: `This slot requires a ${data?.packageType} membership. Please select the correct package.`,
        confirmButtonColor: '#064877',
      });
      return;
    }
    navigate(`/dashboard/payment/${id}`, {
      state: {
        booking: data,
        selectedPackage: pkg,    
      },
    });
     
  }}>
    Join Now
     </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingTrainer;

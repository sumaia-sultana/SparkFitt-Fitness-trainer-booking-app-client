import   {  useState } from 'react';
import { Link, useNavigate  } from 'react-router';
import LoadSpinner from '../Shared/LoadSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {  Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

const Trainers = () => {
 
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(false);
    

   // Fetch all approved trainers
  const {
    data: trainers = [],
    isLoading: trainersLoading,
    error: trainersError
  } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/trainers');  
      return res.data;
    }
  });

  //  Fetch all slots, filtered by selected trainer
  const {
    data: slots = [],
    isLoading: slotsLoading
  } = useQuery({
    queryKey: ['slots', selectedTrainer?._id],
    queryFn: async () => {
      const res = await axiosSecure.get('/slots');
      return res.data.filter(
        (slot) => slot.trainerEmail === selectedTrainer?.email && slot.available
      );
    },
    enabled: !!selectedTrainer
  });


  if (trainersLoading) return <div><LoadSpinner/> </div>;
  if (trainersError) return <div>Error loading trainers</div>;

 const handleSlotClick = (slotId) => {
   setIsModalOpen(false);
  navigate(`/booking-trainer/${slotId}`);
};
 const handleTrainerSelect = (trainer) => {
    setSelectedTrainer(trainer);
    if (window.innerWidth < 768) {
      setIsModalOpen(true);  
    }
  };


    return (
        <div className="mb-4">
    {/*    */}
  <div className='lg:flex md:flex px-5 py-5 mx-auto h-[600px] shadow-md rounded-lg overflow-hidden'>
        {/* Left: Trainer List */}
      <div className="lg:w-1/3 md:1/3 light:bg-white overflow-y-auto ">
        <h2 className="text-2xl font-bold p-4 text-center bg-[#3624bf] text-white">Trainers</h2>
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            onClick={() => handleTrainerSelect(trainer)}
            className={`cursor-pointer p-4   flex items-center space-x-4
              ${selectedTrainer?._id === trainer._id ? 'bg-blue-100  text-gray-950 ' : ''}
            `}>
            <img
              src={trainer.photo}
              alt={trainer.name}
              className="w-18 h-24 rounded-md object-cover" />
            <div className='space-y-2'>
              <h3 className="font-semibold ">{trainer.name}</h3>
              <p className="text-sm text-gray-600"><strong>Experience:</strong> {trainer.experience}  </p>
               <button
        onClick={(e) => {
          e.stopPropagation();  
          navigate(`/trainer/${trainer._id}`);
        }}
        className="">
       
      </button>
       <Link className='px-3 py-1 text-sm bg-[#3624bf] text-white rounded  hover:bg-[#618dac]' to={`/trainer-details/${trainer._id}`}>
           Know More</Link>
            </div>
            
          </div>
        ))}
      </div>    
      {/* Right: Available Slots */}
      <div className="flex-1 p-6 text-center overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-[#3624bf]">Available Slots</h2>
       
        {!selectedTrainer &&  
        <>
        <p className='font-mono text-gray-600'>Click! & Select a trainer to view their available slots.</p>  
        <div className="mx-auto p-10 text-center">     
          <button className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[#3624bf] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
          <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#3624bf] group-hover:h-full"></span>
          <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg className="w-5 h-5 text-[#3624bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </span>
          <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </span>
          <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
            <Link to="/be-a-trainer">Be A Trainer</Link>
          </span>
        </button>
        </div>  
        </>
         
        } 

        {selectedTrainer && slotsLoading && <p>Loading slots...</p>}

        {selectedTrainer && !slotsLoading && slots.length === 0 && (
          <p>No available slots for {selectedTrainer.name}.</p>
        )}

        {selectedTrainer && slots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map((slot) => (
              <div
                key={slot._id}
                
                className="border shadow-lg  rounded-lg p-4 text-left transition">
                <p><strong>Date:</strong> {slot.date}</p>
                <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
                <p><strong>Session Type:</strong> {slot.sessionType}</p>
                <p><strong>Class Type:</strong> {slot.classType}</p>
                <p><strong>Location:</strong> {slot.location}</p>
                <p><strong>Package Type:</strong>{slot.packageType}</p>
                <button onClick={() => handleSlotClick(slot._id)} className='bg-[#3624bf] text-white px-2 py-1 rounded-md '>
                  Book Now</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal dismissible show={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
  <ModalHeader>
    <div className="flex flex-col">
      <span className="text-lg font-semibold">
        Available Slots for {selectedTrainer?.name}
      </span>
      <span className="text-sm ">{selectedTrainer?.email}</span>
    </div>
  </ModalHeader>

  <ModalBody>
    {slotsLoading && <p>Loading slots...</p>}

    {!slotsLoading && slots.length === 0 && (
      <p className="text-gray-500">No available slots for {selectedTrainer?.name}.</p>
    )}

    {!slotsLoading && slots.length > 0 && (
      <div className="space-y-4">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className="border border-gray-200 shadow rounded-lg p-4 hover:bg-blue-100  "
          >
            <p><strong>Date:</strong> {slot.date}</p>
            <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
            <p><strong>Session Type:</strong> {slot.sessionType}</p>
            <p><strong>Class Type:</strong> {slot.classType}</p>
            <p><strong>Location:</strong> {slot.location}</p>
            <p><strong>Package Type:</strong> {slot.packageType}</p>
            <button
              onClick={() => handleSlotClick(slot._id)}
              className="mt-2 w-full bg-[#3624bf] text-white   px-3 py-2 rounded-md">
              Book Now
            </button>
          </div>
        ))}
      </div>
    )}
  </ModalBody>

  <ModalFooter>
   
  </ModalFooter>
</Modal>
  </div>

    </div>
    );
};

export default Trainers;
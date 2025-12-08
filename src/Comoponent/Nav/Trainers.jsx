import   {  useState } from 'react';
import { Link, useNavigate  } from 'react-router';
import LoadSpinner from '../Shared/LoadSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

const Trainers = () => {
 
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(false);
    

   // ✅ Fetch all approved trainers
  const {
    data: trainers = [],
    isLoading: trainersLoading,
    error: trainersError
  } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/trainers'); // Should return approved trainers only
      return res.data;
    }
  });

  // ✅ Fetch all slots, filtered by selected trainer
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
      setIsModalOpen(true); // Mobile: open modal
    }
  };


    return (
        <div className=" mb-4">
    {/*    */}
  <div className='lg:flex md:flex px-5 py-5 mx-auto h-[600px] shadow-md rounded-lg overflow-hidden'>
        {/* Left: Trainer List */}
      <div className="lg:w-1/3 md:1/3 bg-white overflow-y-auto ">
        <h2 className="text-2xl font-bold p-4 text-center bg-[#064877] text-white">Trainers</h2>
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            onClick={() => handleTrainerSelect(trainer)}
            className={`cursor-pointer p-4  flex items-center space-x-4
              ${selectedTrainer?._id === trainer._id ? 'bg-blue-100' : ''}
            `}>
            <img
              src={trainer.photo}
              alt={trainer.name}
              className="w-18 h-24 rounded-md object-cover" />
            <div>
              <h3 className="font-semibold">{trainer.name}</h3>
              <p className="text-sm text-gray-600"><strong>Experience:</strong> {trainer.experience}  </p>
               <button
        onClick={(e) => {
          e.stopPropagation(); // Stop triggering card click
          navigate(`/trainer/${trainer._id}`);
        }}
        className="">
       
      </button>
       <Link className='px-3 py-1 text-sm bg-[#064877] text-white rounded hover:bg-[#618dac]' to={`/trainer-details/${trainer._id}`}>Know More</Link>
            </div>
            
          </div>
        ))}
      </div>    
      {/* Right: Available Slots */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-[#064877]">Available Slots</h2>

        {!selectedTrainer && <p>Select a trainer to view their available slots.</p>}

        {selectedTrainer && slotsLoading && <p>Loading slots...</p>}

        {selectedTrainer && !slotsLoading && slots.length === 0 && (
          <p>No available slots for {selectedTrainer.name}.</p>
        )}

        {selectedTrainer && slots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map((slot) => (
              <div
                key={slot._id}
                
                className="border border-gray-200 shadow-md rounded-lg p-4 text-left hover:bg-blue-100 transition">
                <p><strong>Date:</strong> {slot.date}</p>
                <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
                <p><strong>Session Type:</strong> {slot.sessionType}</p>
                <p><strong>Class Type:</strong> {slot.classType}</p>
                <p><strong>Location:</strong> {slot.location}</p>
                <p><strong>Package Type:</strong>{slot.packageType}</p>
                <button onClick={() => handleSlotClick(slot._id)} className='bg-[#064877] text-white px-2 py-1 rounded-md '>
                  Book Now</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal dismissible show={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
  <ModalHeader>
    <div className="flex flex-col">
      <span className="text-lg font-semibold text-[#064877]">
        Available Slots for {selectedTrainer?.name}
      </span>
      <span className="text-sm text-gray-500">{selectedTrainer?.email}</span>
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
            className="border border-gray-200 shadow rounded-lg p-4 hover:bg-blue-100 transition"
          >
            <p><strong>Date:</strong> {slot.date}</p>
            <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
            <p><strong>Session Type:</strong> {slot.sessionType}</p>
            <p><strong>Class Type:</strong> {slot.classType}</p>
            <p><strong>Location:</strong> {slot.location}</p>
            <p><strong>Package Type:</strong> {slot.packageType}</p>
            <button
              onClick={() => handleSlotClick(slot._id)}
              className="mt-2 w-full bg-[#064877] hover:bg-[#386d93] text-white px-3 py-2 rounded-md">
              Book Now
            </button>
          </div>
        ))}
      </div>
    )}
  </ModalBody>

  <ModalFooter>
    <Button color="gray" onClick={() => setIsModalOpen(false)}>
      Close
    </Button>
  </ModalFooter>
</Modal>
  </div>

    </div>
    );
};

export default Trainers;
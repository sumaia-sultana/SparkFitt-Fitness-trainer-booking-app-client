 import React, { useEffect, useState } from 'react';
 
import useAxiosSecure from '../hooks/useAxiosSecure';
import {   useQueryClient } from '@tanstack/react-query';
import LoadSpinner from '../Shared/LoadSpinner';
import { Link } from 'react-router';
 
 const Classes = () => {
  // get class ID from URL
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState('about');
   const [selectedClass, setSelectedClass] = useState(null);
   const [trainers, setTrainers] = useState([]);

   // for search and pagination
   const [searchTerm, setSearchTerm] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [classes, setClasses] = useState([]);
const [totalClasses, setTotalClasses] = useState(0);
const limit = 6;

  useEffect(() => {
  const fetchClasses = async () => {
    const res = await axiosSecure.get(`/classes?search=${searchTerm}&page=${currentPage}&limit=${limit}`);
    setClasses(res.data.classes);
    setTotalClasses(res.data.total);
  };
  fetchClasses();
}, [searchTerm, currentPage]);

   const handleClassSelect = (classItem) => {
    setSelectedClass(classItem);
    setActiveTab('about');
  };

  useEffect(() => {
  const fetchUsers = async () => {
    // Check if users are already cached
    let users = queryClient.getQueryData(['users']);

    // If not cached, fetch and store them
    if (!users) {
      const res = await axiosSecure.get('/users/trainer');
      users = res.data;
      queryClient.setQueryData(['users'], users);
    }

    // Filter only trainers
    const trainerList = users.filter(user => user.role === 'trainer');
    setTrainers(trainerList.slice(0, 5)); // max 5 trainers
  };

  fetchUsers();
}, [queryClient, axiosSecure]);

 

  // if (isLoading) return <p className="text-center py-10"><LoadSpinner/> </p>;
  // if (error) return <p className="text-center text-red-500">Error loading classes</p>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-5 py-10">
  {/* Column 1: Class Details (Image, About, Slots) */}
  <div className="bg-white shadow rounded p-6">
    {selectedClass ? (
      <>
        <div className="items-center gap-4 mb-4">
          <img src={selectedClass.image} alt={selectedClass.name} className="w-full h-[360px] rounded object-cover" />
          <h2 className="text-3xl font-bold text-[#064877] mt-4">{selectedClass.name}</h2>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4">
          <button onClick={() => setActiveTab('about')} className={`px-4 py-2 rounded ${activeTab === 'about' ? 'bg-[#064877] text-white' : 'bg-gray-200'}`}>About</button>
          <button onClick={() => setActiveTab('trainer')} className={`px-4 py-2 rounded ${activeTab === 'trainer' ? 'bg-[#064877] text-white' : 'bg-gray-200'}`}>Trainers</button>
          <button onClick={() => setActiveTab('slot')} className={`px-4 py-2 rounded ${activeTab === 'slot' ? 'bg-[#064877] text-white' : 'bg-gray-200'}`}>Available Slots</button>
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <p className="text-gray-700">{selectedClass.description}</p>
        )}

        {activeTab === 'slot' && (
          <div className="space-y-4">
            {selectedClass.slots?.length ? (
              selectedClass.slots.map((slot) => (
                <SlotCard key={slot._id} slot={slot} />
              ))
            ) : (
              <p>No slots found for this class.</p>
            )}
          </div>
        )}
      </>
    ) : (
      <p className="text-gray-500 text-center mt-20">Select a class to view details</p>
    )}
  </div>

  {/* Column 2: Trainer Cards (Visible only when "trainer" tab is selected) */}
   
   <div className='bg-white rounded flex  '>
  {activeTab === 'trainer' ? (
    <div className="grid grid-cols-1 lg:h-32 gap-6 w-full">
      {selectedClass ? (() => {
        const matching = trainers.filter(trainer =>
          trainer.specialty?.toLowerCase().includes(selectedClass.name.toLowerCase())
        );

        const displayList = matching.length > 0
          ? matching
          : [...trainers].sort(() => 0.5 - Math.random());

        return displayList.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white justify-between rounded shadow-md p-5 gap-4 hover:shadow-lg transition" >
            <div className='flex justify-between'>
                <img
              src={trainer.photo || 'https://via.placeholder.com/100'}
              alt={trainer.name}
              className=" w-24 h-28 object-cover rounded-md "/>
            <div className='ml-2'>
              <h3 className="text-xl font-semibold text-[#064877]">{trainer.name}</h3>
              <p className="text-sm text-gray-500">{trainer.email}</p>
              {trainer.specialty && (
                <p className="text-sm text-gray-400 italic">Specialty: {trainer.specialty}</p>
        )}

      <div className='mt-2'>
    <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#064877] text-white">
    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#064877] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
    <span className="relative text-[#064877] transition duration-300 group-hover:text-white ease"><Link to={`/trainer-details/${trainer._id}`} >View Details</Link> </span>
    </button>
    </div>
      </div>  
        </div >          
          </div>
        ));
      })() : (
        <div className="text-center text-gray-400    justify-center items-center h-full">
          <p className="text-lg font-semibold">Trainer Info</p>
          <p className="mt-2 text-sm">
            Select a class to view matched trainers.
          </p>
        </div>
      )}
    </div>
  ) : (
    <div className="p-5  ">
        <div className=" rounded-md overflow-hidden w-full">
  <img className="w-full object-cover" src="https://i.ibb.co/nX5d6P6/gym-trainer.png" alt="gym trainer" />
</div>
      <h1 className="text-2xl text-[#064877] font-bold">Our Best Trainers are always here to help you!</h1>
      <p className="mt-2 text-gray-600 font-semibold text-sm">
         Certified trainer focused on strength, mobility, and endurance. Helping clients train smart, 
         stay consistent, and feel their best.
         More than just a trainer — a transformation coach. With deep knowledge of body mechanics, functional training, 
         and nutrition, We craft personalized fitness strategies that deliver lasting results. 
         Let’s unlock your full potential with our expert trainers
      </p>
    </div>
  )}
</div>
  {/* Column 3: Class List */}
  <div>
<div>
    <input
  type="text"
  placeholder="Search classes"
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page on new search
  }}
  className="w-full h-12 px-3 py-2 border rounded mb-4"/>
   
</div>

<ul className="space-y-2">
  {classes.map((cls) => (
    <li key={cls._id}>
      <button
        onClick={() => handleClassSelect(cls)}
        className="w-full text-left px-5 font-semibold shadow-sm border border-gray-100
         text-[#064877] py-2 bg-white rounded hover:bg-gray-200">
        {cls.name}
      </button>
    </li>
  ))}
</ul>

{/* Pagination */}
<div className="flex gap-2 mt-4">
  {Array.from({ length: Math.ceil(totalClasses / limit) }, (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-[#064877] text-white' : 'bg-gray-300'}`}>
      {i + 1}
    </button>
  ))}
</div>
  </div>
</div>

 
  );
 };
 
 export default Classes;
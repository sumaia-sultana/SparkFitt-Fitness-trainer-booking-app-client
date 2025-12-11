 import  {  useState } from 'react';
 
import useAxiosSecure from '../hooks/useAxiosSecure';
import {   useQuery } from '@tanstack/react-query';
import LoadSpinner from '../Shared/LoadSpinner';
import { Link } from 'react-router';
import { Card } from 'flowbite-react';
import HelmetTitle from '../HelmetTitle';
 
 const Classes = () => {
 const axiosSecure = useAxiosSecure();

  const [activeTab, setActiveTab] = useState('about');
  const [selectedClass, setSelectedClass] = useState(null);
  const [classPage, setClassPage] = useState(1);
  const [classSearch, setClassSearch] = useState('');
  const classLimit = 6;
  const trainerLimit = 5;

  const {
    data: classData = { classes: [], total: 0 },
    isLoading: classLoading,
  } = useQuery({
    queryKey: ['classes', classSearch, classPage, classLimit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?search=${classSearch}&page=${classPage}&limit=${classLimit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const {
    data: trainers = [],
    isLoading: trainerLoading,
  } = useQuery({
    queryKey: ['approved-trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/trainer');
      return res.data.filter((user) => user.role === 'trainer' && user.status === 'approved');
    },
  });

  const handleClassSelect = (classItem) => {
    setSelectedClass(classItem);
    setActiveTab('about');
  };

  const slicedTrainers = trainers.slice(0, trainerLimit);

  const matchingTrainers = selectedClass
    ? trainers.filter((trainer) =>
        trainer.specialty?.toLowerCase().includes(selectedClass.name.toLowerCase())
      )
    : [];

  const trainerDisplayList =
    selectedClass && matchingTrainers.length > 0
      ? matchingTrainers
      : slicedTrainers;

  if (classLoading || trainerLoading) return <LoadSpinner />;

    return (
     <>
     <HelmetTitle title="Classes" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-5 py-10">
  {/* Column 1: Class Details (Image, About, Slots) */}
  <div className="bg-white shadow rounded p-6">
    {selectedClass ? (
      <>
        <div className="items-center gap-4 mb-4">
          <img src={selectedClass.image} alt={selectedClass.name} className="w-full h-[360px] rounded object-cover" />
          <h2 className="text-3xl font-bold text-[#3624bf] mt-4">{selectedClass.name}</h2>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4">
            {['about', 'trainer', 'slot'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded ${
                    activeTab === tab
                      ? 'bg-[#3624bf] text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <p className="text-gray-700">{selectedClass.description}</p>
        )}

        {activeTab === 'Available slot' && (
          <div className="space-y-4">
            {selectedClass.slots?.length ? (
              selectedClass.slots.map((slot) => (
                <Card key={slot._id} slot={slot} />
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
      <div className="bg-white rounded flex">
        {activeTab === 'trainer' ? (
          <div className="grid grid-cols-1 lg:h-32 gap-6 w-full">
            {selectedClass ? (
              trainerDisplayList.map((trainer) => (
                <div
                  key={trainer._id}
                  className="bg-white justify-between rounded shadow-md p-5 gap-4 hover:shadow-lg transition"
                >
                  <div className="flex justify-between">
                    <img
                      src={trainer.photo || 'https://via.placeholder.com/100'}
                      alt={trainer.name}
                      className="w-24 h-28 object-cover rounded-md"
                    />
                    <div className="ml-2">
                      <h3 className="text-xl font-semibold text-[#3624bf]">
                        {trainer.name}
                      </h3>
                      <p className="text-sm text-gray-500">{trainer.email}</p>
                      {trainer.specialty && (
                        <p className="text-sm text-gray-400 italic">
                          Specialty: {trainer.specialty}
                        </p>
                      )}
                      <div className="mt-2">
                        <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#3624bf] text-white">
                          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#3624bf] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                          <span className="relative text-[#3624bf] transition duration-300 group-hover:text-white ease">
                            <Link to={`/trainer-details/${trainer._id}`}>
                              View Details
                            </Link>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 justify-center items-center h-full">
                <p className="text-lg font-semibold">Trainer Info</p>
                <p className="mt-2 text-sm">
                  Select a class to view matched trainers.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-5">
            <div className="rounded-md overflow-hidden w-full">
              <img
                className="w-full object-cover"
                src="https://i.ibb.co/nX5d6P6/gym-trainer.png"
                alt="gym trainer"
              />
            </div>
            <h1 className="text-2xl text-[#3624bf] font-bold">
              Our Best Trainers are always here to help you!
            </h1>
            <p className="mt-2 text-gray-600 font-semibold text-sm">
              Certified trainer focused on strength, mobility, and endurance...
            </p>
          </div>
        )}
      </div>

      {/* Column 3: Class List */}
      <div>
        <input
          type="text"
          placeholder="Search classes"
          value={classSearch}
          onChange={(e) => {
            setClassSearch(e.target.value);
            setClassPage(1);
          }}
          className="w-full h-12 px-3 py-2 border rounded mb-4"
        />

        <ul className="space-y-2">
          {classData.classes.map((cls) => (
            <li key={cls._id}>
              <button
                onClick={() => handleClassSelect(cls)}
                className="w-full text-left px-5 font-semibold shadow-sm border border-gray-100 text-[#3624bf] py-2 bg-white rounded hover:bg-gray-200"
              >
                {cls.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 mt-4">
          {Array.from(
            { length: Math.ceil(classData.total / classLimit) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setClassPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  classPage === i + 1
                    ? 'bg-[#3624bf] text-white'
                    : 'bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
     </>

 
  );
 };
 
 export default Classes;
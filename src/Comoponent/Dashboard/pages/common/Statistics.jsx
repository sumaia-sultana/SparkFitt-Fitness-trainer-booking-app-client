import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadSpinner from '../../../Shared/LoadSpinner';
import { TbMessages, TbUsersGroup } from 'react-icons/tb';
import { IoTrendingUp } from 'react-icons/io5';
import { MdOutlineForum, MdOutlineGroups3 } from 'react-icons/md';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const Statistics = () => {
const axiosSecure = useAxiosSecure()

  const { data: stats, isLoading } = useQuery({
  queryKey: ['dashboard-stats'],
  queryFn: async () => {
    const res = await axiosSecure.get('/dashboard-stats');
    return res.data;
  }
});

const data = [
    { name: 'Members', value: stats?.totalMembers || 0 },
    { name: 'Subscribers', value: stats?.totalSubscribers || 0 },
    { name: 'Trainers', value: stats?.totalTrainers || 0 },
    { name: 'Trainees', value: stats?.totalReviews || 0 },
  ];

  const COLORS = ['#7C3AED', '#EC4899', '#10B981', '#F59E0B'];


 
 if (isLoading) return <p className="text-center mt-10"><LoadSpinner/> </p>;

    return (
         <div className="space-y-6">
    
        {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
         {/* Members */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full text-xl">
                <TbUsersGroup/>
              </div>
              <h3 className="font-semibold text-gray-600">Total Members</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats?.totalMembers || 0}</p>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <IoTrendingUp />
            <span>4.21%</span>
            <span className="text-gray-500">This Year</span>
          </div>
        </div>

        {/* Subscribers */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 text-pink-600 p-3 rounded-full text-xl">
              <MdOutlineGroups3 />
              </div>
              <h3 className="font-semibold text-gray-600">Total Subscribers</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats?.totalSubscribers || 0}</p>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <IoTrendingUp />
            <span>2.35%</span>
            <span className="text-gray-500">This Year</span>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-3 rounded-full text-xl">
              <TbMessages />
              </div>
              <h3 className="font-semibold text-gray-600">Total Reviews</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats?.totalReviews || 0}</p>
          <div className="flex items-center gap-2 text-red-500 text-sm">
           
            <span>4.75%</span>
            <span className="text-gray-500">This Year</span>
          </div>
        </div>

        {/* Forums */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full text-xl">
               <MdOutlineForum />
              </div>
              <h3 className="font-semibold text-gray-600">Total Forums</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats?.totalForums || 0}</p>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <IoTrendingUp />
            <span>0.59%</span>
            <span className="text-gray-500">This Year</span>
          </div>
        </div>
      </div>
      
      {/* Donut Chart Section */}
     <div className='bg-white items-center  justify-center rounded-xl shadow-md border border-gray-100'>
       <h1 className='text-xl font-bold text-[#064877] m-auto p-5'>Members, Trainer, Subscriber and Trainees Overview</h1> 
        
        <div className="w-full py-3 lg:w-1/2 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value">
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
    
      
     </div>
    </div>
    ); 
};

export default Statistics;
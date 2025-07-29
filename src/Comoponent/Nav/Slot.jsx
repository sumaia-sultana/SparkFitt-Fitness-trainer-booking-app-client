import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadSpinner from '../Shared/LoadSpinner';
import { Link } from 'react-router';

const Slot = () => {
    const axiosSecure = useAxiosSecure();
    
  // ✅ Convert 24-hour time format to 12-hour only if needed
  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(':');
    const h = +hour;
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour12 = ((h + 11) % 12 + 1);
    return `${hour12}:${minute} ${suffix}`;
  };

  
  
  const { data: slots = [], isLoading, error } = useQuery({
    queryKey: ['all-slots'],
    queryFn: async () => {
      const res = await axiosSecure.get('/slots');
      return res.data;
    }
  });

  if (isLoading) return <LoadSpinner />;
  
  if (
    slots.startTime &&
    !slots.startTime.includes('AM') &&
    !slots.startTime.includes('PM')
  ) {
    slots.startTime = convertTo12HourFormat(slots.startTime);
  }

  if (
    slots.endTime &&
    !slots.endTime.includes('AM') &&
    !slots.endTime.includes('PM')
  ) {
    slots.endTime = convertTo12HourFormat(slots.endTime);
  }
  if (error) return <div className="text-red-500">Failed to load slots.</div>;

    return (
  <div className="container mx-auto px-4 py-6">
  <h2 className="text-3xl font-bold mb-6 text-[#064877] text-center">Available Slots</h2>

  <div className="overflow-x-auto">
    <table className="min-w-full rounded-sm table-auto border-collapse border border-gray-200">
      <thead className="bg-[#064877] text-white">
        <tr>
          <th className="p-3 border">Class Name</th>
          <th className="p-3 border">Date</th>
          <th className="p-3 border">Time</th>
          <th className="p-3 border">Type</th>
          <th className="p-3 border">Participants</th>
          <th className="p-3 border">Direction</th>
          <th className="p-3 border">Package</th>
          <th className="p-3 border">Price</th>
          <th className="p-3 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {slots
          .filter((slot) => slot.available === true) // ✅ filter by availability
          .map((slot) => (
          <tr key={slot._id} className="text-center hover:bg-gray-50">
            <td className="p-2 border">{slot.className}</td>
            <td className="p-2 border">{slot.date}</td>
            <td className="p-2 border">{slot.startTime} - {slot.endTime}</td>
            <td className="p-2 border">{slot.classType}</td>
            <td className="p-2 border">{slot.maxParticipants}</td>
            <td className="p-2 border">{slot.notes}</td>
            <td className="p-2 border">{slot.packageType}</td>
            <td className="p-2 border">${slot.price}</td>
            <td className="p-2 border">
              <button className="text-[#064877] border border-[#064877] px-3 py-1 rounded-sm hover:bg-[#064877] hover:text-white transition">
                <Link to={`/booking-trainer/${slot._id}`} >Book Slot</Link>
              </button>
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  </div>
</div>


    );
};

export default Slot;
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import LoadSpinner from '../../../Shared/LoadSpinner';

const AddNewSlot = ( ) => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const navigate = useNavigate();
     const [slot, setSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    sessionType: '',
    classType: '',
    location: '',
    maxParticipants: '',
    notes: '',
    slot_name: '',
    package: '',
    isRecurring: false,
    trainerName: user?.displayName || "",
    trainerEmail: user?.email || "",  
  });

  // Fetch classes from backend
const { data: classes = [], isLoading, error } = useQuery({
  queryKey: ['classes'],
  queryFn: async () => {
    const res = await axiosSecure.get('/classes');
    return res.data.classes; // This must be the array
  },
});
    console.log('classes data:', classes);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setSlot({
      ...slot,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log('Submitted Slot:', slot);

  try {
    const res = await axiosSecure.post(`/slots`, slot);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Slot added successfully!",
        icon: "success",
        draggable: true,
      });
      navigate('/dashboard/manage-slots', {
        state: location.state || null,
      });
    }
  } catch (error) {
    console.error("Error creating slot:", error);
    Swal.fire({
      title: "Failed to create slot",
      text: error?.message || "Something went wrong",
      icon: "error",
    });
  }
};
    
    if (isLoading) return <p><LoadSpinner/> </p>;
  if (error) return <p>Error loading classes</p>;

    return (
        <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg p-6 rounded-xl space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-700">Create Trainer Slot</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
  <label>Trainer Name</label>
  <input type="text" value={slot.trainerName} readOnly />
</div>
<div>
  <label>Trainer Email</label>
  <input type="text" value={slot.trainerEmail} readOnly />

</div>
        <input
          type="text"
          name="slot_name"
          placeholder="Enter a name for your slot"
          value={slot.slot_name}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="date"
          name="date"
          value={slot.date}
          onChange={handleChange}
          className="input input-bordered w-full"
          required />
        <div>
  <label htmlFor="startTime" className="block mb-1 font-medium">
    Start Time
  </label>
  <input
    type="time"
    id="startTime"
    name="startTime"
    value={slot.startTime}
    onChange={handleChange}
    className="input input-bordered w-full"
    required/>
      </div>
      <div>
  <label htmlFor="startTime" className="block mb-1 font-medium">
    End Time
  </label>
  <input
    type="time"
    id="endTime"
    name="endTime"
    value={slot.endTime}
    onChange={handleChange}
    className="input input-bordered w-full"
    required/>
     </div>
 
        <select
          name="sessionType"
          value={slot.sessionType}
          onChange={handleChange}
          className="select select-bordered w-full"
          required>
          <option value="">Select Session Type</option>
          <option>One-on-One</option>
          <option>Group Class</option>
          <option>Virtual</option>
          <option>In-person</option>
        </select>
         <select
          name="classType"
          value={slot.classType}
          onChange={handleChange}
          className="select select-bordered w-full"
          required >
         <option value="">Select Class Type</option>
         {classes.map((cls) => (
        <option key={cls._id} value={cls.name}>
        {cls.name}
       </option>
          ))}
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location or Meeting Link"
          value={slot.location}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <select
        name="packageType"
        value={slot.packageType}
        onChange={handleChange}
        className="select select-bordered w-full"
        required>
        <option value="">Select Package Type</option>
        <option>Basic</option>
        <option>Standard</option>
        <option>Premium</option>
        </select>
         
        <input
          type="number"
          name="maxParticipants"
          placeholder="Max Participants"
          value={slot.maxParticipants}
          onChange={handleChange}
          className="input input-bordered w-full"/>
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={slot.notes}
          onChange={handleChange}
          className="textarea textarea-bordered w-full md:col-span-2"/>
        <label className="flex items-center gap-2 md:col-span-2">
            
          <input
            type="checkbox"
            name="isRecurring"
            checked={slot.isRecurring}
            onChange={handleChange}
            className="checkbox"/>
          Repeat Weekly
        </label>
      </div>

      <button
        type="submit"
        className="btn bg-[#064877] text-white hover:bg-[#5f8aa8] w-full"
      >
        Create Slot
      </button>
    </form>
    );
};

export default AddNewSlot;
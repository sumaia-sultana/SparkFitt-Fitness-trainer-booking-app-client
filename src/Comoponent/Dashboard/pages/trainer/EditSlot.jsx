import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const convertTo24Hour = (time12h) => {
  if (!time12h || typeof time12h !== 'string') return '';
  const [time, modifier] = time12h.split(' ');
  if (!time || !modifier) return time12h; // fallback

  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`;
};

 
const EditSlot = () => {
  const axiosSecure = useAxiosSecure();
  const slotData = useLoaderData();
  const {user} = useAuth()
  const [slot, setSlot] = useState(slotData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSlot({
      ...slot,
  
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         const { _id, ...rest } = slot;
         const updatedSlot = {
      ...rest,
      trainerName: user?.displayName,
      trainerEmail: user?.email,
    };
      const res = await axiosSecure.put(`/slots/${_id}`, updatedSlot);
      console.log(_id);


      
      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated!', 'Slot updated successfully.', 'success');
        navigate('/dashboard/manage-slots'); // or wherever you go after edit
      } else {
        Swal.fire('No changes made', '', 'info');
      }
    } catch (err) {
        console.log(err);
        
      Swal.fire('Error', 'Failed to update slot.', 'error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg p-6 rounded-xl space-y-4 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-700">Edit Trainer Slot</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input
    type="text"
    value={slot.trainerName}
    readOnly
    className="input input-bordered w-full bg-gray-100"
    placeholder="Trainer Name"
  />
  <input
    type="email"
    value={slot.trainerEmail}
    readOnly
    className="input input-bordered w-full bg-gray-100"
    placeholder="Trainer Email"/>
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
          
        />
        <input
          type="time"
          name="startTime"
         value={convertTo24Hour(slot.startTime)}

          onChange={handleChange}
          className="input input-bordered w-full"
         
        />
        <input
          type="time"
          name="endTime"
           value={convertTo24Hour(slot.endTime)}
          onChange={handleChange}
          className="input input-bordered w-full"
           
        />
         
            <select
  name="sessionType"
  value={slot.sessionType}
  onChange={handleChange}
  className="select select-bordered w-full"
  required
>
  <option value="">Select Session Type</option>
  <option>One-on-One</option>
  <option>Group Class</option>
  <option>Virtual</option>
  <option>In-person</option>
</select>

<select
  name="packageType"
  value={slot.packageType}
  onChange={handleChange}
  className="select select-bordered w-full"
  required
>
  <option value="">Select Package Type</option>
  <option>Basic</option>
  <option>Standard</option>
  <option>Premium</option>
</select>

        <input
          type="text"
          name="classType"
          placeholder="Class Type (e.g., Yoga)"
          value={slot.classType}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location or Meeting Link"
          defaultValue={slot.location}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        
        <input
          type="number"
          name="maxParticipants"
          placeholder="Max Participants"
          value={slot.maxParticipants}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={slot.notes}
          onChange={handleChange}
          className="textarea textarea-bordered w-full md:col-span-2"
        />
        <label className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            name="isRecurring"
            checked={slot.isRecurring}
            onChange={handleChange}
            className="checkbox"
          />
          Repeat Weekly
        </label>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn px-2 rounded-md btn-sm bg-gray-300 text-black"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn rounded-md px-2 py-2 bg-[#064877] text-white hover:bg-[#5f8aa8]"
        >
          Update Slot
        </button>
      </div>
    </form>
  );
};

export default EditSlot;

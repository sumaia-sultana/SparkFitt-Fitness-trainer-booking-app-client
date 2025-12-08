import Swal from 'sweetalert2';
import Select from 'react-select';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadSpinner from '../../../Shared/LoadSpinner';
import { useState, useEffect } from 'react';
import { imageUpload } from '../../../api/utils';

const BeATrainer = () => {
const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    profileImage: null,
    skills: [],
    availableDays: [],
    availableTime: '',
    experience: '',
  });

  // Convert 24hr input to 12hr format
  const formatTo12Hour = (time24) => {
    if (!time24) return '';
    const [hour, minute] = time24.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  // Set full name from user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, fullName: user.displayName }));
    }
  }, [user]);

  // Update formatted availableTime when start or end time changes
  useEffect(() => {
    const formattedStart = formatTo12Hour(startTime);
    const formattedEnd = formatTo12Hour(endTime);
    const availableTime = `${formattedStart} - ${formattedEnd}`;
    setFormData((prev) => ({ ...prev, availableTime }));
  }, [startTime, endTime]);

  const dayOptions = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
  ];

  const skillOptions = [
    'Yoga', 'Zumba',
    'LISS(Cardio, Endurance, pacing,light cycling, breathing control)',
    'HIIT(Cardio,Power-lifting, endurance, speed, timing)',
    'Endurance(Marathon, cycling, long-distance training)',
    'Group Fitness',
    'MICT (Cardio, Jogging, steady cycling)',
    'Pilates(Core Strength, Flexibility, Balance)',
    'Weightlifting'
  ];

  const handleCheckboxChange = (skill) => {
    const updated = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: updated });
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      availableDays: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.skills.length === 0) {
      return Swal.fire('Warning', 'Please select at least one skill.', 'warning');
    }

    if (!startTime || !endTime) {
      return Swal.fire('Warning', 'Please select start and end time.', 'warning');
    }

    setSubmitting(true);
    try {
      let imageUrl = '';
      if (formData.profileImage) {
        imageUrl = await imageUpload(formData.profileImage);
      }

      const trainer = {
        name: formData.fullName,
        email: user?.email,
        age: formData.age,
        photo: imageUrl,
        skills: formData.skills,
        availableDays: formData.availableDays,
        availableTime: formData.availableTime,
        experience: formData.experience,
        status: 'pending',
      };
    // console.log('Trainer data sent:', trainer);
    const response = await axiosSecure.patch('/apply-trainer', trainer);

if (!response.data?.acknowledged || response.data.modifiedCount === 0) {
  Swal.fire('Error', response.data.message || 'Update failed', 'error');
} else {
  Swal.fire('Success', 'Application submitted successfully!', 'success');

  // Reset form
  setFormData({
    fullName: '',
    age: '',
    profileImage: null,
    skills: [],
    availableDays: [],
    availableTime: '',
    experience: '',
  });
  setStartTime('');
  setEndTime('');
}

    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Spinner while loading user
  if (loading || !user) {
    return (
      <div className="text-center py-10">
        <LoadSpinner />
      </div>
    );
  }


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-[#064877]">Apply to Become a Trainer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="font-medium ">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            className="input px-5 py-2 border rounded-sm border-gray-200 input-bordered w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input  px-5 py-2 border rounded-sm border-gray-200 input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Age */}
        <div>
          <label className="font-medium">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
            className="input  px-5 py-2 border rounded-sm border-gray-200 input-bordered w-full"
          />
        </div>

        {/* Image Upload + Preview */}
        <div>
          <label className="font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
            required
            className="file-input  px-5 py-2 border rounded-sm border-gray-200 file-input-bordered w-full"
          />
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Preview"
              className="mt-2 h-24 w-24 object-cover rounded"
            />
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="font-medium">Skills</label>
          <div className="flex flex-wrap gap-3 mt-1">
            {skillOptions.map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleCheckboxChange(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div>
          <label className="font-medium">Available Days</label>
          <Select
            options={dayOptions}
            isMulti
            value={dayOptions.filter((option) => formData.availableDays.includes(option.value))}
            onChange={handleSelectChange}
            placeholder="Select days..."
            className="text-black"
          />
        </div>

        {/* Available Time */}
        <div className="flex gap-4 items-center">
  <div>
    <label className="block text-sm font-medium text-gray-700">Start Time</label>
    <input
      type="time"
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">End Time</label>
    <input
      type="time"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
      required
    />
  </div>
</div>


        {/* Additional Info */}
        <div>
          <label className="font-medium">Experience</label>
          <textarea
            className="input px-5 py-2 border rounded-sm border-gray-200 textarea-bordered w-full"
            rows="3"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn py-3 rounded-sm bg-[#064877] text-white font-semibold w-full hover:bg-[#4f738b]"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Apply'}
        </button>
      </form>
    </div>
  );
};

export default BeATrainer;

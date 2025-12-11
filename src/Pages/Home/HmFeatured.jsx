import { Card } from 'flowbite-react';

import { BsCalendarCheck } from 'react-icons/bs';
import { FaClock, FaDollarSign, FaDumbbell, FaHeart, FaUser } from 'react-icons/fa';

const features = [
  {
    title: 'Expert Trainers',
    description: 'Get guidance from certified and experienced fitness professionals.',
    icon: <FaUser className="w-8 h-8 text-blue-600" />,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Book sessions at your convenience, anytime, anywhere.',
    icon: <FaClock className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Diverse Classes',
    description: 'Choose from yoga, strength, cardio, and more.',
    icon: <FaDumbbell className="w-8 h-8 text-purple-600" />,
  },
  {
    title: 'Community Forum',
    description: 'Connect with others, ask questions, and share your journey.',
    icon: <FaHeart className="w-8 h-8 text-pink-600" />,
  },
  {
    title: 'Easy Booking',
    description: 'One-click class bookings with trainer availability.',
    icon: <BsCalendarCheck className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: 'Affordable Plans',
    description: 'Flexible pricing and packages for all budgets.',
    icon: <FaDollarSign className="w-8 h-8 text-[#E8EC3A]" />,
  },
];


const HmFeatured = () => {
    return (
         <section className="my-16 px-4 max-w-7xl  mx-auto">
      <h2 className="text-2xl text-[#3624bf] font-bold mb-10 text-center">Why Choose SparkFit?</h2>
      <div className="grid gap-6 grid-cols-1  sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl shadow hover:shadow-lg transition px-5 py-3 duration-300">
            <div className="mb-4">{feature.icon}</div>
            <h5 className="text-xl font-semibold tracking-tight ">
              {feature.title}
            </h5>
            <p className="font-normal text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default HmFeatured;
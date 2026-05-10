import { Card } from 'flowbite-react';
import { ImCoinDollar } from "react-icons/im";
import { BsCalendarCheck } from 'react-icons/bs';
import { TbUserStar, TbCalendarClock} from "react-icons/tb";
import { LuDumbbell } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiCalendarCheck } from "react-icons/pi";

 

const features = [
  {
    title: 'Expert Trainers',
    description: 'Get guidance from certified and experienced fitness professionals.',
    icon: <TbUserStar className="w-8 h-8 text-[#6b7280]" />,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Book sessions at your convenience, anytime, anywhere.',
    icon: <TbCalendarClock className="w-8 h-8 text-[#6b7280]" />,
  },
  {
    title: 'Diverse Classes',
    description: 'Choose from yoga, strength, cardio, and more.',
    icon: <LuDumbbell className="w-8 h-8 text-[#6b7280]" />,
  },
  {
    title: 'Community Forum',
    description: 'Connect with others, ask questions, and share your journey.',
    icon: <HiOutlineUserGroup className="w-8 h-8 text-[#6b7280]" />,
  },
  {
    title: 'Easy Booking',
    description: 'One-click class bookings with trainer availability.',
    icon: <PiCalendarCheck className="w-8 h-8 text-[#6b7280]" />,
  },
  {
    title: 'Affordable Plans',
    description: 'Flexible pricing and packages for all budgets.',
    icon: <ImCoinDollar className="w-8 h-8 text-[#6b7280]" />,
  },
];


const HmFeatured = () => {
    return (
         <section className="my-16 px-4  max-w-7xl  mx-auto">
      <h2 className="text-4xl mt-3 md:text-5xl text-[#6366f1] font-bold mb-10 text-center">Why Choose SparkFit?</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl bg-[#f5f5f4] dark:bg-[#2c2825] border border-[#d6d3d1] dark:border-[#3a3633] shadow hover:shadow-lg backdrop-blur-sm transition px-5 py-3 duration-300">
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
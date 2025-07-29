 import React from 'react';
 import { Banner as FlowbiteBanner } from "flowbite-react";
 import { HiArrowRight } from "react-icons/hi";
 import { motion } from 'framer-motion';
 
 
 const Banner = () => {
    return (
   <FlowbiteBanner>
      <div
        className="flex w-full min-h-[460px] flex-col justify-between border-b border-gray-200 bg-gray-50 bg-cover bg-center p-4 md:flex-row dark:border-gray-600 dark:bg-gray-700"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url('https://i.ibb.co/PGqS2hkL/banner-img.jpg')`,
        }}>
            
         <div className="max-w-xl left-24 relative text-white">
          <motion.h2
            className="mb-4 text-4xl text-[#064877] font-bold md:text-4xl"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
             SparkFit —
          {/* Where Energy Meets Results */}
          </motion.h2>
           <motion.h2
            className="mb-4 text-2xl  relative left-2 font-bold md:text-4xl"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          > 
          Where Energy Meets Results
          </motion.h2>
          <motion.h2
            className="mb-4 text-3xl relative left-4 text-[#ebc728] font-bold   md:text-4xl"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}>
           Feel the spark!!See the change...
          </motion.h2>

          <motion.p
            className="text-base relative left-6 font-semibold text-shadow-md text-shadow-[#064877] md:text-lg text-gray-100"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.75 }}>
            We believe fitness should be focused, fun, and functional. At Spark Fit, our programs are built to challenge you, our trainers are here to guide you, and our space is made to inspire you. Come as you are. Leave as your best.
          </motion.p>
        </div>
        <div className="absolute  bottom-52 left-44">
         <button className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-white border-2 border-white rounded-full hover:text-white group hover:bg-gray-50">
    <span className="absolute left-0 block w-full h-0 transition-all bg-[#0c6aad] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="relative">View Classes</span>
</button>
        </div>
      </div>
    </FlowbiteBanner>
    );
 };
 
 export default Banner;
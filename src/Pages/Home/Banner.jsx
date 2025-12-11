 import React from 'react';
 import { Banner as FlowbiteBanner } from "flowbite-react";
 
 import { motion } from 'framer-motion';
import { Link } from 'react-router';
 
 
 const Banner = () => {
    return (
      <FlowbiteBanner className="p-0 border-none"> 
      <div
        className="relative flex flex-col justify-end items-stretch w-full min-h-[500px] overflow-hidden
         bg-gray-900 text-white"
        style={{
         
          backgroundImage: `url('https://i.ibb.co/PGqS2hkL/banner-img.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
 
        }}>

        {/* Dark Overlay (similar to LUVFIT's) */}
        <div className="absolute inset-0 bg-[rgba(3,7,18,0.5)] z-[1]"></div>

        {/* Blue overlay shape on the left */}
        <div 
          className="absolute left-0 top-0 w-[60%] h-full bg-[#3624bf]/90 z-[2]"
          style={{
           
            clipPath: 'polygon(0 0, 85% 0, 65% 100%, 0% 100%)',  
          }}>
          </div>

        {/* Yellow Dotted Pattern Overlay on the right */}
        {/* Adjusted to be more prominent and match the LUVFIT style */}
        <div className="absolute right-0 bottom-0 w-[250px] h-[350px] bg-[radial-gradient(circle,#E8EC3A_12%,
        transparent_13%)] bg-[length:20px_20px] opacity-90 z-[3]"></div>
        
        {/* Text Section - Positioned lower and on the left over the blue overlay */}
        <div className="relative z-[4] flex flex-col items-start px-8 md:px-16 py-12 mb-20 max-w-[600px] 
        pointer-events-none">
          {/* BE FIT, (White, Bold, Large) */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-[6.5rem] font-black leading-none mb-2 text-white"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }} // Add shadow for better contrast like in the image
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            BE FIT,
          </motion.h1>

          {/* LIVE MORE (Yellow, Bold, Large) */}
          <motion.h2
            className="text-5xl sm:text-6xl md:text-[6.5rem] font-black leading-none text-[#E8EC3A] mb-8"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }} // Add shadow for better contrast
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            LIVE MORE
          </motion.h2>

          {/* JOIN US Button (Yellow background, Blue text) */}
          <motion.div
            className="pointer-events-auto"  
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            <Link
              to="/classes"
              className="inline-block bg-[#E8EC3A] text- [#3624bf] font-semibold text-lg px-8 py-3 rounded-sm 
              shadow-xl hover:bg-[#d8dc2f] transition-all">
              JOIN US
            </Link>
          </motion.div>
        </div>
      </div>
    </FlowbiteBanner>
 
    );
 };
 
 export default Banner;
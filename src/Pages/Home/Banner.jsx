 import React from 'react';
 
 
 import { motion } from 'framer-motion';
import { Link } from 'react-router';
 
 
 const Banner = () => {

  
    return (
 
    <section className="relative min-h-screen my-2 py-5 overflow-hidden font-sans">
      
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark base */}
        <div className="absolute inset-0  "></div>
            {/* Diagonal lines texture overlay */}
        <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.03]" 
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #e2e8f0, #e2e8f0 1px, transparent 1px, transparent 10px)' }}>

        </div>

        {/* gradient glow effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px]  blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px]  blur-[180px] rounded-full"></div>

        {/* Hero-only diagonal lines */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.08) 1px, transparent 1px, transparent 14px)",
          }}
        ></div>
      </div>

  
      {/* Hero Main */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 lg:pt-10 grid lg:grid-cols-2 items-center min-h-[85vh]">
        
        {/* Left Content */}
        <div className="space-y-10 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-6xl font-bold leading-tight"
          >
            Starts Here with Unstoppable  <span className="text-[#6366f1]">Strength, Confidence & Discipline</span> Every Day...  
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto lg:mx-0 text-lg"
          >
            Our space is designed to empower your physical, mental, and
            emotional transformation with world-class fitness programs.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
          >
            
           <a href="#_" className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
    <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
    <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Get Started</span>
    <span className="absolute inset-0 border-2 border-white rounded-full"></span>
</a>

             
          </motion.div>

          {/* Stats Cards */}
          {/* <div className="flex flex-wrap gap-6 pt-8 justify-center lg:justify-start">
            <div className="bg-gradient-to-br from-red-500 to-red-700 p-5 rounded-3xl shadow-2xl min-w-[160px]">
              <h3 className="text-3xl font-bold">20K+</h3>
              <p className="text-sm text-white/80">Happy Members</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-3xl min-w-[160px]">
              <h3 className="text-3xl font-bold">25K+</h3>
              <p className="text-sm text-gray-300">Fitness Trainings</p>
            </div>
          </div> */}
        </div>

        {/* Right Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center lg:justify-end mt-16 lg:mt-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#3730a3] to-transparent blur-3xl rounded-full"></div>

          <img
            src="/assets/gym.png"
            alt="Fitness Hero"
            className="relative z-10 object-contain drop-shadow-[0_0_80px_rgba(239,68,68,0.35)]"
          />
        </motion.div>
      </div>
    </section>
 
    );
 };
 
 export default Banner;
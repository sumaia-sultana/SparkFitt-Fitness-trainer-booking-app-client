import { Link } from "react-router";

 
const AboutUs = () => {
    return (
         <section className=" relative py-24 overflow-hidden ">
           
  {/* <!-- Background Glow --> */}

           <div class="absolute inset-0">
    <div class="absolute -top-20 -left-20 w-72 h-72 bg-[#C39E88]/20 blur-3xl rounded-full"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-[#A37764]/20 blur-3xl rounded-full"></div>
  </div>
      <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* Image */}
       <div className="w-full lg:w-1/2 reveal-left">
         <div className="relative">
          {/* <!-- Glow border --> */}
        <div class="absolute -inset-4 bg-gradient-to-r from-[#818cf8] to-[#4338ca] rounded-[2rem] blur-2xl opacity-20 animate-pulse"></div>
         <img
          src="https://i.ibb.co/LzyQVPn8/gymabout.jpg"
          alt="About SparkFit"
          className="relative w-full aspect-video lg:aspect-square object-cover rounded-[2rem] shadow-2xl 
          transition duration-500 hover:scale-105"/>
         </div>
       </div>
          

        {/* Text Content */}
        <div className="w-full lg:w-1/2 reveal-right">
          <h2 className="text-4xl leading-tight md:text-4xl py-5 font-bold text-[#6366f1] dark:text-[#818cf8]">
            About SparkFit
          </h2>
          <p className="py-2 mb-6 text-lg text-justify leading-relaxed">
            SparkFit is your all-in-one platform for personal fitness, wellness coaching, and community
            empowerment. Whether you’re just starting your journey or leveling up, our certified trainers,
            flexible scheduling, and engaging classes help you stay on track — physically and mentally.
          </p>
          <p className="text-lg  mb-6 text-justify leading-relaxed">
            Our mission is to create a supportive space where everyone feels motivated, inspired, and guided
            — no matter your fitness level. Let’s grow stronger together, one session at a time.
          </p>
             <div class="mt-8 ">
     {/* <!-- Quote --> */}
    <p class="text-2xl md:text-4xl leading-relaxed font-medium text-gray-800 dark:text-gray-200">
      “Build Unstoppable Strength, Confidence, and Discipline”
    </p> 

</div>

    <div className="py-5">
      <Link to='/trainers' className='bg-[#6366f1] rounded-md  text-white px-2 py-2'>
            Join Our Journey
          </Link>
    </div>
        </div>
      </div>
    </section>
    );
};

export default AboutUs;

 
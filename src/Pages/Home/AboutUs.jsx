import { Link } from "react-router";

 
const AboutUs = () => {
    return (
         <section className="  rounded-md ">
      <div className=" mx-auto grid md:grid-cols-2 lg:flex items-center space-x-2">
        {/* Image */}
        <img
          src="https://i.ibb.co/LzyQVPn8/gymabout.jpg"
          alt="About SparkFit"
          className="rounded-2xl shadow-lg lg:w-full h-96 max-w-lg md:max-w-xl" />

        {/* Text Content */}
        <div className="px-5 py-3  left-0">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3624bf] dark:text-[#6ba4cd]">
            About SparkFit
          </h2>
          <p className="    py-2 mb-6 text-justify leading-relaxed">
            SparkFit is your all-in-one platform for personal fitness, wellness coaching, and community
            empowerment. Whether you’re just starting your journey or leveling up, our certified trainers,
            flexible scheduling, and engaging classes help you stay on track — physically and mentally.
          </p>
          <p className="  mb-6 text-justify leading-relaxed">
            Our mission is to create a supportive space where everyone feels motivated, inspired, and guided
            — no matter your fitness level. Let’s grow stronger together, one session at a time.
          </p>

          <Link to='/trainers' className='bg-[#3624bf] rounded-md text-white px-2 py-2'>
            Join Our Journey
          </Link>
        </div>
      </div>
    </section>
    );
};

export default AboutUs;
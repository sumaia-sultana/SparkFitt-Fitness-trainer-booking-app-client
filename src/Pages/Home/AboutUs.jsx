import { Link } from "react-router";

 
const AboutUs = () => {
    return (
         <section className="bg-white dark:bg-gray-900 py-16 px-6 md:px-12">
      <div className="  mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Image */}
        <img
          src="https://i.ibb.co/LzyQVPn8/gymabout.jpg"
          alt="About SparkFit"
          className="rounded-2xl shadow-lg w-full h-96 max-w-lg md:max-w-xl" />

        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#064877] dark:text-[#6ba4cd] mb-4">
            About SparkFit
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-justify leading-relaxed">
            SparkFit is your all-in-one platform for personal fitness, wellness coaching, and community
            empowerment. Whether you’re just starting your journey or leveling up, our certified trainers,
            flexible scheduling, and engaging classes help you stay on track — physically and mentally.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-justify leading-relaxed">
            Our mission is to create a supportive space where everyone feels motivated, inspired, and guided
            — no matter your fitness level. Let’s grow stronger together, one session at a time.
          </p>

          <Link to='/trainers' className='bg-[#064877] rounded-md text-white px-2 py-2'>
            Join Our Journey
          </Link>
        </div>
      </div>
    </section>
    );
};

export default AboutUs;
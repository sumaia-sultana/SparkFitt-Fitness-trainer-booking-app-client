import {BsDribbble,BsFacebook,BsGithub,BsInstagram,BsTwitter} from "react-icons/bs";

const FooterComponent = () => {
  return (
  <footer className="w-full border-gray-200 shadow-xl hover:shadow-2xl py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid w-full sm:flex sm:justify-between md:grid md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-3">
              <img
                src="/assets/sparkfit-logo.png"
                alt="SparkFit Logo"
                className="h-8 w-8 rounded-full"
              />
              <h1 className="text-2xl font-semibold text-[#6366f1]">SparkFit</h1>
            </a>
            <p className="  
             w-64">Empowering your fitness journey with expert trainers, personalized programs, and a supportive community.</p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="uppercase text-[#6366f1] tracking-wide text-sm font-semibold mb-3">
              Navigation
            </h2>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline dark:
              ">Home</a></li>
              <li><a href="/about" className="hover:underline dark:
              ">About</a></li>
              <li><a href="/community" className="hover:underline dark:
              ">Community</a></li>
              <li><a href="/dashboard" className="hover:underline dark:
              ">Dashboard</a></li>
              <li><a href="/trainer" className="hover:underline dark:
              ">Trainer</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="uppercase text-[#6366f1] tracking-wide text-sm font-semibold mb-3">
              Legal
            </h2>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="hover:underline dark:
              ">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline dark:
              ">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200 dark:border-neutral-500"></div>

        {/* Bottom Section */}
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <p className="text-sm   dark:
          ">
            © 2025 <a href="/" className="hover:underline">SparkFit™</a>. All rights reserved.
          </p>

          {/* Icons */}
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <a href="https://facebook.com" className="  hover:text-blue-600 dark:
             dark:hover:text-white">
              <BsFacebook size={20} />
            </a>
            <a href="https://instagram.com" className="  hover:text-pink-500 dark:
             dark:hover:text-white">
              <BsInstagram size={20} />
            </a>
            <a href="https://twitter.com" className="  hover:text-blue-400 dark:
             dark:hover:text-white">
              <BsTwitter size={20} />
            </a>
            <a href="https://github.com" className="  hover:text-black dark:
             dark:hover:text-white">
              <BsGithub size={20} />
            </a>
            <a href="https://dribbble.com" className="  hover:text-pink-600 dark:
             dark:hover:text-white">
              <BsDribbble size={20} />
            </a>
          </div>
        </div>

      </div>
    </footer>

  );
};

export default FooterComponent;

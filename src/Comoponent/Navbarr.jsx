 
import { Link } from 'react-router';
import useAuth from './hooks/useAuth';
import { FaMoon } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { ThemeContext } from '../Provider/AuthProvider';
import { FiSun } from 'react-icons/fi';
 

const Navbarr = () => {
  const { user, logOut } = useAuth();
   const [isOpen, setIsOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
  const {darkMode,setDarkmode} = useContext(ThemeContext)

  return (
    <nav className="sticky  top-0 z-50 bg-white text-[#3624bf] shadow-md light:bg-gray-50 border-b
        border-gray-200 px-4 py-2">
      {/* NAV WRAPPER */}
      <div className=' flex justify-between'>
        <div className="flex justify-between items-center">
        
        {/* BRAND */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/ds1dKPKj/gym-logo.jpg"
            className="h-8 w-8 rounded-full"
            alt="SparkFit Logo"
          />
          <span className="text-[#3624bf] text-2xl font-bold">SparkFit</span>
        </Link>
   
      </div>
       <div className="hidden md:flex gap-6 mt-3">
        <Link className="text-xl" to="/">Home</Link>
        <Link className="text-xl" to="/trainers">Trainers</Link>
        <Link className="text-xl" to="/classes">Classes</Link>
        <Link className="text-xl" to="/community">Community</Link>
        <Link className="text-xl" to="/dashboard">Dashboard</Link>
      </div>
         {/* RIGHT SECTION */}
        <div className="flex items-center  gap-4 md:order-2">

          {/* DARK MODE BUTTON */}
          <button
            className="px-1 text-yellow-300"
            onClick={() => setDarkmode((m) => !m)}
          >
            {darkMode ? <FiSun size={20} /> : <FaMoon size={20} />}
          </button>

          {/* USER DROPDOWN OR LOGIN */}
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="User"
                onClick={() => setDropOpen((o) => !o)}
                className="h-10 w-10 rounded-full cursor-pointer"
              />

              {dropOpen && (
                <div className="absolute right-0 mt-2 w-48  shadow-lg rounded-lg overflow-hidden">
                  <div className="px-4 py-2 border-b border-gray-400">
                    <p className="text-sm">{user.displayName}</p>
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setDropOpen(false)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={logOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              className="hover:text--[#3624bf] relative -top-2.5 hover:border-2 
              rounded-xl lg:px-3 lg:py-2 md:px-3 md:py-2 
              hover:border--[#3624bf] bg--[#3624bf] text-white"
              to="/login"
            >
              Login
            </Link>
          )}

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen((o) => !o)}
          >
            <span className="text-3xl">☰</span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="mt-3 md:hidden flex flex-col gap-2 pb-3">
          <Link className="text-xl" to="/">Home</Link>
          <Link className="text-xl" to="/trainers">Trainers</Link>
          <Link className="text-xl" to="/classes">Classes</Link>
          <Link className="text-xl" to="/community">Community</Link>
          <Link className="text-xl" to="/dashboard">Dashboard</Link>
        </div>
      )}

      {/* DESKTOP MENU */}
     
    </nav>
  );
};

export default Navbarr;

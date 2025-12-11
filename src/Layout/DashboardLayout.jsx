 
import Sidebar from '../Comoponent/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router';
 import useAuth from '../Comoponent/hooks/useAuth';
import LoadSpinner from '../Comoponent/Shared/LoadSpinner';
 import { AiOutlineMenuFold } from "react-icons/ai";
import useRole from '../Comoponent/hooks/useRole';
import HelmetTitle from '../Comoponent/HelmetTitle';
import { useContext, useState } from 'react';
import useAxiosSecure from '../Comoponent/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { ThemeContext } from '../Provider/AuthProvider';
import { FaMoon } from 'react-icons/fa6';
import { FiSun } from 'react-icons/fi';
 

const DashboardLayout = () => {
     const {user  } = useAuth()     
     const {status } = useRole()
     const axiosSecure = useAxiosSecure();
     const {darkMode, setDarkmode} = useContext(ThemeContext);
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

     
  // Fetch role with TanStack Query
  const { data: roleData, isLoading: roleLoading } = useQuery({
    enabled: !!user?.email, // wait for email
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data; // { role: 'admin' | 'trainer' | 'member' | null }
    },
  });

      if (roleLoading) return <div className="text-center"><LoadSpinner/> </div>
      const role = roleData?.role;
  let dashboardTitle = '';

if (role === 'admin') {
  dashboardTitle = 'Admin Dashboard';
} else if (role === 'trainer' && status === 'approved') {
  dashboardTitle = 'Trainer Dashboard';
} else if (
  role === 'member' ||
  (role === 'trainer' && (status === 'rejected' || status === 'pending'))
) {
  dashboardTitle = 'Member Dashboard';
}
    
    return (
    <>
    <HelmetTitle title="Dashboard" />
     <div className=' '>
      <div className="flex min-h-screen">
        
      {!isSidebarOpen && (
    <button
      className="lg:hidden fixed top-4 left-4 bg-[#3624bf] text-white p-2 rounded-md"
      onClick={() => setIsSidebarOpen(true)}>
      <AiOutlineMenuFold />
    </button>
  )}

  {/* Sidebar for mobile */}
  <div
    className={`fixed top-0 h-full left-0  w-64  bg-[#3624bf] text-white transform ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out lg:hidden`}
  >
    <div className="flex justify-end p-4">
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="text-white text-2xl font-bold"
      >
        ×
      </button>
         
    </div>
    <Sidebar />
  </div>

        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-72 text-white">
          <Sidebar />
        </aside>
        {/* Main content area */}
        <main className="flex-1 p-4  ">
         <div className='flex px-10 lg:px-2 justify-between'>
           <h2 className="lg:text-2xl  font-bold mb-4">{dashboardTitle}</h2>
          {/* DARK MODE BUTTON */}
                <button
                  className="px-3 text-yellow-300"
                  onClick={() => setDarkmode((m) => !m)}
                >
                  {darkMode ? <FiSun size={20} /> : <FaMoon size={20} />}
                </button>
         </div>
          <Outlet />

              
        </main>
      </div>

     </div>
    </>
    );
};

export default DashboardLayout;
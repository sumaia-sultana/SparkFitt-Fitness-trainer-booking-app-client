 
import {FaHome, FaUserEdit, FaCalendarAlt, FaChalkboardTeacher, FaUserShield, FaFileAlt,
  } from "react-icons/fa";
  import { FiLogOut } from "react-icons/fi";
import { FaCalendarDays } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { RiTimeLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { Link, NavLink } from "react-router";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
 
 

const Sidebar = () => {
 
  const  {role} = useRole()
  const {logOut} = useAuth();
 
  return (
    <div className="w-64 bg-[#064877] text-white flex flex-col p-4">
     <div className="flex gap-2">
        <img className="size-7 rounded-full" src="/src/assets/spark-fit-logo.svg" ></img>
      <Link to="/" className="text-2xl  font-bold mb-8">SparkFit</Link>
     
     </div>
      
      <nav className="space-y-2">
        <h2 className="flex font-semibold px-3 gap-3 text-[#46a6ea]"><IoPersonSharp className="size-5"/> Role : {role} </h2>
        <NavLink to="/dashboard" className="flex items-center gap-3 px-3 py-2 hover:bg-[#78b0d7d2] rounded ">
          <FaHome /> Dashboard
        </NavLink>
               
        {role === 'member' && (
      <>
        <NavLink className='flex px-3 gap-3 rounded py-2 hover:bg-[#78b0d7d2]' to="/dashboard/profile"> <FaUserEdit className="size-5" /> Profile</NavLink>
        <NavLink className='flex px-3 gap-3 rounded py-2 hover:bg-[#78b0d7d2]' to="/dashboard/booked-trainer"><FaCalendarDays className="size-5" />Booked Trainer</NavLink>
        <NavLink className='flex px-3 gap-3 rounded py-2 hover:bg-[#78b0d7d2]' to="/dashboard/activity-log"><RiTimeLine className="size-5" /> Activity Log</NavLink>
      </>
    )}

        {role === "trainer" && (
          <>
            <NavLink to="/dashboard/manage-slots" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2]">
              <FaCalendarAlt /> Manage Slots
            </NavLink>
            <NavLink to="/dashboard/add-slot" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2]">
              <FaCalendarAlt /> Add New Slot
            </NavLink>
            <NavLink to="/dashboard/my-clients" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2]">
              <FaUserShield /> My Clients
            </NavLink>
          </>
        )}

        {role === "admin" && (
          <>
             
            <NavLink to="/dashboard/all-trainers" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2]">
              <FaChalkboardTeacher /> All Trainers
            </NavLink>
            <NavLink to="/dashboard/all-subscribers" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2]">
              <MdGroups />All Subscribers
            </NavLink>
            <NavLink to="/dashboard/applied-trainers" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2]">
              <FaUserShield /> Applied Trainers
            </NavLink>
            <NavLink to="/dashboard/add-class" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2]">
              <FaFileAlt /> Add Class
            </NavLink>
            <NavLink to="/dashboard/add-forum" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2]">
              <FaFileAlt /> Add Forum
            </NavLink>
            <NavLink to="/dashboard/balance" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2]">
              <FaFileAlt />Balance
            </NavLink>
          </>
        )}
      </nav>
      <button
      onClick={logOut}
      className="mt-auto flex items-center gap-3 px-3 py-2 rounded hover:bg-[#78b0d7d2] transition-colors">
       <FiLogOut className="size-5" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;

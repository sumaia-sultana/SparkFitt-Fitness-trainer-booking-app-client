  
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const DashboardNav = () => {
  const { user, logOut } = useAuth;

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div className=" items-center justify-between px-6 py-3 bg-white  ">
      {/* Left: Logo + Home */}
      <div className=" items-center gap-6">
        <Link to="/dashboard" className="text-xl text-[#064877] font-bold text-primary">
           SparkFit
        </Link>
        
      </div>

      {/* Right: Profile + Log Out */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">
          {user?.displayName}
        </span>
        <img
          src={user?.photo}
          alt="profile"
          className="w-9 h-9 rounded-full object-cover"
        />
        <button
          onClick={handleLogout}
          className="text-sm bg-primary text-white py-1.5 px-3 rounded hover:bg-primary-dark transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default DashboardNav;

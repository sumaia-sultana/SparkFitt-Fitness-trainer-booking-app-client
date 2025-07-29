 
import Sidebar from '../Comoponent/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router';
 import useAuth from '../Comoponent/hooks/useAuth';
import LoadSpinner from '../Comoponent/Shared/LoadSpinner';
 
import useRole from '../Comoponent/hooks/useRole';
 

const DashboardLayout = () => {
     const { loading } = useAuth()
     const { role } = useRole()
      if (loading) return <div className="text-center"><LoadSpinner/> </div>

    
     return (
        <div className="flex min-h-screen">
      <Sidebar /> {/* 👈 Shows links based on role */}
      <main className="flex-1 p-6">

       
        <h2 className="text-2xl font-bold">
            
          {role === 'admin' && 'Admin Dashboard'}
          {role === 'trainer' && 'Trainer Dashboard'}
          {role === 'member' && 'Member Dashboard'}
        </h2>

        <Outlet /> {/* 👈 Renders the current route inside dashboard */}
      </main>
    </div>
    );
};

export default DashboardLayout;
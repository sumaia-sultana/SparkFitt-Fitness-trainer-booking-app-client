 
import { Outlet } from 'react-router';
import Navbarr from '../Comoponent/Navbarr';
import Footer from '../Comoponent/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbarr/>
            <Outlet/>
            <Footer/>
            
        </div>
    );
};

export default MainLayout;
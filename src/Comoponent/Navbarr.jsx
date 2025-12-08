 import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';
import { Link } from 'react-router';
import useAuth from './hooks/useAuth';
 

const Navbarr = () => {
  const { user, logOut } = useAuth();

  return (
    <Navbar fluid
      rounded
      className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200"
    >
      <NavbarBrand as={Link} to="/">
         <img src="https://i.ibb.co/ds1dKPKj/gym-logo.jpg" className="mr-3 h-8 w-8 rounded-full" alt="SparkFit Logo" />
        <span className="self-center whitespace-nowrap text-[#064877] text-2xl font-bold">SparkFit</span>
      </NavbarBrand>

      <div className="flex md:order-2">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User profile"
                img={user.photoURL}
                rounded/>
            }>
            <DropdownHeader>
              <span className="block text-sm">{user.displayName}</span>
              <span className="block truncate text-sm font-medium">{user.email}</span>
            </DropdownHeader>        
            <DropdownItem as={Link} to="/dashboard/profile">Profile</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={logOut}>Logout</DropdownItem>
          </Dropdown>
        ) : (
          <NavbarLink className='hover:text-[#064877] -top-2.5 relative hover:border-2 rounded-xl lg:px-3 lg:py-2  md:px-3 md:py-2 hover:border-[#064877] bg-[#064877] text-white' as={Link} to="/login">
            Login
          </NavbarLink>
        )}
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink className='text-xl' as={Link} to="/">Home</NavbarLink>
        <NavbarLink className='text-xl' as={Link} to="/trainers">Trainers</NavbarLink>
        <NavbarLink className='text-xl' as={Link} to="/classes">Classes</NavbarLink>
        <NavbarLink className='text-xl' as={Link} to="/community">Community</NavbarLink>
        <NavbarLink className='text-xl' as={Link} to="/dashboard">Dashboard</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Navbarr;

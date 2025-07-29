import React from 'react';
import { Navigate } from 'react-router';

const ProtectedDashboardRoute = ({ allowedRole, children }) => {
     const role = localStorage.getItem('role')  // Or from context or your auth hook

  if (role !== allowedRole) {
    return <Navigate to="/" />
  }
    return children
};

export default ProtectedDashboardRoute;
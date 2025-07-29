import React from 'react';
import useAuth from '../Comoponent/hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadSpinner from '../Comoponent/Shared/LoadSpinner';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadSpinner />
  if (user) return children
  return <Navigate to='/login' state={{ from: location }} replace='true' />
};

export default PrivateRoute;
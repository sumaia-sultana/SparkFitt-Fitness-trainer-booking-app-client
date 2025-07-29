import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const MemberRoute = ({ children }) => {
     const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  if (loading || roleLoading) {
    return <div><LoadSpinner/> </div>;  // or your <Spinner />
  }

  if (user && role === 'member') {
    return children;
  }
    return (
        <Navigate to="/login" />
    );
};

export default MemberRoute;
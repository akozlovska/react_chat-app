import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoutes = () => {
  const { isAuthorized } = useUser();

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateRoutes

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const ProtectedRoute = ({ element: Component }) => {
  return isLoggedIn() ? <Component /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
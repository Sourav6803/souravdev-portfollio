// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
// //   const isAuthenticated = !!localStorage.getItem('token'); // or context-based check

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * A protected route component that checks for authentication
 * Redirects to login if not authenticated
 */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/customer/login" replace />;
  }
  
  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute; 
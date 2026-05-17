import { Navigate } from 'react-router-dom';
import { useCanteen } from '../../context/CanteenContext';

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user } = useCanteen();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

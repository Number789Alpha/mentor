import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface PrivateRouteProps {
  element: React.ReactNode;
  requiredRole?: 'mentor' | 'mentee';
}

const PrivateRoute = ({ element, requiredRole }: PrivateRouteProps) => {
  const { user } = useUser();

  // Check if user is authenticated and has valid data
  if (!user || !user.token || !user.role || !['mentor', 'mentee'].includes(user.role)) {
    // Clear invalid session data
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    return <Navigate to="/signin" replace />;
  }

  // Check if user has the required role (if specified)
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to the appropriate dashboard based on actual role
    const correctPath = user.role === 'mentor' ? '/mentor/dashboard' : '/mentee/dashboard';
    return <Navigate to={correctPath} replace />;
  }

  // Render the protected component
  return <>{element}</>;
};

export default PrivateRoute;
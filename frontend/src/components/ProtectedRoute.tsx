import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from './AuthProviderUtils';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Checks if the user is successfully logged in. If yes, it gives access to the passed in component.
 * If not, it redirects the user to the login page.
 * @param hildren The child component that needs successful user authentication
 * @returns
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

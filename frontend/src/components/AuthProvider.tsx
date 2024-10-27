import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// data that will be accessible to all the components that are wrapped in AuthProvider
// through useAuth() hook
interface AuthContextType {
  authToken: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * This function provides authentication to the given "child" component.
 * The child component is a react component that needs authentication
 * (Like accessing our home page in this case)
 * @param children - The child component that needs authentication
 * @returns - the child component with authentication context
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken')); // get authToken if it exists
  const navigate = useNavigate(); // navigate to different routes

  // async login function to send a POST request to the backend
  const login = async (email: string, password: string) => {
    // TODO: Change the endpoint URL to actual!!
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // await success response from backend
    const data = await response.json();

    // if authToken is received, set it in the state and local storage
    if (data.authToken) {
      setAuthToken(data.authToken);
      localStorage.setItem('authToken', data.authToken);
      navigate('/home');
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return <AuthContext.Provider value={{ authToken, login, logout }}>{children}</AuthContext.Provider>;
};

import { createContext, useState } from 'react';

// data that will be accessible to all the components that are wrapped in AuthProvider
// through useAuth() hook
interface AuthContextType {
  isLoggedIn: boolean;
  authToken: string | null;
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
}

// this is the type for the React components that will be wrapped in AuthProvider
// (ReactNode is a type that represents any JSX element)
interface AuthProviderProps {
  children: React.ReactNode;
}
// this is the structure of the response we get if the user successfully logs in
interface LoginSuccessResponse {
  token: string;
}
// similarly, this is the structure of the response we get if the user fails to log in
interface LoginErrorResponse {
  error: string;
}

type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
/**
 * AuthProvider wraps the entire application and provides authentication to the entire app.
 * It also provides functions for logging in and logging out.
 * When a user logs in, it checks whether the backend returns an authToken.
 * If yes, it allows the user to access whatever child component is wrapped in AuthProvider.
 * if not, the Login Form (Login.tsx) should handle the error and display it to the user.
 * @param children - The child component that needs authentication (Like our home page)
 * @returns - the child component with authentication context
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken')); // get authToken if it exists
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!authToken);

  // -- Login function to send a POST request to the backend
  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // get response from backend
    const data: LoginResponse = await response.json();

    // if authToken is received, set it in the state and local storage
    if ('token' in data) {
      setAuthToken(data.token);
      localStorage.setItem('authToken', data.token);
      setIsLoggedIn(true);
    } else {
      return data.error;
    }
  };

  // -- Logout function that revokes the user's auth token
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{ isLoggedIn, authToken, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

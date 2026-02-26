import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Use relative URL in dev (Vite proxy) or full URL from env/production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '' : 'https://dry-fruit-store.onrender.com');

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on init
    const saved = localStorage.getItem('ladakhUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('ladakhUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('ladakhUser');
    }
  }, [user]);

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
      const { user: newUser, token } = response.data;
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      let message = 'Registration failed';
      
      // Check for network/connection errors
      if (
        error.code === 'ECONNREFUSED' || 
        error.code === 'ETIMEDOUT' ||
        error.code === 'ENOTFOUND' ||
        error.message === 'Network Error' || 
        error.message?.includes('Network') ||
        error.message?.includes('timeout') ||
        !error.response
      ) {
        message = 'Cannot connect to server. Please make sure the backend server is running on port 5000.';
      } else if (error.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.message) {
        message = error.message;
      }
      
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { user: loggedInUser, token } = response.data;
      setUser(loggedInUser);
      return { success: true, user: loggedInUser };
    } catch (error) {
      console.error('Login error:', error);
      let message = 'Login failed';
      
      // Check for network/connection errors
      if (
        error.code === 'ECONNREFUSED' || 
        error.code === 'ETIMEDOUT' ||
        error.code === 'ENOTFOUND' ||
        error.message === 'Network Error' || 
        error.message?.includes('Network') ||
        error.message?.includes('timeout') ||
        !error.response
      ) {
        message = 'Cannot connect to server. Please make sure the backend server is running on port 5000.';
      } else if (error.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.message) {
        message = error.message;
      }
      
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ladakhUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



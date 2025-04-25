import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Replace with your actual API endpoint
      const response = await axios.post('/api/auth/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role); // Store user role
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Replace with your actual API endpoint
      const response = await axios.post('/api/auth/register', userData);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role); // Store user role
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    // Simulation: accept any given login data unless we integrate a backend
    // Since user wants pure local/demo we'll just store the user object
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const register = (userData) => {
    // In a real app this would go to the backend, 
    // for this demo we'll just log them in after register
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const deleteAccount = () => {
    // Clear all user-related state: user, cart, wishlist, orders
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('likedProducts');
    localStorage.removeItem('my_orders');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

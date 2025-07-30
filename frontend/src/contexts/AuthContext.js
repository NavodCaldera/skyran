import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/check`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.loggedIn && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed - Backend not available:', error);
      // Check localStorage for demo mode
      const demoUser = localStorage.getItem('skyran_demo_user');
      if (demoUser) {
        const userData = JSON.parse(demoUser);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Backend not available, using demo mode:', error);

      // Demo mode - simulate login
      if (email === 'demo@skyran.com' && password === 'demo123') {
        const demoUser = {
          id: 1,
          first_name: 'Demo',
          last_name: 'User',
          username: 'Demo User',
          email: 'demo@skyran.com',
          birthday: '1990-01-01',
          is_profile_complete: true,
          investment_experience: 'intermediate',
          risk_tolerance: 'medium'
        };

        localStorage.setItem('skyran_demo_user', JSON.stringify(demoUser));
        setUser(demoUser);
        setIsAuthenticated(true);
        return { success: true, message: 'Logged in successfully (Demo Mode)' };
      } else {
        return { success: false, error: 'Invalid credentials. Try demo@skyran.com / demo123' };
      }
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message, user: data.user };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Backend not available, using demo mode:', error);

      // Demo mode - simulate registration
      const { first_name, last_name, email } = userData;

      // Check if demo user already exists
      const existingDemo = localStorage.getItem('skyran_demo_user');
      if (existingDemo) {
        return { success: false, error: 'Demo user already exists. Try logging in with demo@skyran.com / demo123' };
      }

      // Create demo user
      const newUser = {
        id: Date.now(),
        first_name,
        last_name,
        email,
        username: `${first_name} ${last_name}`,
        birthday: userData.birthday,
        is_profile_complete: false,
        investment_experience: null,
        risk_tolerance: null
      };

      return {
        success: true,
        message: 'Account created successfully (Demo Mode)! You can now login.',
        user: newUser
      };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('skyran_demo_user');
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Backend not available, using demo mode logout:', error);
      // Demo mode logout
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('skyran_demo_user');
      return { success: true };
    }
  };

  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

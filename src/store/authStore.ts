
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthState, User } from '../types';

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

// Mock user data for demo
const MOCK_USER: User = {
  id: 1,
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'student',
  createdAt: new Date().toISOString(),
};

// Demo credentials
const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'password123'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Check if using demo credentials
        if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
          // Mock successful login
          setTimeout(() => {
            set({ user: MOCK_USER, isAuthenticated: true, isLoading: false });
            toast.success('Login successful! (Demo Mode)');
          }, 1000); // Simulate network delay
          return;
        }
        
        try {
          // Get CSRF token first
          await axios.get('/sanctum/csrf-cookie', {
            baseURL: import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000',
          });
          
          const response = await axios.post('/login', { email, password });
          const user = response.data.user;
          
          set({ user, isAuthenticated: true, isLoading: false });
          toast.success('Login successful!');
        } catch (error: any) {
          set({ isLoading: false });
          // If API is not available, show helpful message
          if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
            toast.error('Backend not available. Use demo@example.com / password123 for demo mode');
          } else {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
          }
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          await axios.get('/sanctum/csrf-cookie', {
            baseURL: import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000',
          });
          
          const response = await axios.post('/register', { 
            name, 
            email, 
            password,
            password_confirmation: password
          });
          const user = response.data.user;
          
          set({ user, isAuthenticated: true, isLoading: false });
          toast.success('Registration successful!');
        } catch (error: any) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Registration failed';
          toast.error(message);
          throw error;
        }
      },

      logout: async () => {
        try {
          await axios.post('/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ user: null, isAuthenticated: false });
          toast.success('Logged out successfully');
        }
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Axios interceptor for auth token
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().setUser(null);
      toast.error('Session expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

import { create } from 'zustand';
import { authService } from '../services/auth.service';

const safeParseUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const useAuthStore = create((set) => ({
  user: safeParseUser(),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Login failed', 
        isLoading: false 
      });
      return false;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.register(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Registration failed', 
        isLoading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  fetchProfile: async () => {
    try {
      const data = await authService.getMe();
      localStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user });
    } catch (err) {
      console.error('Failed to fetch profile', err);
    }
  },

  updateUser: (updatedUser) => {
    set((state) => {
      const mergedUser = { ...state.user, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(mergedUser));
      return { user: mergedUser };
    });
  }
}));

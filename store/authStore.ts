import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (email === 'demo@example.com' && password === 'password') {
      set({
        user: {
          id: '1',
          name: 'John Doe',
          email: 'demo@example.com',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=faces'
        },
        isAuthenticated: true
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));
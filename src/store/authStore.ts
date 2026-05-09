import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'buyer';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  favorites: number[];
  setAuth: (user: User, token: string) => void;
  toggleFavorite: (id: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  favorites: [],
  setAuth: (user, token) => {
    localStorage.setItem('estateai_token', token);
    set({ user, token, isAuthenticated: true });
  },
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id) 
      ? state.favorites.filter(fid => fid !== id) 
      : [...state.favorites, id]
  })),
  logout: () => {
    localStorage.removeItem('estateai_token');
    set({ user: null, token: null, isAuthenticated: false, favorites: [] });
  },
}));

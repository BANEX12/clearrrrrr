import { LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Header({ onLoginClick }: { onLoginClick: () => void }) {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={onLoginClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      <button className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-all">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-6 h-6 rounded-full"
        />
        <span>{user?.name}</span>
      </button>
      <button
        onClick={logout}
        className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
}
import { LucideIcon } from 'lucide-react';

interface TabButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

export function TabButton({ icon: Icon, label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
        active ? 'bg-blue-600 text-white' : 'bg-white/5 hover:bg-white/10'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );
}
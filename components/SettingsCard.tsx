import { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export function SettingsCard({ icon: Icon, title, children }: SettingsCardProps) {
  return (
    <div className="bg-white/5 p-6 rounded-xl space-y-4">
      <div className="flex items-center gap-3">
        <Icon className="text-blue-500" size={24} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
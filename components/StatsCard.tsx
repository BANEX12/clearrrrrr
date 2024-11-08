interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down';
  trendValue?: string;
}

export function StatsCard({ title, value, trend, trendValue }: StatsCardProps) {
  return (
    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
      <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {trend && trendValue && (
          <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
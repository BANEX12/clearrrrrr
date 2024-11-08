import { useState } from 'react';
import { Filter } from 'lucide-react';

export function SearchFilters() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all"
      >
        <Filter size={16} />
        Advanced Filters
      </button>
      
      {showFilters && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Date Range</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Location</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <option>All locations</option>
              <option>United States</option>
              <option>Europe</option>
              <option>Asia</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
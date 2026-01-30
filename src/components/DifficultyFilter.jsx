import React from 'react';
import { Filter } from 'lucide-react';

const difficulties = [
  { value: null, label: 'All', color: 'bg-slate-pacific', activeColor: 'bg-slate-pacific' },
  { value: 'Easy', label: 'Easy', color: 'bg-emerald-500/20 text-emerald-700', activeColor: 'bg-emerald-500 text-white' },
  { value: 'Moderate', label: 'Moderate', color: 'bg-amber-500/20 text-amber-700', activeColor: 'bg-amber-500 text-white' },
  { value: 'Hard', label: 'Hard', color: 'bg-orange-500/20 text-orange-700', activeColor: 'bg-orange-500 text-white' },
  { value: 'Strenuous', label: 'Strenuous', color: 'bg-redwood/20 text-redwood', activeColor: 'bg-redwood text-white' },
];

const DifficultyFilter = ({ activeFilter, onFilterChange }) => {
  const handleClick = (value) => {
    // If clicking the active filter, clear it (show all)
    if (value === activeFilter) {
      onFilterChange(null);
    } else {
      onFilterChange(value);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="flex items-center gap-1 text-sm text-slate-pacific font-medium">
        <Filter className="w-4 h-4" />
        Filter:
      </span>
      <div className="flex flex-wrap gap-2">
        {difficulties.map((diff) => {
          const isActive = activeFilter === diff.value;
          return (
            <button
              key={diff.label}
              type="button"
              onClick={() => handleClick(diff.value)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? `${diff.activeColor} shadow-md scale-105` 
                  : `${diff.color} hover:scale-105`
                }
                ${diff.value === null && isActive ? 'bg-forest text-white' : ''}
                ${diff.value === null && !isActive ? 'bg-foggy-dark text-slate-pacific hover:bg-forest/20' : ''}
              `}
            >
              {diff.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultyFilter;

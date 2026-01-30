import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import HikeCard from './HikeCard';
import DifficultyFilter from './DifficultyFilter';

const Journal = ({ hikes, selectedHikeId, onSelectHike, onAddHike, onEditHike, difficultyFilter, onFilterChange }) => {
  // Sort hikes by date (newest first)
  const sortedHikes = [...hikes].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-serif font-bold text-forest flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Trail Journal
        </h2>
        <button
          onClick={onAddHike}
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl
            bg-forest text-white font-medium
            hover:bg-forest-dark transition-colors duration-200
            shadow-lg hover:shadow-xl
          "
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Hike</span>
        </button>
      </div>
      
      {/* Difficulty Filter */}
      <div className="mb-4 pb-3 border-b border-foggy-dark">
        <DifficultyFilter 
          activeFilter={difficultyFilter}
          onFilterChange={onFilterChange}
        />
      </div>
      
      {/* Hike Cards */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
        {sortedHikes.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-foggy-dark flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-slate-pacific" />
            </div>
            <h3 className="font-serif font-bold text-lg text-forest mb-2">
              {difficultyFilter ? `No ${difficultyFilter} hikes yet` : 'No hikes logged yet'}
            </h3>
            <p className="text-sm text-slate-pacific mb-4">
              {difficultyFilter 
                ? `Try a different filter or add a new ${difficultyFilter.toLowerCase()} hike.`
                : 'Start your 2026 hiking journey by adding your first trail!'
              }
            </p>
            {difficultyFilter ? (
              <button
                onClick={() => onFilterChange(null)}
                className="
                  inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-slate-pacific text-white font-medium
                  hover:bg-forest transition-colors
                "
              >
                Show All Hikes
              </button>
            ) : (
              <button
                onClick={onAddHike}
                className="
                  inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-forest text-white font-medium
                  hover:bg-forest-dark transition-colors
                "
              >
                <Plus className="w-5 h-5" />
                Add Your First Hike
              </button>
            )}
          </div>
        ) : (
          sortedHikes.map((hike, index) => (
            <div 
              key={hike.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <HikeCard
                hike={hike}
                isSelected={selectedHikeId === hike.id}
                onClick={() => onSelectHike(hike.id)}
                onEdit={() => onEditHike(hike)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;

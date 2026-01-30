import React from 'react';
import { MapPin, TrendingUp, Clock, Calendar, ExternalLink, Pencil } from 'lucide-react';
import { difficultyColors } from '../data/sampleHikes';

const HikeCard = ({ hike, isSelected, onClick, onEdit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  const handleAllTrailsClick = (e) => {
    e.stopPropagation(); // Prevent card selection when clicking link
  };
  
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent card selection when clicking edit
    onEdit();
  };
  
  return (
    <div 
      className={`
        glass rounded-2xl p-5 cursor-pointer transition-all duration-300 group
        ${isSelected 
          ? 'ring-2 ring-forest shadow-xl scale-[1.02]' 
          : 'hover:shadow-lg hover:scale-[1.01]'
        }
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <h3 className="font-serif font-bold text-lg text-forest leading-tight mb-1 flex-1">
              {hike.name}
            </h3>
            <button
              onClick={handleEditClick}
              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-foggy-dark transition-all"
              title="Edit hike"
            >
              <Pencil className="w-4 h-4 text-slate-pacific hover:text-forest" />
            </button>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-pacific">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(hike.date)}
            </span>
            {hike.alltrailsUrl && (
              <a
                href={hike.alltrailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAllTrailsClick}
                className="flex items-center gap-1 text-forest hover:text-redwood transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                AllTrails
              </a>
            )}
          </div>
        </div>
        <span className={`
          px-3 py-1 rounded-full text-xs font-semibold text-white
          ${difficultyColors[hike.difficulty]}
        `}>
          {hike.difficulty}
        </span>
      </div>
      
      {/* Summary */}
      <p className="text-sm text-slate-pacific leading-relaxed mb-4">
        {hike.summary}
      </p>
      
      {/* Metrics */}
      <div className="flex items-center gap-4 pt-3 border-t border-foggy-dark">
        <div className="flex items-center gap-1.5 text-sm">
          <MapPin className="w-4 h-4 text-forest" />
          <span className="font-semibold text-forest">{hike.distance}</span>
          <span className="text-slate-pacific">mi</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <TrendingUp className="w-4 h-4 text-slate-pacific" />
          <span className="font-semibold text-forest">{hike.elevation.toLocaleString()}</span>
          <span className="text-slate-pacific">ft</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Clock className="w-4 h-4 text-redwood" />
          <span className="font-semibold text-forest">{formatDuration(hike.duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default HikeCard;

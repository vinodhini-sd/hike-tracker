import React from 'react';
import { Mountain, TrendingUp, Clock, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, unit, color }) => (
  <div className="glass rounded-2xl p-4 flex items-center gap-4 animate-fade-in-up">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-slate-pacific font-medium">{label}</p>
      <p className="text-2xl font-bold text-forest font-serif">
        {value}
        <span className="text-base font-normal text-slate-pacific ml-1">{unit}</span>
      </p>
    </div>
  </div>
);

const DifficultyBadge = ({ level, count, total }) => {
  const colors = {
    Easy: 'bg-emerald-500',
    Moderate: 'bg-amber-500',
    Hard: 'bg-orange-500',
    Strenuous: 'bg-redwood'
  };
  
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full shrink-0 ${colors[level]}`} />
      <span className="text-sm text-slate-pacific w-20">{level}</span>
      <span className="text-sm font-semibold text-forest w-6 text-right">{count}</span>
      <div className="flex-1 h-2 bg-foggy-dark rounded-full overflow-hidden">
        <div 
          className={`h-full ${colors[level]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Dashboard = ({ hikes }) => {
  // Calculate stats
  const totalMiles = hikes.reduce((sum, h) => sum + h.distance, 0).toFixed(1);
  const totalElevation = hikes.reduce((sum, h) => sum + h.elevation, 0).toLocaleString();
  const totalMinutes = hikes.reduce((sum, h) => sum + h.duration, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  
  // Count difficulties
  const difficultyCounts = hikes.reduce((acc, h) => {
    acc[h.difficulty] = (acc[h.difficulty] || 0) + 1;
    return acc;
  }, {});
  
  const difficulties = ['Easy', 'Moderate', 'Hard', 'Strenuous'];
  
  return (
    <div className="glass-dark rounded-3xl p-6 mb-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Season Stats */}
        <div>
          <h2 className="text-xl font-serif font-bold text-foggy flex items-center gap-2 mb-4">
            <Mountain className="w-5 h-5" />
            2026 Season Stats
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              icon={Activity}
              label="Total Distance"
              value={totalMiles}
              unit="miles"
              color="bg-forest"
            />
            <StatCard 
              icon={TrendingUp}
              label="Elevation Gain"
              value={totalElevation}
              unit="ft"
              color="bg-slate-pacific"
            />
            <StatCard 
              icon={Clock}
              label="Time on Trail"
              value={`${totalHours}h ${remainingMinutes}m`}
              unit=""
              color="bg-redwood"
            />
            <StatCard 
              icon={Mountain}
              label="Peak Elevation"
              value={hikes.length > 0 ? Math.max(...hikes.map(h => h.elevation)).toLocaleString() : 0}
              unit="ft"
              color="bg-forest-light"
            />
          </div>
        </div>
        
        {/* Right Column - Difficulty Breakdown */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif font-semibold text-forest">Difficulty Breakdown</h3>
            <span className="text-sm text-slate-pacific">{hikes.length} hikes logged</span>
          </div>
          <div className="space-y-3">
            {difficulties.map(level => (
              <DifficultyBadge 
                key={level}
                level={level}
                count={difficultyCounts[level] || 0}
                total={hikes.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect, useRef } from 'react';
import { Trees, Instagram } from 'lucide-react';
import Dashboard from './components/Dashboard';
import HikeMap from './components/HikeMap';
import Journal from './components/Journal';
import AddHikeModal from './components/AddHikeModal';

function App() {
  const [hikes, setHikes] = useState([]);
  const [selectedHikeId, setSelectedHikeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState(null);
  const [hikeToEdit, setHikeToEdit] = useState(null);
  
  // Filter hikes by difficulty
  const filteredHikes = difficultyFilter 
    ? hikes.filter(h => h.difficulty === difficultyFilter)
    : hikes;
  
  // Load hikes from localStorage
  useEffect(() => {
    const savedHikes = localStorage.getItem('hikeTrackerHikes');
    if (savedHikes) {
      setHikes(JSON.parse(savedHikes));
    }
  }, []);
  
  // Save hikes to localStorage whenever they change
  useEffect(() => {
    if (hikes.length > 0) {
      localStorage.setItem('hikeTrackerHikes', JSON.stringify(hikes));
    }
  }, [hikes]);
  
  const handleSelectHike = (id) => {
    setSelectedHikeId(id === selectedHikeId ? null : id);
  };
  
  const handleAddHike = (newHike) => {
    setHikes(prev => [...prev, newHike]);
    setSelectedHikeId(newHike.id);
  };
  
  const handleEditHike = (updatedHike) => {
    setHikes(prev => prev.map(h => h.id === updatedHike.id ? updatedHike : h));
    setHikeToEdit(null);
  };
  
  const handleOpenEdit = (hike) => {
    setHikeToEdit(hike);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHikeToEdit(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-foggy via-foggy to-foggy-dark">
      {/* Header */}
      <header className="glass-dark sticky top-0 z-40">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-forest rounded-xl">
                <Trees className="w-6 h-6 text-foggy" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-foggy">
                  Vino's Personal Trail Log
                </h1>
                <p className="text-xs sm:text-sm text-foggy/70">
                  2026 Hiking Season
                </p>
              </div>
            </div>
            <a
              href="https://instagram.com/outdoors.with.vino"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forest/50 hover:bg-forest transition-colors text-foggy"
            >
              <Instagram className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">@outdoors.with.vino</span>
            </a>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard */}
        <Dashboard hikes={hikes} />
        
        {/* Map & Journal Grid */}
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-380px)] min-h-[500px]">
          {/* Map */}
          <div className="h-full order-2 lg:order-1">
            <div className="glass rounded-3xl p-4 h-full">
              <HikeMap 
                hikes={filteredHikes}
                selectedHikeId={selectedHikeId}
                onSelectHike={handleSelectHike}
              />
            </div>
          </div>
          
          {/* Journal */}
          <div className="h-full order-1 lg:order-2">
            <div className="glass rounded-3xl p-5 h-full">
              <Journal 
                hikes={filteredHikes}
                selectedHikeId={selectedHikeId}
                onSelectHike={handleSelectHike}
                onAddHike={() => setIsModalOpen(true)}
                onEditHike={handleOpenEdit}
                difficultyFilter={difficultyFilter}
                onFilterChange={setDifficultyFilter}
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-8 py-6 text-center text-sm text-slate-pacific">
        <p className="flex items-center justify-center gap-2">
          <Trees className="w-4 h-4" />
          Happy Trails — Your 2026 Adventure Awaits
          <Trees className="w-4 h-4" />
        </p>
      </footer>
      
      {/* Add/Edit Hike Modal */}
      <AddHikeModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddHike}
        onEdit={handleEditHike}
        hikeToEdit={hikeToEdit}
      />
    </div>
  );
}

export default App;

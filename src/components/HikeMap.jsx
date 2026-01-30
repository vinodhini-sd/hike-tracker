import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Mountain, TrendingUp, Clock } from 'lucide-react';

// Custom marker icons based on difficulty
const createCustomIcon = (difficulty) => {
  const colors = {
    Easy: '#10b981',
    Moderate: '#f59e0b',
    Hard: '#f97316',
    Strenuous: '#7A443A'
  };
  
  const color = colors[difficulty] || '#2D3A30';
  
  return L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg style="transform: rotate(45deg); width: 14px; height: 14px; fill: white;" viewBox="0 0 24 24">
          <path d="M13 14.725c0-5.141 3.892-10.519 3.892-10.519l-1.373-1.186-3.769 6.167-.903-1.611-1.413 1.186 1.8 2.916-3.485 5.697h4.508l.687-2.576 1.369.912-1.313-1.011z"/>
          <path d="M11.685 19.374l-1.315-1.012 1.685-2.576 1.315 1.012z"/>
        </svg>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// Component to handle map bounds
const MapBounds = ({ hikes }) => {
  const map = useMap();
  
  useEffect(() => {
    if (hikes.length > 0) {
      const bounds = L.latLngBounds(hikes.map(h => [h.lat, h.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [hikes, map]);
  
  return null;
};

// Component to handle selection
const MapSelection = ({ selectedHikeId }) => {
  const map = useMap();
  
  useEffect(() => {
    // Re-render markers when selection changes
  }, [selectedHikeId, map]);
  
  return null;
};

const HikeMap = ({ hikes, selectedHikeId, onSelectHike }) => {
  const mapRef = useRef(null);
  
  // Default center on California
  const defaultCenter = [37.5, -122.0];
  const defaultZoom = 7;
  
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  return (
    <div className="h-full rounded-2xl overflow-hidden shadow-xl">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="h-full w-full"
        ref={mapRef}
        scrollWheelZoom={true}
      >
        {/* Stamen Terrain-style tiles using Stadia Maps */}
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        
        <MapBounds hikes={hikes} />
        <MapSelection selectedHikeId={selectedHikeId} />
        
        {hikes.map((hike) => (
          <Marker
            key={hike.id}
            position={[hike.lat, hike.lng]}
            icon={createCustomIcon(hike.difficulty)}
            eventHandlers={{
              click: () => onSelectHike(hike.id)
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-serif font-bold text-forest text-lg mb-2">
                  {hike.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-pacific mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {hike.distance} mi
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {hike.elevation} ft
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${
                    hike.difficulty === 'Easy' ? 'bg-emerald-500' :
                    hike.difficulty === 'Moderate' ? 'bg-amber-500' :
                    hike.difficulty === 'Hard' ? 'bg-orange-500' :
                    'bg-redwood'
                  }`}>
                    {hike.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-slate-pacific">
                    <Clock className="w-4 h-4" />
                    {formatDuration(hike.duration)}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HikeMap;

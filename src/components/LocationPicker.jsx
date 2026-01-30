import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Search, Link, MapPin, Loader2, ExternalLink, X } from 'lucide-react';

// Custom pin icon
const createPinIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: #2D3A30;
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      "></div>
    `,
    className: 'custom-pin',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

// Component to handle map click events
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Component to recenter map when location changes
const MapRecenter = ({ lat, lng }) => {
  const map = useMap();
  
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13, { animate: true });
    }
  }, [lat, lng, map]);
  
  return null;
};

// Parse AllTrails URL to extract trail info
const parseAllTrailsUrl = (url) => {
  // Match patterns like: /trail/us/california/dipsea-trail
  const match = url.match(/alltrails\.com\/trail\/([^\/]+)\/([^\/]+)\/([^\/\?\#]+)/i);
  if (match) {
    const country = match[1];
    const state = match[2];
    const trailSlug = match[3];
    
    // Convert slug to readable name: "dipsea-trail" -> "Dipsea Trail"
    const trailName = trailSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Convert state slug: "california" -> "California"
    const stateName = state.charAt(0).toUpperCase() + state.slice(1);
    
    return {
      trailName,
      stateName,
      searchQuery: `${trailName} ${stateName}`,
      isValid: true
    };
  }
  return { isValid: false };
};

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const LocationPicker = ({ lat, lng, alltrailsUrl, onLocationChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [alltrailsInput, setAlltrailsInput] = useState(alltrailsUrl || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isParsingUrl, setIsParsingUrl] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  const searchRef = useRef(null);
  
  // Default to California center if no location
  const defaultLat = lat || 37.5;
  const defaultLng = lng || -122.0;
  const hasLocation = lat && lng;
  
  // Geocode using Nominatim
  const geocodeSearch = async (query) => {
    if (!query.trim()) return [];
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}&` +
        `format=json&` +
        `limit=5&` +
        `countrycodes=us`
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      return data.map(item => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      }));
    } catch (err) {
      console.error('Geocode error:', err);
      return [];
    }
  };
  
  // Debounced search
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }
      
      setIsSearching(true);
      setError(null);
      
      const results = await geocodeSearch(query);
      setSearchResults(results);
      setShowResults(results.length > 0);
      setIsSearching(false);
    }, 500),
    []
  );
  
  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };
  
  // Handle search result selection
  const handleResultSelect = (result) => {
    onLocationChange(result.lat, result.lng, alltrailsInput || null);
    setSearchQuery(result.name.split(',')[0]); // Just show first part of name
    setShowResults(false);
  };
  
  // Handle AllTrails URL input
  const handleAllTrailsChange = async (e) => {
    const url = e.target.value;
    setAlltrailsInput(url);
    setError(null);
    
    if (!url.trim()) return;
    
    // Check if it's a valid AllTrails URL
    if (!url.includes('alltrails.com')) {
      return;
    }
    
    const parsed = parseAllTrailsUrl(url);
    
    if (!parsed.isValid) {
      setError('Could not parse AllTrails URL. Please check the format.');
      return;
    }
    
    setIsParsingUrl(true);
    
    // Search for the trail location
    const results = await geocodeSearch(parsed.searchQuery);
    
    if (results.length > 0) {
      const best = results[0];
      onLocationChange(best.lat, best.lng, url);
      setSearchQuery(parsed.trailName);
    } else {
      setError(`Could not find location for "${parsed.trailName}". Try searching manually.`);
    }
    
    setIsParsingUrl(false);
  };
  
  // Handle map click
  const handleMapClick = (newLat, newLng) => {
    onLocationChange(newLat, newLng, alltrailsInput || null);
  };
  
  // Clear AllTrails input
  const clearAllTrails = () => {
    setAlltrailsInput('');
    onLocationChange(lat, lng, null);
  };
  
  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const inputClass = `
    w-full px-4 py-3 rounded-xl border-2 transition-colors
    bg-white/50 backdrop-blur-sm border-foggy-dark focus:border-forest
    focus:outline-none focus:ring-0
    text-forest placeholder:text-slate-pacific/50
  `;
  
  return (
    <div className="space-y-4">
      {/* AllTrails Link Input */}
      <div>
        <label className="block text-sm font-medium text-forest mb-2 flex items-center gap-2">
          <Link className="w-4 h-4" />
          AllTrails Link
        </label>
        <div className="relative">
          <input
            type="url"
            value={alltrailsInput}
            onChange={handleAllTrailsChange}
            placeholder="Paste AllTrails URL (e.g., https://alltrails.com/trail/...)"
            className={`${inputClass} pr-10`}
          />
          {alltrailsInput && (
            <button
              type="button"
              onClick={clearAllTrails}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-pacific hover:text-forest"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {isParsingUrl && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-forest animate-spin" />
            </div>
          )}
        </div>
        {alltrailsInput && alltrailsInput.includes('alltrails.com') && (
          <a
            href={alltrailsInput}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-slate-pacific hover:text-forest mt-1"
          >
            <ExternalLink className="w-3 h-3" />
            Open in AllTrails
          </a>
        )}
      </div>
      
      {/* Divider */}
      <div className="flex items-center gap-3 text-sm text-slate-pacific">
        <div className="flex-1 h-px bg-foggy-dark" />
        <span>or search by name</span>
        <div className="flex-1 h-px bg-foggy-dark" />
      </div>
      
      {/* Search Input */}
      <div ref={searchRef} className="relative">
        <label className="block text-sm font-medium text-forest mb-2 flex items-center gap-2">
          <Search className="w-4 h-4" />
          Search for Trail or Place
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Type a trail name, park, or address..."
            className={inputClass}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-forest animate-spin" />
            </div>
          )}
        </div>
        
        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-foggy-dark max-h-48 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleResultSelect(result)}
                className="w-full px-4 py-3 text-left hover:bg-foggy transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <p className="text-sm text-forest font-medium truncate">
                  {result.name.split(',')[0]}
                </p>
                <p className="text-xs text-slate-pacific truncate">
                  {result.name.split(',').slice(1).join(',')}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="text-sm text-redwood">{error}</p>
      )}
      
      {/* Mini Map */}
      <div>
        <label className="block text-sm font-medium text-forest mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Click on Map to Set Location
        </label>
        <div className="h-48 rounded-xl overflow-hidden border-2 border-foggy-dark">
          <MapContainer
            center={[defaultLat, defaultLng]}
            zoom={hasLocation ? 12 : 6}
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
              url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            />
            <MapClickHandler onLocationSelect={handleMapClick} />
            {hasLocation && (
              <>
                <MapRecenter lat={lat} lng={lng} />
                <Marker position={[lat, lng]} icon={createPinIcon()} />
              </>
            )}
          </MapContainer>
        </div>
        <p className="text-xs text-slate-pacific mt-1">
          Click anywhere on the map to place or move the pin
        </p>
      </div>
      
      {/* Selected Coordinates */}
      {hasLocation && (
        <div className="flex items-center gap-2 px-4 py-2 bg-forest/10 rounded-xl">
          <MapPin className="w-4 h-4 text-forest" />
          <span className="text-sm font-medium text-forest">
            Selected: {lat.toFixed(4)}, {lng.toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;

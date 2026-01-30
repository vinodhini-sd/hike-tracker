import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Clock, Calendar, Mountain, FileText, Navigation, Pencil } from 'lucide-react';
import LocationPicker from './LocationPicker';

const getEmptyFormData = () => ({
  name: '',
  date: new Date().toISOString().split('T')[0],
  difficulty: 'Moderate',
  distance: '',
  elevation: '',
  duration: '',
  lat: null,
  lng: null,
  alltrailsUrl: null,
  summary: ''
});

const AddHikeModal = ({ isOpen, onClose, onAdd, onEdit, hikeToEdit }) => {
  const [formData, setFormData] = useState(getEmptyFormData());
  const [errors, setErrors] = useState({});
  
  const isEditMode = !!hikeToEdit;
  
  // Populate form when editing
  useEffect(() => {
    if (hikeToEdit) {
      setFormData({
        name: hikeToEdit.name || '',
        date: hikeToEdit.date || new Date().toISOString().split('T')[0],
        difficulty: hikeToEdit.difficulty || 'Moderate',
        distance: hikeToEdit.distance?.toString() || '',
        elevation: hikeToEdit.elevation?.toString() || '',
        duration: hikeToEdit.duration?.toString() || '',
        lat: hikeToEdit.lat || null,
        lng: hikeToEdit.lng || null,
        alltrailsUrl: hikeToEdit.alltrailsUrl || null,
        summary: hikeToEdit.summary || ''
      });
    } else {
      setFormData(getEmptyFormData());
    }
    setErrors({});
  }, [hikeToEdit, isOpen]);
  
  if (!isOpen) return null;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleLocationChange = (lat, lng, alltrailsUrl) => {
    setFormData(prev => ({ 
      ...prev, 
      lat, 
      lng,
      alltrailsUrl: alltrailsUrl || prev.alltrailsUrl
    }));
    if (errors.location) {
      setErrors(prev => ({ ...prev, location: null }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Trail name is required';
    if (!formData.distance || formData.distance <= 0) newErrors.distance = 'Valid distance required';
    if (!formData.elevation || formData.elevation < 0) newErrors.elevation = 'Valid elevation required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Valid duration required';
    if (!formData.lat || !formData.lng) newErrors.location = 'Please select a location on the map';
    if (!formData.summary.trim()) newErrors.summary = 'Please write a short summary';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const hikeData = {
      id: isEditMode ? hikeToEdit.id : Date.now(),
      name: formData.name,
      date: formData.date,
      difficulty: formData.difficulty,
      distance: parseFloat(formData.distance),
      elevation: parseInt(formData.elevation),
      duration: parseInt(formData.duration),
      lat: formData.lat,
      lng: formData.lng,
      alltrailsUrl: formData.alltrailsUrl,
      summary: formData.summary
    };
    
    if (isEditMode) {
      onEdit(hikeData);
    } else {
      onAdd(hikeData);
    }
    
    setFormData(getEmptyFormData());
    onClose();
  };
  
  const difficulties = ['Easy', 'Moderate', 'Hard', 'Strenuous'];
  
  const inputClass = (field) => `
    w-full px-4 py-3 rounded-xl border-2 transition-colors
    bg-white/50 backdrop-blur-sm
    ${errors[field] 
      ? 'border-redwood focus:border-redwood' 
      : 'border-foggy-dark focus:border-forest'
    }
    focus:outline-none focus:ring-0
    text-forest placeholder:text-slate-pacific/50
  `;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-3xl p-6 animate-fade-in-up custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-forest flex items-center gap-2">
            {isEditMode ? <Pencil className="w-6 h-6" /> : <Mountain className="w-6 h-6" />}
            {isEditMode ? 'Edit Hike' : 'Log New Hike'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-foggy-dark transition-colors"
          >
            <X className="w-6 h-6 text-slate-pacific" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Trail Name */}
          <div>
            <label className="block text-sm font-medium text-forest mb-2">
              Trail Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Muir Woods Cathedral Grove Loop"
              className={inputClass('name')}
            />
            {errors.name && <p className="text-redwood text-sm mt-1">{errors.name}</p>}
          </div>
          
          {/* Date & Difficulty Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest mb-2 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClass('date')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2">
                Difficulty *
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className={inputClass('difficulty')}
              >
                {difficulties.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest mb-2 flex items-center gap-1">
                <Navigation className="w-4 h-4" /> Distance (mi) *
              </label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                step="0.1"
                min="0"
                placeholder="5.2"
                className={inputClass('distance')}
              />
              {errors.distance && <p className="text-redwood text-sm mt-1">{errors.distance}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> Elevation (ft) *
              </label>
              <input
                type="number"
                name="elevation"
                value={formData.elevation}
                onChange={handleChange}
                min="0"
                placeholder="1200"
                className={inputClass('elevation')}
              />
              {errors.elevation && <p className="text-redwood text-sm mt-1">{errors.elevation}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-forest mb-2 flex items-center gap-1">
                <Clock className="w-4 h-4" /> Duration (min) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="0"
                placeholder="180"
                className={inputClass('duration')}
              />
              {errors.duration && <p className="text-redwood text-sm mt-1">{errors.duration}</p>}
            </div>
          </div>
          
          {/* Location Picker */}
          <div className={`p-4 rounded-2xl border-2 ${errors.location ? 'border-redwood' : 'border-foggy-dark'}`}>
            <h3 className="text-sm font-semibold text-forest mb-3">Location *</h3>
            <LocationPicker
              lat={formData.lat}
              lng={formData.lng}
              alltrailsUrl={formData.alltrailsUrl}
              onLocationChange={handleLocationChange}
            />
            {errors.location && <p className="text-redwood text-sm mt-3">{errors.location}</p>}
          </div>
          
          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-forest mb-2 flex items-center gap-1">
              <FileText className="w-4 h-4" /> Journal Entry *
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your hike... What did you see? How did you feel? Any memorable moments?"
              className={inputClass('summary')}
            />
            {errors.summary && <p className="text-redwood text-sm mt-1">{errors.summary}</p>}
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-foggy-dark text-slate-pacific font-medium hover:bg-foggy-dark transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-forest text-white font-medium hover:bg-forest-dark transition-colors shadow-lg"
            >
              {isEditMode ? 'Update Hike' : 'Save Hike'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHikeModal;

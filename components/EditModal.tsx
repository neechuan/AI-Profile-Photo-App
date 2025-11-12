import React, { useState, useEffect } from 'react';
import { GeneratedImage } from '../types';

interface ImageFilters {
  brightness: number;
  contrast: number;
  saturation: number;
}

const DEFAULT_FILTERS: ImageFilters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
};

interface EditModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ image, onClose }) => {
  const [filters, setFilters] = useState<ImageFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    // Reset filters when a new image is selected for editing
    if (image) {
      setFilters(DEFAULT_FILTERS);
    }
  }, [image]);

  if (!image) return null;

  const handleFilterChange = (filterName: keyof ImageFilters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: parseInt(value, 10) }));
  };
  
  const handleDownload = () => {
    if (!image) return;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Required for canvas operations on images from data URLs
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;
        ctx.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `edited-ai-photo-${image.id.substring(0, 8)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    img.src = image.src;
  };

  const filterStyle = {
    filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl text-white flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6" onClick={e => e.stopPropagation()}>
        <div className="md:w-2/3 flex items-center justify-center bg-black rounded-md overflow-hidden">
            <img src={image.src} alt="Editing preview" className="max-h-[70vh] max-w-full object-contain" style={filterStyle} />
        </div>
        <div className="md:w-1/3 flex flex-col space-y-4">
            <h2 className="text-2xl font-bold mb-4">Edit Image</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="brightness" className="block text-sm font-medium text-gray-300">Brightness ({filters.brightness}%)</label>
                <input id="brightness" type="range" min="50" max="150" value={filters.brightness} onChange={e => handleFilterChange('brightness', e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
              </div>
              <div>
                <label htmlFor="contrast" className="block text-sm font-medium text-gray-300">Contrast ({filters.contrast}%)</label>
                <input id="contrast" type="range" min="50" max="150" value={filters.contrast} onChange={e => handleFilterChange('contrast', e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
              </div>
              <div>
                <label htmlFor="saturation" className="block text-sm font-medium text-gray-300">Saturation ({filters.saturation}%)</label>
                <input id="saturation" type="range" min="0" max="200" value={filters.saturation} onChange={e => handleFilterChange('saturation', e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
              </div>
            </div>
            
            <div className="pt-4 flex-grow flex flex-col justify-end space-y-2">
                <button onClick={() => setFilters(DEFAULT_FILTERS)} className="w-full px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors">
                    Reset Filters
                </button>
                <button onClick={handleDownload} className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 font-semibold transition-colors">
                    Download Edited Image
                </button>
                <button onClick={onClose} className="w-full px-4 py-2 rounded-md bg-transparent text-gray-400 hover:bg-gray-700 transition-colors">
                    Close
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

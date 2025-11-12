
import React, { useState, useRef, useCallback } from 'react';
import { fileToBase64 } from '../utils/imageUtils';
import { CropModal } from './CropModal';

interface UploadPanelProps {
  croppedImage: string | null;
  setCroppedImage: (image: string | null) => void;
  setOriginalImage: (image: string | null) => void;
  originalImage: string | null;
}

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
);


export const UploadPanel: React.FC<UploadPanelProps> = ({ croppedImage, setCroppedImage, originalImage, setOriginalImage }) => {
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setOriginalImage(base64);
      setIsCropModalOpen(true);
    }
  };

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setOriginalImage(base64);
      setIsCropModalOpen(true);
    }
  }, [setOriginalImage]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };


  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center h-full">
      <h2 className="text-xl font-bold mb-4 text-white self-start">1. Upload Photo</h2>
      <div 
        className="w-full h-64 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-700 hover:border-gray-400 transition-colors"
        onClick={handleUploadClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        <UploadIcon className="w-10 h-10 mb-2"/>
        <p>Click or drag file to upload</p>
      </div>
      
      {croppedImage && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold text-white mb-2">Your Photo</h3>
          <img src={croppedImage} alt="Cropped" className="w-full rounded-lg object-cover" />
           <button onClick={handleUploadClick} className="w-full mt-4 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors text-sm">
            Upload New Photo
          </button>
        </div>
      )}

      {isCropModalOpen && originalImage && (
        <CropModal 
          imageSrc={originalImage} 
          onClose={() => setIsCropModalOpen(false)} 
          onCrop={(croppedImg) => {
            setCroppedImage(croppedImg);
          }}
        />
      )}
    </div>
  );
};

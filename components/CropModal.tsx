import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { AspectRatio } from '../types';

interface CropModalProps {
  imageSrc: string;
  onClose: () => void;
  onCrop: (croppedImageUrl: string) => void;
}

function getAspectValue(aspectRatio: AspectRatio): number | undefined {
    if (aspectRatio === '1:1') return 1;
    if (aspectRatio === '16:9') return 16 / 9;
    if (aspectRatio === '9:16') return 9 / 16;
    return undefined;
}

export const CropModal: React.FC<CropModalProps> = ({ imageSrc, onClose, onCrop }) => {
  const [crop, setCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<AspectRatio>('1:1');
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const aspectValue = getAspectValue(aspect);
    const newCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, aspectValue ?? 1, width, height),
      width,
      height
    );
    setCrop(newCrop);
  }

  const handleCrop = () => {
    if (!crop || !imgRef.current) return;
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    
    ctx.drawImage(
      image,
      cropX,
      cropY,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    onCrop(canvas.toDataURL('image/jpeg'));
    onClose();
  };

  const aspectRatios: AspectRatio[] = ['1:1', '16:9', '9:16'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl text-white">
        <h2 className="text-2xl font-bold mb-4">Crop Your Photo</h2>
        <div className="flex justify-center mb-4 space-x-2">
            {aspectRatios.map(ratio => (
                <button
                    key={ratio}
                    onClick={() => setAspect(ratio)}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                        aspect === ratio
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                >
                    {ratio}
                </button>
            ))}
        </div>
        <div className="flex justify-center bg-black">
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            aspect={getAspectValue(aspect)}
          >
            <img ref={imgRef} src={imageSrc} onLoad={onImageLoad} alt="Crop preview" className="max-h-[60vh]"/>
          </ReactCrop>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors">
            Cancel
          </button>
          <button onClick={handleCrop} className="px-6 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors">
            Crop & Use
          </button>
        </div>
      </div>
    </div>
  );
};
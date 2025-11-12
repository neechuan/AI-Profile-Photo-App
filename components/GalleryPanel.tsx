
import React from 'react';
import { GeneratedImage } from '../types';

interface GalleryPanelProps {
  images: GeneratedImage[];
  isLoading: boolean;
}

const SkeletonLoader: React.FC = () => (
    <div className="w-full h-full bg-gray-700 rounded-lg animate-pulse"></div>
);

const EmptyState: React.FC = () => (
     <div className="col-span-2 row-span-2 flex flex-col items-center justify-center text-center text-gray-400 p-8 h-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-gray-500"><path d="M12 2.69l.346.666L19.5 15.31l-1.346 2.333H5.846L4.5 15.31l7.154-11.955L12 2.69zM12 2.69v12.62"/><path d="m5.5 12.5 6.5 3.5 6.5-3.5"/><path d="M12 16v5.31"/></svg>
        <h3 className="text-xl font-semibold text-white">AI Generated Photos</h3>
        <p className="mt-2">Your generated profile photos will appear here after you upload an image and select a style.</p>
    </div>
);


export const GalleryPanel: React.FC<GalleryPanelProps> = ({ images, isLoading }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 flex flex-col h-full">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-grow aspect-square max-h-[calc(100vh-10rem)]">
        {isLoading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="w-full h-full overflow-hidden rounded-lg">
              <img src={image.src} alt="Generated profile" className="w-full h-full object-cover" />
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

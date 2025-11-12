
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

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
);

export const GalleryPanel: React.FC<GalleryPanelProps> = ({ images, isLoading }) => {
  const handleDownload = (src: string, id: string) => {
    const link = document.createElement('a');
    link.href = src;
    const mimeType = src.substring(src.indexOf(":") + 1, src.indexOf(";"));
    const extension = mimeType.split('/')[1] || 'png';
    link.download = `ai-profile-photo-${id.substring(0, 8)}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
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
            <div key={image.id} className="group relative w-full h-full overflow-hidden rounded-lg">
              <img src={image.src} alt="Generated profile" className="w-full h-full object-cover" />
              <button
                onClick={() => handleDownload(image.src, image.id)}
                className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Download image"
                title="Download image"
              >
                <DownloadIcon />
              </button>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

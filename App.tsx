
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UploadPanel } from './components/UploadPanel';
import { GalleryPanel } from './components/GalleryPanel';
import { StylePanel } from './components/StylePanel';
import { generateImages, generateQuoteImages } from './services/geminiService';
import { GeneratedImage } from './types';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    if (!croppedImage) {
      setError("Please upload and crop an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const results = await generateImages(croppedImage, prompt);
      setGeneratedImages(results.map(src => ({ id: uuidv4(), src })));
    } catch (e) {
      setError("Failed to generate images. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerateQuote = async (quote: string) => {
    if (!croppedImage) {
      setError("Please upload and crop an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const results = await generateQuoteImages(croppedImage, quote);
      setGeneratedImages(results.map(src => ({ id: uuidv4(), src })));
    } catch (e) {
      setError("Failed to generate quote images. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
        <header className="py-4 px-8 border-b border-gray-800">
            <h1 className="text-2xl font-bold">AI Profile Photo Studio</h1>
            <p className="text-gray-400 text-sm">Create your perfect profile picture with AI</p>
        </header>
        <main className="p-4 md:p-8">
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                    <UploadPanel 
                        croppedImage={croppedImage}
                        setCroppedImage={setCroppedImage}
                        originalImage={originalImage}
                        setOriginalImage={setOriginalImage}
                    />
                </div>
                <div className="lg:col-span-6">
                    <GalleryPanel images={generatedImages} isLoading={isLoading} />
                </div>
                <div className="lg:col-span-3">
                    <StylePanel
                        onGenerate={handleGenerate}
                        onGenerateQuote={handleGenerateQuote}
                        isLoading={isLoading}
                        isImageUploaded={!!croppedImage}
                    />
                </div>
            </div>
        </main>
    </div>
  );
}

export default App;

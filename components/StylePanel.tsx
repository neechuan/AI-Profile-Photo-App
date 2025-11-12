
import React, { useState } from 'react';
import { StylePreset } from '../types';

interface StylePanelProps {
  onGenerate: (prompt: string) => void;
  onGenerateQuote: (quote: string) => void;
  isLoading: boolean;
  isImageUploaded: boolean;
}

const styleDescriptions: Record<keyof typeof StylePreset, string> = {
    Pro: "Corporate headshot style.",
    Casual: "Friendly and relaxed look.",
    Creative: "Imaginative and unconventional.",
    Artistic: "Painterly or stylized portrait.",
    Glamour: "Polished and glamorous beauty shot.",
    Street: "Candid-style in an urban setting.",
    Candid: "Natural, unposed and genuine.",
    Fashion: "High-fashion, editorial style.",
    Editorial: "Storytelling, magazine style.",
    Boudoir: "Intimate and sensual.",
    CloseUp: "Detailed close-up of the face.",
    Dramatic: "Dramatic lighting and mood.",
};


export const StylePanel: React.FC<StylePanelProps> = ({ onGenerate, onGenerateQuote, isLoading, isImageUploaded }) => {
  const [prompt, setPrompt] = useState('');
  const [quote, setQuote] = useState('');

  const handlePresetClick = (presetPrompt: StylePreset) => {
    setPrompt(presetPrompt);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col h-full space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-3">2. Choose Your Style</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {Object.keys(StylePreset).map((styleKey) => {
              const key = styleKey as keyof typeof StylePreset;
              return (
                 <button 
                    key={key}
                    onClick={() => handlePresetClick(StylePreset[key])}
                    disabled={!isImageUploaded}
                    className="w-full text-left p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <h3 className="font-semibold text-white">{key === 'CloseUp' ? 'Close Up' : key}</h3>
                    <p className="text-sm text-gray-400">{styleDescriptions[key]}</p>
                </button>
              )
          })}
        </div>
      </div>
      
      <div className="flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-white mb-3">3. Generate</h2>
        <label htmlFor="custom-prompt" className="text-sm font-medium text-gray-300 mb-2">Custom Prompt</label>
        <textarea
          id="custom-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Add a retro filter' or 'Remove the person in the background'"
          className="w-full flex-grow p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          rows={3}
          disabled={!isImageUploaded}
        />
        <button
          onClick={() => onGenerate(prompt)}
          disabled={isLoading || !isImageUploaded || !prompt}
          className="w-full mt-4 px-4 py-3 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors disabled:bg-indigo-800 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate with Prompt'}
        </button>
      </div>

      <div className="border-t border-gray-700 pt-6 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-3">Or, Create Quote Art</h2>
          <label htmlFor="quote-text" className="text-sm font-medium text-gray-300 mb-2">Your Quote</label>
          <textarea
            id="quote-text"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="e.g., 'The future belongs to those who believe in the beauty of their dreams.'"
            className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            rows={3}
            disabled={!isImageUploaded}
          />
          <button
            onClick={() => onGenerateQuote(quote)}
            disabled={isLoading || !isImageUploaded || !quote}
            className="w-full mt-4 px-4 py-3 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors disabled:bg-purple-800 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Quote Art'}
          </button>
      </div>
    </div>
  );
};

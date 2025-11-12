
import { GoogleGenAI, Modality } from "@google/genai";
import { cleanBase64, getMimeType } from '../utils/imageUtils';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const generateSingleImage = async (
  base64ImageData: string,
  prompt: string,
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64(base64ImageData),
              mimeType: getMimeType(base64ImageData),
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const generateImages = async (
  base64ImageData: string,
  prompt: string,
): Promise<string[]> => {
    // For simplicity, we generate one image. For a 2x2 grid, you could call generateSingleImage 4 times.
    const image = await generateSingleImage(base64ImageData, prompt);
    // Returning an array of 4 identical images to fill the 2x2 grid as per UI design.
    return [image, image, image, image];
};

export const generateQuoteImages = async (
    base64ImageData: string,
    quote: string,
): Promise<string[]> => {
    const settings = [
        "in a cozy, warmly lit library",
        "in a minimalist, modern art gallery",
        "in a serene, green forest with soft sunlight",
        "on a futuristic city rooftop at dusk",
    ];

    const prompts = settings.map(setting => 
        `Create an artistic image of the person from the attached photo next to the following text: "${quote}". The setting should be ${setting}. The text should be elegantly integrated into the scene.`
    );

    const imagePromises = prompts.map(prompt => generateSingleImage(base64ImageData, prompt));
    
    return Promise.all(imagePromises);
}

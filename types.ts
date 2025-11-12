
export enum StylePreset {
  Pro = "Generate a professional headshot, suitable for a corporate profile.",
  Casual = "Generate a casual, friendly-looking profile picture.",
  Creative = "Generate a creative, imaginative and unconventional profile picture.",
  Artistic = "Generate a painterly or stylized artistic portrait.",
  Glamour = "Generate a polished and glamorous beauty shot.",
  Street = "Generate a candid-style photo taken in an urban environment.",
  Candid = "Generate a natural, unposed shot capturing a genuine moment.",
  Fashion = "Generate a high-fashion, editorial-style portrait.",
  Editorial = "Generate a storytelling portrait, as if from a magazine.",
  Boudoir = "Generate an intimate and sensual portrait.",
  CloseUp = "Generate a detailed close-up shot of the face, highlighting features.",
  Dramatic = "Generate a portrait with dramatic lighting and mood.",
}

export type AspectRatio = '1:1' | '16:9' | '9:16';

export interface GeneratedImage {
  id: string;
  src: string;
}

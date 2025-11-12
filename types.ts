
export enum StylePreset {
  Pro = "Generate a professional headshot, suitable for a corporate profile.",
  Casual = "Generate a casual, friendly-looking profile picture.",
}

export type AspectRatio = '1:1' | '16:9' | '9:16';

export interface GeneratedImage {
  id: string;
  src: string;
}


export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const getMimeType = (base64: string): string => {
  return base64.substring(base64.indexOf(":") + 1, base64.indexOf(";"));
}

export const cleanBase64 = (base64: string): string => {
    return base64.split(',')[1];
}

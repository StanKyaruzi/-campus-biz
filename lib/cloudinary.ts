// Simple image storage - saves as base64 in the product
// For production, you can switch to Cloudinary later

export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function isValidImage(file: File): boolean {
  return file.type.startsWith('image/');
}
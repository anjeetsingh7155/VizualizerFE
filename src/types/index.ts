export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

/** A photo chosen in the app, already resized and compressed, ready to upload. */
export interface SelectedImage {
  uri: string;
  width: number;
  height: number;
  mimeType: 'image/jpeg';
  fileName: string;
}

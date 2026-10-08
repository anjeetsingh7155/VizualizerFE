export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type SpaceType =
  | 'living_room_floor'
  | 'bedroom_floor'
  | 'kitchen'
  | 'bathroom'
  | 'staircase'
  | 'feature_wall';

/** One AI picture of a sample in a room. */
export interface GalleryImage {
  id: string;
  space: SpaceType;
  imageUrl: string;
}

/** A sample shown in up to six rooms (created on the Vizualizer website). */
export interface GalleryItem {
  id: string;
  textureName: string;
  textureImageUrl: string;
  style: string;
  createdAt: string;
  images: GalleryImage[];
  /** True when the signed-in person has saved it. */
  saved: boolean;
}

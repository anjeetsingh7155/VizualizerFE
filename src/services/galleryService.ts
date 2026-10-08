import { api, type ApiSuccess } from './api';
import type { GalleryItem } from '../types';

/** Anyone can look at the gallery; if signed in, items also say whether they are saved. */
export async function getGallery(page = 1): Promise<{ items: GalleryItem[]; hasMore: boolean }> {
  const res = await api.get<ApiSuccess<{ items: GalleryItem[]; hasMore: boolean }>>('/gallery', { params: { page } });
  return res.data.data;
}

export async function getGalleryItem(id: string): Promise<GalleryItem> {
  const res = await api.get<ApiSuccess<{ item: GalleryItem }>>(`/gallery/${id}`);
  return res.data.data.item;
}

// ---------- Signed-in only ----------

export async function getSaved(): Promise<GalleryItem[]> {
  const res = await api.get<ApiSuccess<{ items: GalleryItem[] }>>('/bookmarks');
  return res.data.data.items;
}

export async function saveItem(id: string): Promise<GalleryItem> {
  const res = await api.put<ApiSuccess<{ item: GalleryItem }>>(`/bookmarks/${id}`);
  return res.data.data.item;
}

export async function unsaveItem(id: string): Promise<void> {
  await api.delete(`/bookmarks/${id}`);
}

import { create } from 'zustand';
import type { SelectedImage } from '../types';

interface GenerationDraftState {
  textureImage: SelectedImage | null;
  roomImage: SelectedImage | null;
  prompt: string;
  setTextureImage: (image: SelectedImage | null) => void;
  setRoomImage: (image: SelectedImage | null) => void;
  setPrompt: (prompt: string) => void;
  resetDraft: () => void;
}

export const useGenerationStore = create<GenerationDraftState>((set) => ({
  textureImage: null,
  roomImage: null,
  prompt: '',
  setTextureImage: (textureImage) => set({ textureImage }),
  setRoomImage: (roomImage) => set({ roomImage }),
  setPrompt: (prompt) => set({ prompt }),
  resetDraft: () => set({ textureImage: null, roomImage: null, prompt: '' }),
}));

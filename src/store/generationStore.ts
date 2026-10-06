import { create } from 'zustand';

interface GenerationDraftState {
  textureUri: string | null;
  roomUri: string | null;
  prompt: string;
  setTextureUri: (uri: string | null) => void;
  setRoomUri: (uri: string | null) => void;
  setPrompt: (prompt: string) => void;
  resetDraft: () => void;
}

export const useGenerationStore = create<GenerationDraftState>((set) => ({
  textureUri: null,
  roomUri: null,
  prompt: '',
  setTextureUri: (textureUri) => set({ textureUri }),
  setRoomUri: (roomUri) => set({ roomUri }),
  setPrompt: (prompt) => set({ prompt }),
  resetDraft: () => set({ textureUri: null, roomUri: null, prompt: '' }),
}));

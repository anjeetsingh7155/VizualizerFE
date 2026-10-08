import { create } from 'zustand';
import type { GalleryItem } from '../types';
import { getSaved, saveItem, unsaveItem } from '../services/galleryService';
import { ApiError } from '../services/api';

interface SavedState {
  /** Ids of saved items, so every screen shows the same bookmark state. */
  savedIds: Record<string, true>;
  items: GalleryItem[];
  loading: boolean;
  error: string | null;
  /** An item the person tried to save before signing in; saved right after they sign in. */
  pendingSaveId: string | null;
  load: () => Promise<void>;
  /** Marks items from the gallery that the server says are saved. */
  remember: (items: GalleryItem[]) => void;
  toggle: (item: GalleryItem) => Promise<void>;
  setPendingSave: (id: string | null) => void;
  /** Called after signing in: saves the pending item, then loads the saved list. */
  afterSignIn: () => Promise<void>;
  clear: () => void;
}

const messageOf = (err: unknown) => (err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');

export const useSavedStore = create<SavedState>((set, get) => ({
  savedIds: {},
  items: [],
  loading: false,
  error: null,
  pendingSaveId: null,

  load: async () => {
    set({ loading: true, error: null });
    try {
      const items = await getSaved();
      set({ items, savedIds: Object.fromEntries(items.map((i) => [i.id, true as const])), loading: false });
    } catch (err) {
      set({ loading: false, error: messageOf(err) });
    }
  },

  remember: (items) => {
    const savedIds = { ...get().savedIds };
    for (const item of items) {
      if (item.saved) savedIds[item.id] = true;
      else delete savedIds[item.id];
    }
    set({ savedIds });
  },

  toggle: async (item) => {
    const wasSaved = Boolean(get().savedIds[item.id]);
    // Update the screen straight away; undo if the server refuses.
    const optimistic = { ...get().savedIds };
    if (wasSaved) delete optimistic[item.id];
    else optimistic[item.id] = true;
    set({
      savedIds: optimistic,
      items: wasSaved ? get().items.filter((i) => i.id !== item.id) : [{ ...item, saved: true }, ...get().items],
    });
    try {
      if (wasSaved) await unsaveItem(item.id);
      else await saveItem(item.id);
    } catch (err) {
      void get().load();
      throw new Error(messageOf(err));
    }
  },

  setPendingSave: (pendingSaveId) => set({ pendingSaveId }),

  afterSignIn: async () => {
    const pending = get().pendingSaveId;
    set({ pendingSaveId: null });
    if (pending) await saveItem(pending).catch(() => undefined);
    await get().load();
  },

  clear: () => set({ savedIds: {}, items: [], loading: false, error: null, pendingSaveId: null }),
}));

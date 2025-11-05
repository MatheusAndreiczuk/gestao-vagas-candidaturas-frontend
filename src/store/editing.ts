import { create } from 'zustand'

interface EditingProfileState {
    editingProfile: boolean;
    trueEditingProfile: () => void;
    falseEditingProfile: () => void;
}

export const useEditingProfileStore = create<EditingProfileState>((set) => ({
    editingProfile: false,
    trueEditingProfile: () => set({ editingProfile: true }),
    falseEditingProfile: () => set({ editingProfile: false }),
}));
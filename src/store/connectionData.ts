import { create } from "zustand";

interface ConnectionDataState {
    ip: string;
    port: number;
    setConnectionData: (ip: string, port: number) => void;
}

export const useDataConnectionStore = create<ConnectionDataState>((set) => ({
    ip: 'localhost',
    port: 3000,
    setConnectionData: (ip: string, port: number) => set({ ip, port }),
}));
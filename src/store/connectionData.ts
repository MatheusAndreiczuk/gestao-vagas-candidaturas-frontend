import { create } from "zustand";

interface ConnectionDataState {
    ip: string;
    port: number;
    setConnectionData: (ip: string, port: number) => void;
}

const savedIp = localStorage.getItem('server-ip') || 'localhost';
const savedPort = localStorage.getItem('server-port') ? Number(localStorage.getItem('server-port')) : 3000;

export const useDataConnectionStore = create<ConnectionDataState>((set) => ({
    ip: savedIp,
    port: savedPort,
    setConnectionData: (ip: string, port: number) => {
        localStorage.setItem('server-ip', ip);
        localStorage.setItem('server-port', port.toString());
        
        console.log(`Conexão atualizada: http://${ip}:${port}`);
        
        set({ ip, port });
    },
}));
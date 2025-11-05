import axios from 'axios'

import { useDataConnectionStore } from '../store/connectionData.ts';

const { ip, port } = useDataConnectionStore.getState();

export const api = axios.create({
    baseURL: `http://${ip}:${port}`,

    headers: {
        'Content-Type': 'application/json'
    },
})


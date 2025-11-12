import axios from 'axios'

import { useDataConnectionStore } from '../store/connectionData.js';

export const api = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
})

api.interceptors.request.use((config) => {
    const { ip, port } = useDataConnectionStore.getState();
    config.baseURL = `http://${ip}:${port}`;
    console.log(`Fazendo requisição para: ${config.baseURL}${config.url}`);
    return config;
}, (error) => {
    return Promise.reject(error);
});


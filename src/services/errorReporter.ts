import { api } from './axios';
import { useAuth } from '../context/AuthContext';

export async function reportServerError(message: string): Promise<void> {
    const { token } = useAuth();
    try {
        console.error('[Validation Error]', message);
        
        await api.post('/error', 
            { message },
            {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            }
        );
        
        console.log('[Error Reported] Mensagem enviada ao servidor:', message);
    } catch (error) {
        console.error('[Error Reporter] Falha ao reportar erro:', error);
    }
}

export function missingIndexMessage(index: string, context?: string): string {
    return context 
        ? `Index '${index}' not found in ${context}.`
        : `Index '${index}' not found in server data.`;
}

export function invalidTypeMessage(index: string, expected: string, received: string): string {
    return `Invalid type for '${index}': expected ${expected}, received ${received}.`;
}

export function invalidValueMessage(index: string, details?: string): string {
    return details 
        ? `Invalid value for '${index}': ${details}.`
        : `Invalid value for '${index}'.`;
}

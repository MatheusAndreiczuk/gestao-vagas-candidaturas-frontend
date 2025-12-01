import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { validateServerResponse } from '../validators/serverResponseValidators';

export function useServerValidation() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const validate = useCallback(async <T>(
        schema: z.ZodSchema<T>,
        data: unknown,
        context?: string,
        options?: {
            fallbackPath?: string;
            showAlert?: boolean;
        }
    ): Promise<T | null> => {
        const result = await validateServerResponse(schema, data, context);
        
        if (!result.success) {
            if (options?.showAlert) {
                alert('Erro de comunicação com o servidor. Por favor, tente novamente.');
            }
            
            if (options?.fallbackPath) {
                navigate(options.fallbackPath);
            }
            
            return null;
        }
        
        return result.data;
    }, [token, navigate]);

    const validateSilent = useCallback(async <T>(
        schema: z.ZodSchema<T>,
        data: unknown,
        context?: string
    ): Promise<T | null> => {
        const result = await validateServerResponse(schema, data, context);
        return result.data;
    }, []);

    return { validate, validateSilent };
}

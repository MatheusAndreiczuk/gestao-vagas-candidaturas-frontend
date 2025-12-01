import { z } from 'zod';
import { reportServerError, missingIndexMessage, invalidTypeMessage } from '../services/errorReporter';
import { getJobSchema } from '../schemas/jobSchema';

export const jobResponseSchema = getJobSchema.omit({ id: true }).extend({
    job_id: z.number().or(z.string().transform(Number)),
    contact: z.string().optional().nullable(),
});

export const jobsListResponseSchema = z.object({
    items: z.array(jobResponseSchema)
});

export const candidateResponseSchema = z.object({
    user_id: z.number().or(z.string().transform(Number)),
    name: z.string(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    education: z.string().nullable().optional(),
    experience: z.string().nullable().optional(),
});

export const candidatesListResponseSchema = z.object({
    items: z.array(candidateResponseSchema)
});

export const userResponseSchema = z.object({
    user_id: z.number().or(z.string().transform(Number)).optional(),
    username: z.string(),
    name: z.string(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    education: z.string().nullable().optional(),
    experience: z.string().nullable().optional(),
});

export const companyResponseSchema = z.object({
    company_id: z.number().or(z.string().transform(Number)).optional(),
    username: z.string(),
    name: z.string(),
    business: z.string(),
    email: z.string(),
    phone: z.string(),
    city: z.string(),
    state: z.string(),
    street: z.string(),
    number: z.string().or(z.number().transform(String)),
});

export const applicationsListResponseSchema = z.object({
    items: z.array(jobResponseSchema)
});

/**
 * 
 * @param schema 
 * @param data 
 * @param token 
 * @param context 
 * @returns 
 */

export async function validateServerResponse<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
    context?: string
): Promise<{ success: true; data: T } | { success: false; data: null }> {
    const result = schema.safeParse(data);
    
    if (result.success) {
        return { success: true, data: result.data };
    }
    
    const errors = result.error.issues.map(issue => {
        const path = issue.path.join('.');
        
        if (issue.code === 'invalid_type') {
            const typeIssue = issue as any;
            if (typeIssue.received === 'undefined') {
                return missingIndexMessage(path, context);
            }
            return invalidTypeMessage(path, typeIssue.expected as string, typeIssue.received);
        }
        
        return `Validation error for '${path}': ${issue.message}`;
    });
    
    for (const errorMessage of errors) {
        await reportServerError(errorMessage);
    }
    
    return { success: false, data: null };
}

export async function validateOrFallback<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
    context?: string,
    fallbackPath?: string
): Promise<T | null> {
    const result = await validateServerResponse(schema, data, context);
    
    if (!result.success && fallbackPath) {
        console.error(`[Validation Failed] Redirecting to ${fallbackPath}`);
        window.location.href = fallbackPath;
        return null;
    }
    
    return result.data;
}

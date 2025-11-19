import z from 'zod';

export const getJobSchema = z.object({
    id: z.
        number(),
    title: z.
        string()
        .min(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
        .max(150, { message: 'O título deve ter no máximo 150 caracteres.' }),
    area: z.
        string()
        .min(2, { message: 'A área deve ter pelo menos 2 caracteres.' })
        .max(100, { message: 'A área deve ter no máximo 100 caracteres.' }),
    description: z.
        string()
        .min(10, { message: 'A descrição deve ter pelo menos 10 caracteres.' })
        .max(4000, { message: 'A descrição deve ter no máximo 4000 caracteres.' }),
    company: z.
        string()
        .min(2, { message: 'O nome da empresa deve ter pelo menos 2 caracteres.' })
        .max(150, { message: 'O nome da empresa deve ter no máximo 150 caracteres.' }),
    city: z.
        string()
        .min(5, { message: 'A cidade deve ter pelo menos 5 caracteres.' })
        .max(100, { message: 'A cidade deve ter no máximo 100 caracteres.' }),
    state: z.
        string()
        .min(2, { message: 'O estado deve ter pelo menos 2 caracteres.' })
        .max(100, { message: 'O estado deve ter no máximo 100 caracteres.' }),
    salary: z.
        number()
        .optional()
        .nullable()
})

export const createJobSchema = getJobSchema.omit({ id: true, company: true });

export type GetJobSchema = z.infer<typeof getJobSchema>;
export type CreateJobSchema = z.infer<typeof createJobSchema>;
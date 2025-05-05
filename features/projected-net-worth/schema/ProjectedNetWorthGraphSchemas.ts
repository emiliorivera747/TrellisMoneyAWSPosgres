import {z} from 'zod';

const currentYear = new Date().getFullYear();
export const retirementYearInputSchema = z.object({
    retirementYear: z.number().int().min(currentYear).max(currentYear + 130),
});

export type RetirementYearInput = z.infer<typeof retirementYearInputSchema>;
import {z} from 'zod';

const currentYear = new Date().getFullYear();
export const retirementYearInputSchema = z.object({
    retirementYear: z.number().int().min(currentYear).max(currentYear + 130),
});

/**
 * Type representing the inferred retirement year input schema.
 * @export
 * @typedef {z.infer<typeof retirementYearInputSchema>} RetirementYearInput
 */
export type RetirementYearInput = z.infer<typeof retirementYearInputSchema>;
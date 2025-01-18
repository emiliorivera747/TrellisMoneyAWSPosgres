import { z } from "zod";

export const annualGrowthRateSchema = z.object({
    annualGrowthRate: z
        .number()
        .min(0, "Annual growth rate must be greater than 0")
        .max(100, "Annual growth rate must be less than 100"),
});

export type AnnualGrowthRate = z.infer<typeof annualGrowthRateSchema>;
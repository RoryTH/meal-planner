import { z } from 'zod';

export const createRecipeSchema = z.object({
    title: z.string().min(1).max(191),
    description: z.string().min(1).max(1000),
    cookTimeMinutes: z.number().int().positive().min(1).max(900),
    kcal: z.number().int().positive().min(50).max(10000),
    protein: z.number().positive().min(0).max(1000),
    carbs: z.number().positive().min(0).max(1000),
    fat: z.number().positive().min(0).max(1000),
    imageUrl: z.string().url().max(191)
});

export const createRecipesSchema = z.array(createRecipeSchema);

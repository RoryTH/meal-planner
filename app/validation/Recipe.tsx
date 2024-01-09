import { z } from 'zod';

const categorySchema = z.number().int().positive();

const instructionSchema = z.object({
    stepNumber: z.number().int().positive(),
    description: z.string().min(1).max(1000)
});

const ingredientSchema = z.object({
    name: z.string().min(1).max(191),
    amount: z.number().positive().min(0).max(10000),
    unitId: z.number().int().positive()
});

export const createRecipeSchema = z.object({
    userId: z.number().int().positive(),
    title: z.string().min(1).max(191),
    description: z.string().min(1).max(1000),
    cookTime: z.number().int().positive().min(0).max(900),
    kcal: z.number().int().positive().min(0).max(10000),
    protein: z.number().positive().min(0).max(1000),
    carbs: z.number().positive().min(0).max(1000),
    fat: z.number().positive().min(0).max(1000),
    imageUrl: z.string().url().max(255),
    categories: z.array(categorySchema),
    instructions: z.array(instructionSchema),
    ingredients: z.array(ingredientSchema)
});

export const createRecipesSchema = z.array(createRecipeSchema);

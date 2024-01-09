import { prisma } from './prisma';

export async function upsertIngredient(ingredient: RecipeIngredient) {
    const existingIngredient = await prisma.ingredient.findUnique({
        where: { name: ingredient.name }
    });

    if (existingIngredient) {
        // Ingredient exists, use its ID
        return {
            ingredientId: existingIngredient.id,
            amount: ingredient.amount,
            unitId: ingredient.unitId
        };
    } else {
        // Ingredient doesn't exist, create a new one
        const newIngredient = await prisma.ingredient.create({
            data: { name: ingredient.name }
        });
        return {
            ingredientId: newIngredient.id,
            amount: ingredient.amount,
            unitId: ingredient.unitId
        };
    }
}

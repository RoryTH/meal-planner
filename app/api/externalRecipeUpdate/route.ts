import { NextRequest, NextResponse } from 'next/server';
import fetchGousto from './fetchGoustoRecipes';
import { prisma } from '../../../lib/prisma';
import { createRecipesSchema } from '@/app/validation/recipe';

export async function POST(request: NextRequest) {
    try {
        await updateRecipesDatabase();
        return NextResponse.json(
            { message: 'Database updated successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error updating database:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching recipes' },
            { status: 500 }
        );
    }
}

async function updateRecipesDatabase() {
    try {
        console.log('Updating database with new recipes...');
        const recipes = await fetchGousto();

        const validation = createRecipesSchema.safeParse(recipes);
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        for (const recipeData of recipes) {
            await prisma.recipe.create({
                data: {
                    ...recipeData,
                    userId: 1 // Add userId with value 0
                }
            });
        }

        console.log('Database updated successfully');
    } catch (error) {
        console.error('Error updating database:', error);
        throw error;
    }
}

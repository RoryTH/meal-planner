import { NextRequest, NextResponse } from 'next/server';
import fetchGousto from './fetchGoustoRecipes';
import { prisma } from '../../../lib/prisma';
import { createRecipesSchema } from '@/app/validation/createRecipesSchema';

export async function POST(request: NextRequest) {
    // Check for POST request

    try {
        // Call your scraping and database update function here
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
            // Handle validation errors
            console.error('Validation failed:', validation.error.errors);
            throw new Error('Validation failed');
        }

        for (const recipeData of recipes) {
            await prisma.recipe.create({
                data: recipeData
            });
        }

        console.log('Database updated successfully');
    } catch (error) {
        console.error('Error updating database:', error);
        throw error;
    }
}

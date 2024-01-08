import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { createRecipeSchema } from '@/app/validation/Recipe';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createRecipeSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    try {
        const newRecipe = await prisma.recipe.create({
            data: {
                userId: body.userId, // temp during development
                title: body.title,
                description: body.description,
                cookTime: body.cookTime,
                kcal: body.kcal,
                protein: body.protein,
                carbs: body.carbs,
                fat: body.fat,
                imageUrl: body.imageUrl
            }
        });

        return NextResponse.json(newRecipe, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'An error occurred while creating recipe' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const recipes = await prisma.recipe.findMany();

        return NextResponse.json(recipes, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'An error occurred while fetching recipes' },
            { status: 500 }
        );
    }
}

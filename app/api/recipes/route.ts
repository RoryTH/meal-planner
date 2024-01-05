import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { createRecipeSchema } from '@/app/validation/createRecipesSchema';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createRecipeSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newRecipe = await prisma.recipe.create({
        data: {
            title: body.title,
            description: body.description,
            cookTimeMinutes: body.cookTimeMinutes,
            kcal: body.kcal,
            protein: body.protein,
            carbs: body.carbs,
            fat: body.fat,
            imageUrl: body.imageUrl
        }
    });

    return NextResponse.json(newRecipe, { status: 201 });
}

export async function GET() {
    try {
        const recipes = await prisma.recipe.findMany();

        return new Response(JSON.stringify(recipes), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: 'An error occurred while fetching recipes'
            }),
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createRecipeSchema = z.object({
    title: z.string().min(1).max(191),
    description: z.string().min(1).max(1000),
    cookTimeMinutes: z.number().int().positive().min(1).max(900),
    kcal: z.number().int().positive().min(50).max(10000),
    protein: z.number().positive().min(0).max(1000),
    carbs: z.number().positive().min(0).max(1000),
    fat: z.number().positive().min(0).max(1000),
    imageUrl: z.string().url().max(191)
});

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

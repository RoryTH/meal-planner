import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);

    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id: id }
        });

        if (recipe) {
            return NextResponse.json(recipe, { status: 200 });
        } else {
            return NextResponse.json(
                { error: 'Recipe not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'An error occurred' },
            { status: 500 }
        );
    }
}

import React from 'react';
import RecipeCard from '../components/RecipeCard';

interface Recipe {
    id: number;
    title: string;
    description: string;
    cookTimeMinutes: number;
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    imageUrl: string;
}

const Page = async () => {
    const res = await fetch(`http://localhost:3000/api/recipes`, {
        cache: 'no-cache'
    });
    const data = await res.json();

    return (
        <div className="mx-5 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6 gap-5">
            {data.map((recipe: Recipe) => (
                <RecipeCard
                    key={recipe.id}
                    title={recipe.title}
                    prepTime={recipe.cookTimeMinutes}
                    description={recipe.description}
                    imageUrl={recipe.imageUrl}
                    calories={recipe.kcal}
                    protein={recipe.protein}
                    carbs={recipe.carbs}
                    fat={recipe.fat}
                />
            ))}
        </div>
    );
};

export default Page;

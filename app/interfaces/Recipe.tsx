interface Recipe {
    title: string;
    description: string;
    cookTime: number;
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    imageUrl: string;
}

interface RecipeEntity extends Recipe, Entity {}

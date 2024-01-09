interface Ingredient {
    name: string;
}

interface RecipeIngredient extends Ingredient {
    amount: number;
    unitId: number;
}

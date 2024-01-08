const faker = require('faker');

function generateRecipeIngredients(numIngredients: number) {
    const recipeIngredients = [];
    const uniquePairs = new Set();

    while (recipeIngredients.length < numIngredients) {
        const recipeId = faker.datatype.number({ min: 1, max: 10 });
        const ingredientId = faker.datatype.number({ min: 1, max: 50 });
        const pairKey = `${recipeId}-${ingredientId}`;

        if (!uniquePairs.has(pairKey)) {
            uniquePairs.add(pairKey);

            recipeIngredients.push({
                recipeId: recipeId,
                ingredientId: ingredientId,
                amount: faker.datatype.float({ min: 1, max: 500 }),
                unitId: faker.datatype.number({ min: 1, max: 5 })
            });
        }
    }

    return recipeIngredients;
}

export const seedRecipeIngredients = generateRecipeIngredients(50);

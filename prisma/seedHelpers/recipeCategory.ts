const faker = require('faker');

function generateRecipeCategories(numEntries: number) {
    const recipeCategories = [];
    const uniquePairs = new Set();

    while (recipeCategories.length < numEntries) {
        const recipeId = faker.datatype.number({ min: 1, max: 10 });
        const categoryId = faker.datatype.number({ min: 1, max: 2 });
        const pairKey = `${recipeId}-${categoryId}`;

        if (!uniquePairs.has(pairKey)) {
            uniquePairs.add(pairKey);

            recipeCategories.push({
                recipeId: recipeId,
                categoryId: categoryId
            });
        }
    }

    return recipeCategories;
}

export const seedRecipeCategories = generateRecipeCategories(3);

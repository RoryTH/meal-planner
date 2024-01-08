const faker = require('faker');

function generateFavoriteRecipes(numFavorites: number) {
    const favorites = [];
    const uniquePairs = new Set();

    while (favorites.length < numFavorites) {
        const userId = faker.datatype.number({ min: 1, max: 2 });
        const recipeId = faker.datatype.number({ min: 1, max: 10 });
        const pairKey = `${userId}-${recipeId}`;

        if (!uniquePairs.has(pairKey)) {
            uniquePairs.add(pairKey);

            favorites.push({
                userId: userId,
                recipeId: recipeId
            });
        }
    }

    return favorites;
}

export const seedFavoriteRecipes = generateFavoriteRecipes(5);

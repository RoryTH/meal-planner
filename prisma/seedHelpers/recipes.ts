const faker = require('faker');

function generateRecipes(numRecipes: number) {
    const recipes = [];
    const imageUrl = 'https://source.unsplash.com/collection/11521778';

    for (let i = 0; i < numRecipes; i++) {
        const recipe = {
            userId: faker.datatype.number({ min: 1, max: 2 }),
            title: faker.lorem.words(),
            description: faker.lorem.paragraphs(),
            cookTime: faker.datatype.number({ min: 10, max: 120 }),
            kcal: faker.datatype.number({ min: 100, max: 800 }),
            protein: parseFloat(faker.finance.amount(1, 50, 2)),
            carbs: parseFloat(faker.finance.amount(1, 70, 2)),
            fat: parseFloat(faker.finance.amount(1, 30, 2)),
            imageUrl: imageUrl + `?${Math.random()}`
        };
        recipes.push(recipe);
    }

    return recipes;
}

export const seedRecipes = generateRecipes(11);

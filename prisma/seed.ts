const { PrismaClient } = require('@prisma/client');

const faker = require('faker');

function generateRecipes(numRecipes: number) {
    const recipes = [];
    const imageUrl = 'https://source.unsplash.com/collection/11521778';

    for (let i = 0; i < numRecipes; i++) {
        const recipe = {
            title: faker.lorem.words(),
            description: faker.lorem.paragraphs(),
            cookTimeMinutes: faker.datatype.number({ min: 10, max: 120 }),
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

const p = new PrismaClient();

const seedRecipes = generateRecipes(10);

const load = async () => {
    try {
        await p.recipe.deleteMany();

        await p.recipe.createMany({
            data: seedRecipes
        });

        console.log('Recipes created');
    } catch (e) {
        console.log(e);
    }
};

load();

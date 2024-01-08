const faker = require('faker');

function generateInstructions(numRecipes: number, maxStepsPerRecipe: number) {
    const instructions = [];

    for (let i = 0; i < numRecipes; i++) {
        const numSteps = faker.datatype.number({
            min: 1,
            max: maxStepsPerRecipe
        });

        for (let step = 1; step <= numSteps; step++) {
            instructions.push({
                recipeId: i + 1, // Assuming recipe IDs start at 1
                stepNumber: step,
                description: faker.lorem.sentence()
            });
        }
    }

    return instructions;
}

export const seedInstructions = generateInstructions(10, 5);

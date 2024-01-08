const fs = require('fs');
const readline = require('readline');

const ingredientsFile =
    '/Users/roryholmes/Documents/meal-planner/meal-planner/prisma/seedHelpers/ingredients.csv';
const numberOfIngredients = 100;

async function readIngredientsFromFile(
    filePath: string,
    numberOfIngredients: number | null = null
) {
    const ingredients = [];

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let count = 0;

    for await (const line of rl) {
        ingredients.push({ name: line });
        count++;
        if (numberOfIngredients !== null && count >= numberOfIngredients) {
            break;
        }
    }

    return ingredients;
}

export const seedIngredients = readIngredientsFromFile(
    ingredientsFile,
    numberOfIngredients
);

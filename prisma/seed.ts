import { seedUsers } from './seedHelpers/users';
import { seedCategories } from './seedHelpers/categories';
import { seedFavoriteRecipes } from './seedHelpers/favoriteRecipe';
import { seedIngredients } from './seedHelpers/ingredients';
import { seedInstructions } from './seedHelpers/instructions';
import { seedUnits } from './seedHelpers/units';
import { seedRecipes } from './seedHelpers/recipes';
import { seedRoles } from './seedHelpers/roles';
import { seedRecipeIngredients } from './seedHelpers/recipeIngredient';
import { seedRecipeCategories } from './seedHelpers/recipeCategory';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tablesAndData = [
    { table: 'FavoriteRecipe', data: seedFavoriteRecipes },
    { table: 'Instruction', data: seedInstructions },
    { table: 'RecipeIngredient', data: seedRecipeIngredients },
    { table: 'RecipeCategory', data: seedRecipeCategories },
    { table: 'Recipe', data: seedRecipes },
    { table: 'User', data: seedUsers },
    { table: 'Category', data: seedCategories },
    { table: 'Ingredient', data: seedIngredients },
    { table: 'Unit', data: seedUnits },
    { table: 'Role', data: seedRoles }
];

async function resetAutoIncrementCounter(table: string) {
    try {
        const query = `ALTER TABLE ${table} AUTO_INCREMENT = 1`;
        await prisma.$executeRawUnsafe(query); // unsafe SQL execution OK here as in controlled environment
        console.log(`Auto-increment counter reset for ${table}.`);
    } catch (error) {
        console.error(
            `Error resetting auto-increment counter for ${table}:`,
            error
        );
    }
}

async function clearTable(table: string) {
    try {
        await prisma[table].deleteMany();
        console.log(`Cleared existing data in ${table}.`);
    } catch (error) {
        console.error(`Error clearing data in ${table}:`, error);
    }
}

async function seedTable(table: string, data: any) {
    try {
        await prisma[table].createMany({ data });
        console.log(`${table} seeded successfully.`);
    } catch (error) {
        console.error(`Error seeding ${table}:`, error);
    }
}

async function seedDB(tablesAndData: any[]) {
    try {
        for (const { table, data } of tablesAndData) {
            await clearTable(table);
            await resetAutoIncrementCounter(table);
        }

        for (const { table, data } of tablesAndData.reverse()) {
            await seedTable(table, await data);
        }
    } catch (error) {
        console.error('Error occurred during database seeding:', error);
    }
}

seedDB(tablesAndData);

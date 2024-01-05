const baseMenuUrl =
    'https://production-api.gousto.co.uk/menu/v2/menus?include=value-collection,curated-boxes&addAlternatives=true';

const baseRecipesUrl =
    'https://production-api.gousto.co.uk/cmsreadbroker/v1/recipe-by-id/';

export default async function fetchGousto(): Promise<Recipe[]> {
    const currentDate = new Date().toISOString().split('T')[0];

    try {
        console.log('Scraping Gousto recipes...');
        const recipeNames: string[] = await fetchRecipeIDs(currentDate);
        const recipes: Recipe[] = [];

        for (const recipeName of recipeNames) {
            const recipe = await getRecipesFromID(recipeName);
            if (recipe != null) recipes.push(recipe);
        }

        console.log('Finished scraping Gousto recipes.');
        return recipes;
    } catch (error) {
        console.error('Error in scraping recipes:', error);
        throw error;
    }
}

async function fetchRecipeIDs(currentDate: string) {
    let recipeIDs: string[];
    const currentMenuUrl =
        baseMenuUrl + `&delivery_date=${currentDate}&date=${currentDate}`;

    try {
        const response = await fetch(currentMenuUrl);
        const data = await response.json();
        let menuItems = data.included.filter(
            (item: any) => item.type === 'recipe'
        );
        // Extract the recipe IDs
        recipeIDs = menuItems.map(
            (menuItem: {
                id: string;
                attributes: { core_recipe_id: string };
            }) => menuItem.attributes.core_recipe_id
        );
    } catch (error) {
        console.error('Error in fetching recipe IDs:', error);
        throw error;
    }
    return recipeIDs;
}

async function getRecipesFromID(recipeID: string): Promise<Recipe | null> {
    const currentRecipesUrl = baseRecipesUrl + recipeID;
    try {
        const response = await fetch(currentRecipesUrl);
        const json = await response.json();
        const recipe = json.data.entry;
        return {
            title: recipe.title,
            description: recipe.description,
            cookTimeMinutes: recipe.prep_times.for_2,
            kcal: recipe.nutritional_information.per_portion.energy_kcal,
            protein: Math.round(
                recipe.nutritional_information.per_portion.protein_mg / 1000
            ),
            carbs: Math.round(
                recipe.nutritional_information.per_portion.carbs_mg / 1000
            ), // Convert from mg to g and round
            fat: Math.round(
                recipe.nutritional_information.per_portion.fat_mg / 1000
            ), // Convert from mg to g and round to
            imageUrl: recipe.media.images[4].image
        };
    } catch {
        console.log('Error fetching recipe: ' + recipeID);
        return null;
    }
}

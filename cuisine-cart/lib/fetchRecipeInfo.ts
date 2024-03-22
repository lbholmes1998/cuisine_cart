import axios, { AxiosResponse } from 'axios';
import { RecipeInfoResults } from '@/models/RecipeInfo'; // type
import { RecipeInfoWithIngredients } from '@/models/RecipeInfo'; // schema

// This runs on server
const apiKey: string | undefined = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
if (!apiKey) {
    throw new Error('Spoonacular API key is not defined in environment variables.');
}

const fetchRecipeInfo = async (recipeId: number):
    Promise<RecipeInfoResults | undefined> => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
            validateStatus: function (status) {
                return status <= 299; // Resolve only if status code is less than 299
            },
            headers: { 'x-api-key': apiKey }
        }).catch(e => {
            throw new Error("Fetch recipes error!\n")
        })

        const recipeInfoResults: RecipeInfoResults = response.data

        // Parse data with Zod schema
        const parsedData = RecipeInfoWithIngredients.parse(recipeInfoResults)

        if (parsedData.id === undefined) return undefined
        return parsedData

    } catch (error) {
        // Will show in terminal console
        console.error(`Error fetching recipe info!: ${error}`)
    }
}

export default fetchRecipeInfo
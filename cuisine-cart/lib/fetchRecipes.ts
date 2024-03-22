import axios, { AxiosResponse } from 'axios';
import { RecipeResults } from '../models/Recipes'; // type
import { RecipeSchemaWithPhotos } from '../models/Recipes'; // schema
import env from './env';

// This runs on server
const apiKey: string | undefined = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
if (!apiKey) {
    throw new Error('Spoonacular API key is not defined in environment variables.');
}

const fetchRecipes = async (url: string):
    Promise<RecipeResults | undefined> => {
    try {
        const response = await axios.get(url, {
            validateStatus: function (status) {
                return status <= 299; // Resolve only if status code is less than 299
            },
            headers: { 'x-api-key': apiKey }
        }).catch(e => {
            throw new Error("Fetch recipes error!\n")
        })

        const recipeResults: RecipeResults = response.data

        // Parse data with Zod schema
        const parsedData = RecipeSchemaWithPhotos.parse(recipeResults)

        if (parsedData.totalResults === 0) return undefined

        return parsedData

    } catch (error) {
        // Will show in terminal console
        console.error(`Error search for recipe: ${error}`)
    }
}


export default fetchRecipes
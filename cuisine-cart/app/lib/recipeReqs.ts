import axios, { AxiosResponse } from 'axios';

interface reqProps {
    endpoint: string;
    recipeId: string;
}

// Define and check for spoonacular API key
const apiKey: string | undefined = process.env.NEXT_PUBLIC_SPOONACULAR_KEY;
if (!apiKey) {
    throw new Error('Spoonacular API key is not defined in environment variables.');
}

export const fetchRecipeInfo = async (recipeID: string): Promise<any> => {
    try {
        const response: AxiosResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeID}/information`, {
            headers: { 'x-api-key': apiKey }
        });
        return response.data;
    } catch (error) {
        // Handle errors here
        console.error('Error fetching recipe information:', error);
        throw error;
    }
};

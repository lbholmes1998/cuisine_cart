//pages/RecipeInformation.tsx
import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import RootLayout from '@/app/layout';

// PASS RECIPE ID FROM RECIPESEARCH PAGE AS PROPS

// USE PASSED IN PROPS TO SEND REQUEST FOR RECIPES INFO

interface IngredientItems {
    name: string,
    measures: {
        metric: {
            amount: string,
            unitLong: string
        }
    }
}

interface RecipeInfo {
    id: string,
    aggregateLikes: number,
    diets: string,
    title: string,
    image: string,
    servings: number,
    summary: string,
    extendedIngredients: {
        [key: number]: IngredientItems
    },
    instructions: string
}


interface RecipeProps {
    recipeID: number
}

const RecipeInformation: React.FC<RecipeProps> = (props) => {
    const [recipeInfo, setRecipeInfo] = useState<any>('null');  // Expect object in format of Recipe interface.

    useEffect(() => {
        const getRecipeInfo = async () => {
            try {
                const apiKey: string | undefined = process.env.NEXT_PUBLIC_SPOONACULAR_KEY;
                if (!apiKey) {
                    throw new Error('Spoonacular API key is not defined in environment variables.');
                }
                const response: AxiosResponse = await axios.get(`https://api.spoonacular.com/recipes/${props.recipeID}/information`, {
                    headers: {'x-api-key': apiKey}
                });
                // Access response data
                setRecipeInfo(response.data)
            } catch (error) {
                console.error(`Error searching for recipe: ${error}`)
            }
        }
        getRecipeInfo()
    }, [])

    if (recipeInfo !== 'null') return (
        <div>
            <h2 className='font-bold mb-3'>No of likes: {recipeInfo.aggregateLikes}</h2>
            <h2 className='font-bold mb-3'>Diet/s: {recipeInfo.diets}</h2>
            <h1 className='text-xl font-bold mb-3'>Ingredients</h1>
            {recipeInfo.extendedIngredients.map((ingredient: any) =>
                <div key={ingredient.name}>
                    <h2 className='text-base font-semibold pb-1'>{ingredient.name}</h2>
                    <p className='mb-2'>{ingredient.measures.metric.amount}: {ingredient.measures.metric.unitLong}</p>
                </div>
            )}
            <h1 className='pt-3 text-xl font-bold mb-3'>Instructions</h1>
            {recipeInfo.instructions}
        </div>
    )
}

export default RecipeInformation

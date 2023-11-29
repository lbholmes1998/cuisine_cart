//pages/RecipeInformation.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
                const response = await axios.get(`http://localhost:8080/api/recipes/info?id=${props.recipeID}`)
                const data: RecipeInfo = await response.data;  // TS expects array type, not having 'await' gives 'response' the 'promise' type which causes errors.
                console.log(data)
                setRecipeInfo(data)
            } catch (error) {
                console.error(`Error searching for recipe: ${error}`)
            }
        }
        getRecipeInfo()
    }, [])

    if (recipeInfo !== 'null') return (
        <RootLayout>
            <div>
                <h1 className='text-xl font-bold mb-3'>Ingredients</h1>
                {recipeInfo.extendedIngredients.map((ingredient: any) =>
                    <div>
                        <h1 className='text-base font-semibold pb-1'>{ingredient.name}</h1>
                        <p className='mb-2'>{ingredient.measures.metric.amount}: {ingredient.measures.metric.unitLong}</p>
                    </div>
                )}
                <h1 className='pt-3 text-xl font-bold mb-3'>Instructions</h1>
                {recipeInfo.instructions}
            </div>

        </RootLayout>
    )
}

export default RecipeInformation

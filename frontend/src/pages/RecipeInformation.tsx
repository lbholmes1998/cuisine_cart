//pages/RecipeInformation.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RootLayout from '@/app/Layout';

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
            <h1>Recipe Info - {`${recipeInfo.title}`}</h1>

            <div>
                <h3>Ingredients</h3>
                {recipeInfo.extendedIngredients.map((ingredient: any) =>
                    <ul>
                        <li>{ingredient.name}</li>
                        <p>{ingredient.measures.metric.amount}: {ingredient.measures.metric.unitLong}</p>
                    </ul>
                )}
                <h3>Instructions</h3>
                <p>{`${recipeInfo.instructions}`}</p>
            </div>

        </RootLayout>
    )
}

export default RecipeInformation
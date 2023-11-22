//pages/RecipeSearch.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import RecipeInformation from './RecipeInformation';
import RootLayout from '@/app/Layout';

interface Recipe {
    id: number,
    title: string,
    image: string,
    imageType: string
}

type Props = {
    onClick?: React.MouseEventHandler
}

const RecipeSearch: React.FC = () => {
    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<Recipe[]>([]);  // Expect array in format of Recipe interface.
    const [selectedRecipe, setSelectedRecipe] = useState<number>()

    const searchRecipes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/recipes?query=${query}`)
            const data: Recipe[] = await response.data.results;  // TS expects array type, not having 'await' gives 'response' the 'promise' type which causes errors.
            console.log(data)
            setResults(data)

        } catch (error) {
            console.error(`Error search for recipe: ${error}`)
        }
    }

    const handleRecipeSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        const recipeButton: HTMLButtonElement = event.currentTarget
        let recipeID: number = +recipeButton.value
        setSelectedRecipe(recipeID)
    }
    
    const renderRecipeInfo = () => {
        if (selectedRecipe !== undefined) {
            return <RecipeInformation recipeID={selectedRecipe}/>
        }
    }


    // function handleRecipeSelect({ onClick }: Props) {
    //     setSelectedRecipe()
    // }

    return (
        <RootLayout>
                <h1 className="bg-red-500">Recipe Search</h1>
                <input
                    type="text"
                    placeholder="Enter Search Query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={searchRecipes}>Search</button>
                <ul>
                    {results.map((recipe) => (
                        <div>
                            <li key={recipe.id}>{recipe.title}</li>
                            <button key={`button_${recipe.id}`} value={recipe.id} onClick={handleRecipeSelect}>Show Info</button>
                        </div>
                    ))}
                </ul>
                {selectedRecipe && renderRecipeInfo()}
        </RootLayout>
    );
}

export default RecipeSearch
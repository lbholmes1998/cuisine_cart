//pages/RecipeSearch.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import RecipeInformation from './RecipeInformation';
import RootLayout from '@/app/Layout';
import Modal from '@/components/modal';

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
    const [isOpen, setIsOpen] = useState<boolean>(false)

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
            <div className='container mx-auto px-4 pt-3 bg-slate-200'>
                <h1 className="bg-slate-300 text-center">Recipe Search</h1>
                <div className='py-6'>
                    <input
                        type="text"
                        placeholder="Meal or Recipe"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className='px-3 py-3' onClick={searchRecipes}>Search</button>
                </div>
                <ul>
                    {results.map((recipe) => (
                        <div className='py-2'>
                            <div className='bg-slate-300 max-w-xs px-1 py-1 rounded'>
                                <li key={recipe.id}>{recipe.title}</li>
                                <button className='border-solid border-2 border-slate-700 rounded' key={`button_${recipe.id}`} value={recipe.id} onClick={handleRecipeSelect}>See Recipe Info</button>
                            </div>
                        </div>
                    ))}
                    {selectedRecipe && <Modal setIsOpen={setIsOpen} props={renderRecipeInfo()}/>}
                </ul>
            </div>
        </RootLayout>
    );
}

export default RecipeSearch

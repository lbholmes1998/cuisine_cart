//pages/RecipeSearch.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import RecipeInformation from './RecipeInformation';
import RootLayout from '@/app/layout';
import Modal from '@/components/Modal';
import Image from 'next/image'
import test from 'node:test';

interface Recipe {
    id: number,
    title: string,
    image: string,
    imageType: string
}

interface TestResponse {
    message: string
}

type Props = {
    onClick?: React.MouseEventHandler
}

const RecipeSearch: React.FC = () => {
    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<Recipe[]>([]);  // Expect array in format of Recipe interface.
    const [selectedRecipe, setSelectedRecipe] = useState<number>()
    const [recipeTitle, setRecipeTitle] = useState<string>()
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const searchRecipes = async () => {
        try {
            const response = await axios.get(`/api/search/${query}`)
            setResults(response.data.data)
        } catch (error) {
            console.error(`Error search for recipe: ${error}`)
        }
    }

    const handleRecipeSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        const recipeButton: HTMLButtonElement = event.currentTarget
        let recipeID: number = +recipeButton.value
        setIsOpen(true)
        setSelectedRecipe(recipeID)
        setRecipeTitle(recipeButton.id)
    }

    const renderRecipeInfo = () => {
        if (selectedRecipe !== undefined) {
            return <RecipeInformation recipeID={selectedRecipe} />
        }
    }


    // function handleRecipeSelect({ onClick }: Props) {
    //     setSelectedRecipe()
    // }

    return (
        <RootLayout>

            <div className="container xl min-h-full m-auto">
                <div className="flex items-end justify-center p-4 text-center">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all p-8 min-w-full">
                        <h1 className="bg-slate-100 max-w-sm text-center text-2xl mx-auto">Recipe Search</h1>

                        <div id='search' className='flex justify-center pt-5'>
                            <input
                                className='px-1 rounded-sm shadow-md'
                                type="text"
                                placeholder="Meal or recipe name"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button className='ml-5 mt-1 shadow-sm justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto' onClick={searchRecipes}>Search</button>
                        </div>
                        <div className='grid grid-cols-3' id='recipeCards'>
                            {results.map((recipe) => (
                                <div key={recipe.title} className='mx-auto py-5'>
                                    <div className='w-80 h-96 bg-slate-200 px-1 py-2 rounded-md'>
                                        <h1 className={'py-1 text-xl text-center'} key={recipe.id}>{recipe.title}</h1>
                                        <Image
                                            className='py-4 mx-auto w-auto'
                                            src={recipe.image}
                                            width={200}
                                            height={200}
                                            alt="Picture of recipe"
                                        />
                                        <p className='px-2 py-2'>Recipie Summary will go here</p>
                                        <button className='mx-auto justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' key={`button_${recipe.id}`} id={recipe.title} value={recipe.id} onClick={handleRecipeSelect}>See Recipe Info</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {isOpen && <Modal setIsOpen={setIsOpen} props={{ recipeTitle: recipeTitle, recipeContent: renderRecipeInfo() }} />}
            </div>
        </RootLayout>
    );
}

export default RecipeSearch

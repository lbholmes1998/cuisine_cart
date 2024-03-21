//pages/RecipeSearch.tsx
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

import axios, { AxiosResponse } from 'axios';
import RecipeInformation from './RecipeInfo';
import RootLayout from '@/app/layout';
import Modal from './modal';
import Image from 'next/image'
import test from 'node:test';
import fetchRecipes from '@/lib/fetchRecipes';
import { RecipeResults } from '@/models/Recipes';


type Props = {
    recipeTopic? : string | undefined // union type
}
// TODO - Eventually add online shopping list to users ingredients.

export default async function RecipeGallery({ recipeTopic }: Props) {


    // TODO - Move recipe info logic + comp to separate file

    // const [query, setQuery] = useState<string>('')
    // const [results, setResults] = useState([]);  // Expect array in format of Recipe interface.
    // const [selectedRecipe, setSelectedRecipe] = useState<number>()
    // const [recipeTitle, setRecipeTitle] = useState<string>()
    // const [isOpen, setIsOpen] = useState<boolean>(false)

    // const [search, setSearch] = useState('');
    // const router = useRouter();

    // let recipeResults: any | undefined;


    // const handleRecipeSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     const recipeButton: HTMLButtonElement = event.currentTarget
    //     let recipeID: number = +recipeButton.value
    //     setIsOpen(true)
    //     setSelectedRecipe(recipeID)
    //     setRecipeTitle(recipeButton.id)
    // }

    // const renderRecipeInfo = () => {
    //     if (selectedRecipe !== undefined) {
    //         return <RecipeInformation recipeID={selectedRecipe} />
    //     }
    // }

    const url = !recipeTopic 
        ? "https://api.spoonacular.com/recipes/complexSearch?query="
        : `https://api.spoonacular.com/recipes/complexSearch?query=${recipeTopic}`

    const recipes: RecipeResults | undefined = await fetchRecipes(url)

    if (!recipes) return <h2 className='m-4 text-2x1 font-bold'>No recipes found!</h2>


    return (
        <div className="container xl min-h-full m-auto">
            <div className="flex items-end justify-center p-4 text-center">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all p-8 min-w-full">
                    <h1 className="bg-slate-100 max-w-sm text-center text-2xl mx-auto">Results for: {recipeTopic}</h1>
                    <div className='grid grid-cols-3' id='recipeCards'>
                        {recipes.results.map(recipe => (
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
                                    {/* <p className='px-2 py-2'>Recipe Summary will go here</p> */}
                                    {/* <button className='mx-auto justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' key={`button_${recipe.id}`} id={recipe.title} value={recipe.id} onClick={handleRecipeSelect}>See Recipe Info</button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* {isOpen && <Modal setIsOpen={setIsOpen} props={{ recipeTitle: recipeTitle, recipeContent: renderRecipeInfo() }} />} */}
        </div>
    );
}

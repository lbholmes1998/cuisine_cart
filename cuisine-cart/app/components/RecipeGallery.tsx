//pages/RecipeSearch.tsx
import React from 'react';
import Image from 'next/image'
import fetchRecipes from '@/lib/fetchRecipes';
import { RecipeResults } from '@/models/Recipes';
import RecipeInfoButton from './RecipeInfoButton';


type Props = {
    recipeTopic? : string | undefined, // union type
}
// TODO - Eventually add online shopping list to users ingredients.

export default async function RecipeGallery({ recipeTopic }: Props) {
    
    const url = !recipeTopic 
        ? "https://api.spoonacular.com/recipes/complexSearch?query="
        : `https://api.spoonacular.com/recipes/complexSearch?query=${recipeTopic}`

    const recipes: RecipeResults | undefined = await fetchRecipes(url)

    if (!recipes) return <h2 className='m-4 text-2x1 font-bold'>No recipes found!</h2>


    return (
        <div className="container xl min-h-full m-auto">
            <div className="flex items-end justify-center p-4 text-center">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all p-8 min-w-full">
                    { recipeTopic !== undefined ? <h1 className="bg-slate-100 max-w-sm text-center text-2xl mx-auto">Results for: {recipeTopic}</h1> : <h1>Random Recipes</h1>}
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
                                    <RecipeInfoButton recipeId={recipe.id}></RecipeInfoButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

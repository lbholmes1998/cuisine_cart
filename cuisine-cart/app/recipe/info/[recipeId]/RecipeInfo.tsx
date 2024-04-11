'use client'

//pages/RecipeInformation.tsx
import React from 'react'
import fetchRecipeInfo from '@/lib/fetchRecipeInfo';
import { RecipeInfoResults, RecipeIngredients } from '@/models/RecipeInfo';  //types
import type { Photo } from '@/models/Images';
import { useRouter } from 'next/navigation';


type Props = {
    recipeId: number
}

export default async function RecipeInfo({ recipeId }: Props) {
    
    const router = useRouter();

    const recipeInfo: RecipeInfoResults | undefined = await fetchRecipeInfo(recipeId)
    
    const dummyImageInfo: Photo | undefined = {
        id: 12345,
        width: 123,
        height: 123,
        url: "Url to image",
        src: {
            large: "foo foo bar bar"
        },
        alt: "Alt text for image"
    }

    if (!recipeInfo) return <h2 className='m-4 text-2x1 font-bold'>Unable to load recipe info!</h2>

    return (
        // TODO - Create info panel with cusines, diets, vegan/vegetarian status, etc.
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
                            
                            <button onClick={() => {router.back()}}>Go Back</button>
                            
                            <section id='recipeHeaderInfo' className=''>
                                <h1 id="modal-title" className="text-2xl text-center font-semibold text-gray-900 bg-slate-100">{recipeInfo.title}</h1>
                                <h2 id="recipe-credits" className="text-lg text-center font-semibold text-gray-900 bg-slate-100">By: {recipeInfo.creditsText}</h2>
                                <h3 className='text-xs font-bold mb-3 text-gray-900 bg-slate-100'>Likes: {recipeInfo.aggregateLikes}</h3>
                            </section>

                            <div id='recipeInfoContainer' className="container divide-y divide-solid ">
                                <div id='recipeInfoPanel' className='my-2'>
                                    <h2 className='font-bold mb-1'>Servings: {recipeInfo.servings}</h2>
                                    <h2 className='font-bold mb-1'>Aprox. Price Per Serving: ${(recipeInfo.pricePerServing / 100).toFixed(2)}</h2>
                                    
                                    
                                    <section id='recipe-diets' className='my-3'>
                                        <p className='font-bold'>Diets: </p>
                                        {recipeInfo.vegetarian && <h2 className='font-bold mb-3'>Vegetarian </h2> }
                                        {recipeInfo.vegan && <h2 className='font-bold mb-3'>Vegan </h2>}
                                        {recipeInfo.diets.map((diet) => (
                                            <p>{diet}</p>
                                        ))}
                                    </section>
                                    
                                    <section id='recipe-dishTypes' className='my-3'>
                                        <h2 className='font-bold'>Dish Types: </h2>
                                        {recipeInfo.dishTypes.map((type) => (
                                            <p>{type}</p>
                                        ))}
                                    </section>
                                </div>

                                <div id='recipeIngredients' className='my-2'>
                                    <h1 className='font-bold my-2'>Ingredients</h1>
                                    {recipeInfo.extendedIngredients.map((ingredient: RecipeIngredients) => (
                                        <section>
                                            <p>{ingredient.measures.metric.amount} {ingredient.measures.metric.unitLong} - {ingredient.name}</p>
                                        </section>
                                    ))}
                                </div>
                                
                                <div id='recipeInstructions'>
                                    <h1 className='my-2 text-xl font-bold'>Instructions</h1>
                                    <p>{recipeInfo.instructions}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/**
                <h1>{recipeInfo.title}</h1>
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
            **/}
        </div>
    )
}

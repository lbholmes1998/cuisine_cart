//pages/RecipeInformation.tsx
import React, { useState, useEffect } from 'react'
import fetchRecipeInfo from '@/lib/fetchRecipeInfo';
import { RecipeInfoResults } from '@/models/RecipeInfo';
import type { Photo } from '@/models/Images';


type Props = {
    recipeId: number
}

export default async function RecipeInfo({ recipeId }: Props) {

    // const recipeInfo: RecipeInfoResults | undefined = await fetchRecipeInfo(recipeId)
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

    // if (!recipeInfo) return <h2 className='m-4 text-2x1 font-bold'>Unable to load recipe info!</h2>

    return (
        <div>
            <h1>TITLE</h1>
            <h2 className='font-bold mb-3'>No of likes: 12356</h2>
            {/* <h2 className='font-bold mb-3'>Diet/s: {recipeInfo.diets}</h2> */}
            <h1 className='text-xl font-bold mb-3'>Ingredients</h1>
            <div key={dummyImageInfo.id}>
                <h2 className='text-base font-semibold pb-1'>{dummyImageInfo.url}</h2>
                <p className='mb-2'>{dummyImageInfo.alt}</p>
            </div>
            <h1 className='pt-3 text-xl font-bold mb-3'>Instructions</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum voluptates alias molestiae ducimus quam ipsa beatae neque architecto soluta! Dolore perspiciatis doloremque ut nobis voluptates, repellat error obcaecati voluptatem iure.</p>
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

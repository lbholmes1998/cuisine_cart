'use client'

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    recipeId? : number | undefined, // union type
}

export default function RecipeInfoButton({ recipeId }: Props) {

    //const [recipeId, setRecipeId] = useState('');
    const router = useRouter();

    const handleClick = () => {
        router.push(`/recipe/info/${recipeId}`)
        //setRecipeId('')
    }

    return (

        <button className='ml-[111.5px] mt-[13.25px] justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' onClick={handleClick}>More details</button>
    );
}

'use client'

//pages/RecipeSearch.tsx
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// TODO - Split this page in two - have search form here, which then sends data to other comp to handle actual fetching code

export default function RecipeSearch() {

    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        router.push(`/recipe/${search}`)
        setSearch('')
    }

    return (

        <form className='flex justify-center md:justify-between' 
        onSubmit={handleSubmit}>
            <input
                className='px-1 rounded-sm shadow-md w-[260px]'
                type="text"
                placeholder="Meal or recipe name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    );
}

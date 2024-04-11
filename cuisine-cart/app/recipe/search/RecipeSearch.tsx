'use client'

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipeSearch() {

    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        router.push(`/recipe/search/${search}`)
        setSearch('')
    }

    return (

        <form className='flex justify-center md:justify-between' 
        onSubmit={handleSubmit}>
            <input
                className="bg-white p-2 w-[260px] sm:w-80 text-xl rounded-xl text-black m-auto"
                type="text"
                placeholder="Meal or recipe name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    );
}

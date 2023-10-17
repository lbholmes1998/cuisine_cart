//pages/RecipeSearch.tsx
import React, { useState } from 'react';
import axios from 'axios'

interface Recipe {
    id: number,
    title: string,
    image: string,
    imageType: string
}

const RecipeSearch: React.FC = () => {
    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<Recipe[]>([]);  // Expect array in format of Recipe interface. 

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

    return (
        <div>
            <h1>Recipe Search</h1>
            <input
                type="text"
                placeholder="Enter Search Query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={searchRecipes}>Search</button>
            <ul>
                {results.map((recipe) => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeSearch
//pages/RecipeInformation.tsx
import React, {useState} from 'react'
import axios from 'axios'

// PASS RECIPE ID FROM RECIPESEARCH PAGE AS PROPS

// USE PASSED IN PROPS TO SEND REQUEST FOR RECIPES INFO

interface RecipeInfo {

}



interface RecipeProps {
    recipeID: number
}

const RecipeInformation: React.FC<RecipeProps> = (props) => {
    const [results, setResults] = useState<RecipeInfo[]>([]);  // Expect array in format of Recipe interface.
    const getRecipeInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/recipes/info?id=${props.recipeID}`)
            const data = await response.data.results;  // TS expects array type, not having 'await' gives 'response' the 'promise' type which causes errors.
            console.log(data)
            setResults(data)
    
        } catch (error) {
            console.error(`Error search for recipe: ${error}`)
        }
    }

    getRecipeInfo()

    return (
        <div>
            <h1>Recipe Info</h1>
            {/* <input
                type="text"
                placeholder="Enter Search Query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={getRecipeInfo}>Search</button> */}
            {/* <ul>
                {results.map((recipe) => (
                    <div>
                        <li key={recipe.id}>{recipe.title}</li>
                    </div>
                ))}
            </ul> */}
        </div>
    )
}

export {RecipeInformation}
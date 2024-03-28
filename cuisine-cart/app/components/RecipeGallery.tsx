//pages/RecipeSearch.tsx
import React from 'react';
import fetchRecipes from '@/lib/fetchRecipes';
import fetchRandomRecipes from '@/lib/fetchRandomRecipes';
import { RecipeResults, RandomRecipeResults } from '@/models/Recipes';  //type
import RecipeInfoButton from './RecipeInfoButton';
import ImgContainer from './ImgContainer';
import addBlurredDataUrls from '@/lib/getBase64';



type Props = {
    recipeTopic? : string | undefined, // union type
}
// TODO - Eventually add online shopping list to users ingredients.

export default async function RecipeGallery({ recipeTopic }: Props) {

    // TODO - Add placeholder images so i don't use all of my api requests
    // const placeHolderUrl = "https://images.unsplash.com/photo-1621961458348-f013d219b50c"
    
    const recipeUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeTopic}&number=9`
    const randomRecipeUrl = "https://api.spoonacular.com/recipes/random?number=9" // Fetch random recipes of page load

    let recipes: RecipeResults | undefined;
    let randomRecipes: RandomRecipeResults | undefined;

    recipeTopic ? recipes = await fetchRecipes(recipeUrl) : randomRecipes = await fetchRandomRecipes(randomRecipeUrl)
    
    if (!recipes && !randomRecipes) return <h2 className='m-4 text-2x1 font-bold'>No recipes found!</h2>
    
    // const imagesWithBlur = await addBlurredDataUrls(recipes) // Says theres an error but doesnt effect app functionality.

    return (
        <section className="px-2 my-3 grid gap-2 grid-cols-gallery">
            {/* { recipeTopic !== undefined ? <h1 className="bg-slate-100 max-w-sm text-center text-2xl mx-auto">Results for: {recipeTopic}</h1> : <h1>Random Recipes</h1>} */}
                {recipeTopic !== undefined ?
                    (recipes && recipes.results.map(recipe => (
                        <ImgContainer key={recipe.id} image={recipe} />
                    )))
                    :
                    (randomRecipes && randomRecipes.recipes.map(recipe => (
                        <ImgContainer key={recipe.id} image={recipe} />
                    )))
                }
        </section>
    );
}

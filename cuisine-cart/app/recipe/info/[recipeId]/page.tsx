// Show information on a selected recipe

import RecipeInfo from "@/app/recipe/info/[recipeId]/RecipeInfo";

// TODO - Eventually add online shopping list to users ingredients.

type Props = {
    params: {
        recipeId: number
    }
}

export function generateMetadata() {
    return {
        title: `Recipe Info`
    }
}

export default function RecipeSearchResults({ params: {recipeId}}: Props) {
    return (
        <RecipeInfo recipeId={recipeId}/>
    );
}

// Shows search results from ingredients / cuisine search

import RecipeGallery from "@/app/gallery/RecipeGallery";

// TODO - Eventually add online shopping list to users ingredients.

type Props = {
    params: {
        term: string
    }
}

export function generateMetadata({ params: {term}}: Props) {
    return {
        title: `Results for ${term}`
    }
}

export default function RecipeSearchResults({ params: {term}}: Props) {
    return (
        <RecipeGallery recipeTopic={term}/>
    );
}


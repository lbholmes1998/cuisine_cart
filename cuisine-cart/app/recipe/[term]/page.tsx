//pages/RecipeSearch.tsx
import RecipeGallery from "@/app/components/RecipeGallery";


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
    console.log(term)
    return (
        <RecipeGallery recipeTopic={term}/>
    );
}


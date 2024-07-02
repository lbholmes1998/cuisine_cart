import clientPromise from "./mongodb";
import { getSession } from '@auth0/nextjs-auth0';
import FetchUserInfo from "./fetchUserInfo";
import { RecipeInfoResults} from '@/models/RecipeInfo';  //types

// Adds recipe name & URL to users database document

interface SavedRecipe {
    url: string | undefined,
    name: string | undefined
}

// export default async function SaveRecipe(recipeInfo: SavedRecipe) {
//     const session = await getSession()
//     const user = await session?.user

//     const client = await clientPromise
//     const db = await client.db("cuisine_cart")

//     try {
//         // test if we can update array
//         const update = await db.collection("users").updateOne({email: user?.email}, {$addToSet:{savedRecipes: {name: recipeInfo.name, url: recipeInfo.url}}})
//     } catch(e) {
//         console.log(e)
//     }
// }

export default async function addRecipeToDb(recipe:SavedRecipe) {
    const session = await getSession()
    const user = await session?.user
    try {
        if (recipe) {
            const response = await fetch('/api/db/saveRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user?.email,
                    url: recipe.url,
                    name: recipe.name
                })
            })
        }
    } catch (e) {
        console.log("Error sending user info to server!", e)
    }
}

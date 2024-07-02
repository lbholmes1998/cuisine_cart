import clientPromise from "./mongodb";
import { getSession } from '@auth0/nextjs-auth0';

// Adds recipe name & URL to users database document
export default async function SaveRecipe(recipeUrl: string) {
    const session = await getSession()
    const user = await session?.user

    const client = await clientPromise
    const db = await client.db("cuisine_cart")

    try {
        const updateSaved = {}
    } catch(e) {
        console.log(e)
    }
}

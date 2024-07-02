import {NextResponse} from "next/server"
import clientPromise from "@/lib/db/mongodb";

export const POST = async (req, res) => {
    try {
        const client = await clientPromise
        const db = await client.db("cuisine_cart")

        // Extract username and email from request body
        const { url, name, email } = await req.json()

        // check if username and email are provided
        if (!url || !name) {
            throw new NextResponse('recipe url and name are required')
        }
        
        const update = await db.collection("users").updateOne({email: email}, {$addToSet:{savedRecipes: {name: recipeInfo.name, url: recipeInfo.url}}})
        return new NextResponse({message: "User successfully added to database", userData: user})

    } catch (e) {
        throw new Error('Error', e)
    }
}

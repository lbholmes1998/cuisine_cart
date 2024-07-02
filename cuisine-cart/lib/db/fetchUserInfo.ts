import clientPromise from "./mongodb";
import { getSession } from '@auth0/nextjs-auth0';

// Fetches information on a user (username, email, userId, saved recipes)

export default async function FetchUserInfo() {
    const session = await getSession()
    const user = await session?.user

    const client = await clientPromise
    const db = await client.db("cuisine_cart")

    try {
        // Get user info using username
        const result = await db.collection("users").findOne({email: user?.email}) // returns cursor
        console.log(result)
        return result
    } catch (e) {
        console.log(e)
    }
    
}

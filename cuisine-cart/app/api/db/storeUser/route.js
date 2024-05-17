import {NextResponse} from "next/server"
import clientPromise from "@/lib/mongodb";

export const POST = async (req, res) => {
    try {
        const client = await clientPromise
        const db = await client.db("cuisine_cart")

        // Extract username and email from request body
        const { username, email } = await req.json()

        // check if username and email are provided
        if (!username || !email) {
            throw new NextResponse('Username and email are required')
        }
        
        // Check if user already exists on the database.
        const existingUser = await db.collection("users").findOne({ email });
        
        // If user doesnt exist, add users info to database
        if(existingUser) {
            return new NextResponse({message: "User already exists on database"})
        } else {
            const user = await db.collection("users").insertOne({
                email,
                username,
                isAdmin: false
            })
            return new NextResponse({message: "User successfully added to database", userData: user})
        }

    } catch (e) {
        throw new Error('Error', e)
    }
}

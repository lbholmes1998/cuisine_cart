import {NextResponse} from "next/server"
import clientPromise from "@/lib/mongodb";

async function connectToDB() {
    const client = await clientPromise
    return client.db("cuisine_cart")
    
}

async function checkUserExists(email, db){
    // Check if user already exists on the database
    return await db.collection("users").findOne({ email });
}

async function addUser(email, username, db){
    // Add new entry with users information
    const user = await db.collection("users").insertOne({
        email,
        username,
        isAdmin: false
    })

    return user
}

export const POST = async (req, res) => {
    try {
        // Extract username and email from request body
        const { username, email } = await req.json()

        // check if username and email are provided
        if (!username || !email) {
            throw new NextResponse('Username and email are required')
        }

        // Connect to Mongo
        const db = await connectToDB()

        // Check if user already exists on the database.
        const existingUser = await checkUserExists(email, db)
        
        // If user doesnt exist, add users info to database
        if(existingUser) {
            return new NextResponse({message: "User already exists on database"})
        } else {
            const user = await addUser(email, username, db)
            return new NextResponse({message: "User successfully added to database", userData: user})
        }

    } catch (e) {
        throw new Error('Error', e)
    }
}

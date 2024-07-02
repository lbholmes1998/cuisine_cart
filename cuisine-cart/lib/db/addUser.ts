import genId from "@/lib/generateUserID";

interface User {
    email: string
}

export default async function addUserDataToDb(user:User) {
    try {
        if (user) {
            const response = await fetch('/api/db/storeUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    // UserId is first 5 chars of email + random string
                    userId: user.email.slice(0,5) + genId(6)
                })
            })
        }
    } catch (e) {
        console.log("Error sending user info to server!", e)
    }
}

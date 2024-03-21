import { cleanEnv, str } from "envalid";
import dotenv from 'dotenv';
dotenv.config();
// Add type safety to environment variables
const env = cleanEnv(process.env, {
    NEXT_PUBLIC_SPOONACULAR_API_KEY: str(),
})

export default env
import React from "react";
import Link from "next/link";
import RecipeSearch from "./recipe/search/RecipeSearch";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Navbar() {
    const { user } = await getSession();
    return (
        <header className="bg-black sticky top-0 z-10 pb-4">

            <nav className="text-white flex flex-col gap-1 sm:flex-row justify-between items-center pt-4 w-[50%] max-w-6xl m-auto">
                <Link href="/">
                    <p>Home</p>
                </Link>
                <Link href="/not-found">
                    <p>Account</p>
                </Link>
                <RecipeSearch />
                <a href="/api/auth/login">
                    <p>Login</p>
                </a>
                {user && (
                    <>
                        <p>Welcome {user.name}!</p>
                        <a href="/api/auth/logout">
                            <p>Logout</p>
                        </a>
                    </>
                )}
            </nav>
        </header>
    )
}

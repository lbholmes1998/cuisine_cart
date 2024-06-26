'use client'

import React, { useEffect } from "react";
import Link from "next/link";
import RecipeSearch from "./recipe/search/RecipeSearch";
import { useUser } from '@auth0/nextjs-auth0/client';
import addUserDataToDb
 from "@/lib/db/addUser";
export default function Navbar() {
    const { user, error } = useUser();

    useEffect(() => {
        // Execute add user function when user name changes
        // Just realised this will eventually fail once username changes are implemented (future me's problem)
        addUserDataToDb(user)
    }, [user?.name])

    return (
        <header className="bg-black sticky top-0 z-10 pb-4">

            <nav className="text-white flex flex-col gap-1 sm:flex-row justify-between items-center pt-4 w-[50%] max-w-6xl m-auto">
                <Link href="/">
                    <p>Home</p>
                </Link>
                <RecipeSearch />
                {!user && (
                    <a href="/api/auth/login">
                        <p>Login</p>
                    </a>
                )}
                {user && (
                    <>
                        <p>Welcome {user.email}!</p>
                        <Link href="/user">
                            <p>Account</p>
                        </Link>
                        <a href="/api/auth/logout">
                            <p>Logout</p>
                        </a>
                    </>
                )}
            </nav>
        </header>
    )
}

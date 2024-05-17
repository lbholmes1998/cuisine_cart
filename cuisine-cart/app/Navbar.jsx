'use client'

import React, { useEffect } from "react";
import Link from "next/link";
import RecipeSearch from "./recipe/search/RecipeSearch";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
    const { user, error } = useUser();

    useEffect(() => {
        const addUserDataToDb = async () => {
            try {
                if (user) {
                    const response = await fetch('/api/db/storeUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: user.name,
                            email: user.email,
                        })
                    })
                }
            } catch (e) {
                throw new Error("Error sending user info to server!", e)
            }
        }
        addUserDataToDb()
    }, [user?.name])

    return (
        <header className="bg-black sticky top-0 z-10 pb-4">

            <nav className="text-white flex flex-col gap-1 sm:flex-row justify-between items-center pt-4 w-[50%] max-w-6xl m-auto">
                <Link href="/">
                    <p>Home</p>
                </Link>
                <RecipeSearch />
                <a href="/api/auth/login">
                    <p>Login</p>
                </a>
                {user && (
                    <>
                        <p>Welcome {user.name}!</p>
                        <Link href="/not-found">
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

import React from "react";
import Link from "next/link";
import RecipeSearch from "./recipe/search/RecipeSearch";

const Navbar = () => {

    return (
        <header className="bg-black sticky top-0 z-10 pb-4">

            <nav className="text-white flex flex-col gap-1 sm:flex-row justify-between items-center pt-4 w-[50%] max-w-6xl m-auto">
                <h1 className="">
                    <Link href="/">
                        <p>Home</p>
                    </Link>
                </h1>
                <h1>
                    <Link href="/not-found">
                        <p>Account</p>
                    </Link>
                </h1>
                <h1>
                    <Link href="/not-found">
                        <p>Log in / Sign up</p>
                    </Link>
                </h1>

                <RecipeSearch />
            </nav>
        </header>
    )
}



export default Navbar;

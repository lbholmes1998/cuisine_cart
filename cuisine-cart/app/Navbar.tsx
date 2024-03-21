import React from "react";
import Link from "next/link";
import RecipeSearch from "./components/RecipeSearch";

const Navbar = () => {

    return (
        <header className="bg-black sticky top-0 z-10">
                <nav className="text-white flex flex-col gap-1 sm:flex-row sm:justify-between items-center pt-4 max-w-6xl m-auto">
                    <h1 className="text-center whitespace-nowrap">
                        <Link href="/">
                            <p>Home</p>
                        </Link>
                    </h1>
                    {/* <h1>
                        <Link href="/recipe/''">
                            <p>Search Recipes</p>
                        </Link>
                    </h1> */}
                    {/* <h1>
                        <Link href="/about">
                            <p>about</p>
                        </Link>
                    </h1> */}
                    <RecipeSearch/>
                </nav>
        </header>
    )
}



export default Navbar;

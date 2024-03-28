import RecipeGallery from "./components/RecipeGallery";
import Gallery from "./components/ImagesGallery";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div id="welcome" className="m-auto">
        <h1 className="text-center text-4xl pt-5">Cuisine Cart</h1>
        <h2 className="text-center text-1xl">Welcome back [username]!</h2>
        <a className='mx-auto justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-400' href="https://www.pexels.com">Photos provided by Pexels</a>
      </div>

      <div id="recipes" className="container mx-auto pt-5 text-2xl">
        {/* <RecipeGallery /> TODO - remember to uncomment this when done with dev*/}
        <Gallery />
      </div>
    </div>
  );
}

import RecipeGallery from "./components/RecipeGallery";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div id="welcome" className="m-auto">
        <h1 className="text-center text-4xl pt-5">Cuisine Cart</h1>
        <h2 className="text-center text-1xl">Welcome back [username]!</h2>
      </div>

      <div id="Random Recipes" className="container mx-auto pt-5 text-2xl">
        <RecipeGallery />
      </div>
    </div>
  );
}

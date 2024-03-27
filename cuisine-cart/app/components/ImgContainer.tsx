import type { Recipe, RandomRecipe } from "@/models/Recipes"; // type
import type { Photo } from "@/models/Placeholder";
import RecipeInfoButton from './RecipeInfoButton';
import Image from 'next/image'

type Props = {
    recipeImage: Recipe | RandomRecipe
}

// TODO - Have it so recipe name and 'more info' button appear when hovering over image

export default function ImgContainer( {recipeImage}: Props ) {
    return (
        <div className="bg-gray-200 rounded-xl">
            <h1 className={'py-1 text-xl text-center'} key={recipeImage.id}>{recipeImage.title}</h1>
            <div className="h-[300px] bg-gray-200 rounded-xl relative overflow-hidden">
                <Image
                    className="m-auto object-cover group-hover:opacity-75"
                    src={recipeImage.image}
                    fill={true}
                    sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
                    alt="Picture of recipe"
                    placeholder="blur"
                    blurDataURL={recipeImage.blurredDataUrl}

                />
            </div>
            <RecipeInfoButton recipeId={recipeImage.id}></RecipeInfoButton>
        </div>
    )
}

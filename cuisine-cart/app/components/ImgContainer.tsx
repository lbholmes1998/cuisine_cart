import type { Recipe } from "@/models/Recipes"; // type
import type { Photo } from "@/models/Images";
import RecipeInfoButton from './RecipeInfoButton';
import Image from 'next/image'



// TODO - Have it so recipe name and 'more info' button appear when hovering over image
// TODO - Remember to revert code back to supporting recipes when finished with dev!

type Props = {
    image: Recipe
}

export default function ImgContainer( {image}: Props ) {
    return (
        <div className="bg-gray-200 h-[400px] rounded-xl">
            <h1 className='py-1 text-xl text-center' key={image.id}>{image.title}</h1>
            <div className="h-[300px] relative overflow-hidden">
                <Image
                    className="m-auto object-cover group-hover:opacity-75"
                    src={image.url}
                    fill={true}
                    // width={"250"}
                    // height={"250"}
                    alt="Picture of recipe"
                    // placeholder="blur"
                    // blurDataURL={image.blurredDataUrl}
                />
            </div>
            <RecipeInfoButton recipeId={image.id}></RecipeInfoButton>
        </div>
    )
}

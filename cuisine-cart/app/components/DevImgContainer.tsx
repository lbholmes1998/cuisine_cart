import type { Photo } from "@/models/Images"
import Image from "next/image"
import RecipeInfoButton from '../recipe/info/RecipeInfoButton';

type Props = {
    photo: Photo
}

export default function ImgContainer({ photo }: Props) {
    return (
        <div className="bg-gray-200 h-[385px] rounded-xl">
            <h1 className="text-center">RECIPE TITLE</h1>
            <div className="h-[300px] relative overflow-hidden">
                <Image
                    src={photo.src.large}
                    alt={photo.alt}
                    fill={true}
                    sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
                    placeholder="blur"
                    blurDataURL={photo.blurredDataUrl}
                    className="object-cover group-hover:opacity-75"
                />
            </div>
            <RecipeInfoButton recipeId={photo.id}></RecipeInfoButton>
        </div>
    )
}

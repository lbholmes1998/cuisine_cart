import { getPlaiceholder } from "plaiceholder";
import type { Recipe, RecipeResults, RandomRecipeResults } from "@/models/Recipes"  // types

// This only works with random recipes!

// use plaiceholder library to return covert recipe image into a low-res image, encoded as a Base64 string
async function getBase64(imageUrl: string) {

    try {
        const res = await fetch(imageUrl)

        if (!res.ok) {
            throw new Error(`Failed to fetch image: ${res.status} - ${res.statusText}`)
        }

        const buffer = await res.arrayBuffer()

        const { base64 } = await getPlaiceholder(Buffer.from(buffer))

        return base64
    } catch (e) {
        if (e instanceof Error) console.log(e.stack)
    }
}

export default async function addBlurredDataUrls(images: RecipeResults | RandomRecipeResults): Promise<Recipe[]> {
    // Fetch in parralel - make all requests at once instead of awaiting each on to resolve - avoid waterfall
    const base64Promises = images.results.map(image => getBase64(image.url))

    // Resolve all promises in order
    const base64Results = await Promise.all(base64Promises)

    const imagesWithBlur: Recipe[] = images.results.map((image, i) => {
        image.blurredDataUrl = base64Results[i]
        return image
    })

    return imagesWithBlur
}

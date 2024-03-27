import { z } from 'zod'

// TODO - Add support for pagination

// I have commited many sins in this file, forgive me.


// Basic recipe schema
const BasicRecipeSchema = z.object({
    "number": z.number().optional(),
    "offset": z.number().optional(),
    "totalResults": z.number().optional(),
})

// Recipe Details schema
const RecipeSchema = z.object({
    "id": z.number(),
    "title": z.string(),
    "image": z.string(),
    "imageType": z.string().optional(),
    "blurredDataUrl": z.string().optional(),  // Doesnt come from API - added manually
}).transform(({image, ...rest}) => ({
    // Edit incoming object key names
    "url": image,
    ...rest
}))

const BasicRandomRecipeSchema = z.object({})

const RandomRecipeSchema = z.object({
    "id": z.number(),
    "title": z.string(),
    "image": z.string(),
    "imageType": z.string(),
}).transform(({image, ...rest}) => ({
    // Edit incoming object key names
    "url": image,
    ...rest
}))

export const RecipeSchemaWithPhotos = BasicRecipeSchema.extend({
    results: z.array(RecipeSchema)
})

export const RandomRecipes = BasicRandomRecipeSchema.extend({
    recipes: z.array(RandomRecipeSchema)
})

// infer ts types
export type Recipe = z.infer<typeof RecipeSchema>
export type RecipeResults = z.infer<typeof RecipeSchemaWithPhotos>
export type RandomRecipeResults = z.infer<typeof RandomRecipes>

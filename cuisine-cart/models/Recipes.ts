import { z } from 'zod'

// TODO - Add support for pagination


// Basic recipe schema
const BasicRecipeSchema = z.object({
    "number": z.number(),
    "offset": z.number(),
    "totalResults": z.number(),
})

const BasicRandomRecipeSchema = z.object({})

// Basic recipe info schema
const RecipeSchema = z.object({
    "id": z.number(),
    "title": z.string(),
    "image": z.string(),
    "imageType": z.string(),
})

const RandomRecipeSchema = z.object({
    "id": z.number(),
    "title": z.string(),
    "image": z.string(),
    "imageType": z.string(),
})

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

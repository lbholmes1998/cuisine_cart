import { z } from 'zod'

// TODO - Add support for pagination


// Basic recipe schema
const BasicRecipeSchema = z.object({
    "number": z.number(),
    "offset": z.number(),
    "totalResults": z.number(),
})

// Basic recipe info schema
const RecipeSchema = z.object({
    "id": z.number(),
    "title": z.string(),
    "image": z.string(),
    "imageType": z.string(),
})

export const RecipeSchemaWithPhotos = BasicRecipeSchema.extend({
    results: z.array(RecipeSchema)
})


// infer ts types
export type Recipe = z.infer<typeof RecipeSchema>
export type RecipeResults = z.infer<typeof RecipeSchemaWithPhotos>

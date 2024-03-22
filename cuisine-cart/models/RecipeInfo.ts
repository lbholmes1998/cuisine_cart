import { z } from 'zod'

// Basic recipe info schema
const BasicRecipeInfoSchema = z.object({
    "id": z.number(),
    "aggregateLikes": z.number(),
    // "diets": z.string(),
    "title": z.string(),
    "image": z.string(),
    "servings": z.number(),
    "summary": z.string(),
    "instructions": z.string()
})

// const DishTypesSchema = z.array()

// Ingredients info ('extendedIngredients') schema
const RecipeIngredientsSchema = z.object({
    "name": z.string(),
    "measures": z.object({
        "metric": z.object({
            "amount": z.number(),
            "unitLong": z.string()
        })
    })
})

// Combine schemas to match response
export const RecipeInfoWithIngredients = BasicRecipeInfoSchema.extend({
    extendedIngredients: z.array(RecipeIngredientsSchema)
})

// Infer types
export type RecipeIngredients = z.infer<typeof RecipeIngredientsSchema>
export type RecipeInfoResults = z.infer<typeof RecipeInfoWithIngredients>

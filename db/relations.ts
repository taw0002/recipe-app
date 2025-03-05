/**
 * This file defines the relationship configuration for Drizzle ORM.
 * It enhances the schema with proper relationships between tables.
 */

import { relations } from 'drizzle-orm';
import { 
  recipes, 
  ingredients, 
  steps, 
  tags, 
  recipeTags, 
  cookLogs 
} from './schema';

/**
 * Recipe relations configuration
 */
export const recipesRelations = relations(recipes, ({ many }) => ({
  ingredients: many(ingredients),
  steps: many(steps),
  cookLogs: many(cookLogs),
  tags: many(recipeTags),
}));

/**
 * Ingredient relations configuration
 */
export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
}));

/**
 * Step relations configuration
 */
export const stepsRelations = relations(steps, ({ one }) => ({
  recipe: one(recipes, {
    fields: [steps.recipeId],
    references: [recipes.id],
  }),
}));

/**
 * Tag relations configuration
 */
export const tagsRelations = relations(tags, ({ many }) => ({
  recipes: many(recipeTags),
}));

/**
 * RecipeTag relations configuration for many-to-many relationship
 */
export const recipeTagsRelations = relations(recipeTags, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeTags.recipeId],
    references: [recipes.id],
  }),
  tag: one(tags, {
    fields: [recipeTags.tagId],
    references: [tags.id],
  }),
}));

/**
 * CookLog relations configuration
 */
export const cookLogsRelations = relations(cookLogs, ({ one }) => ({
  recipe: one(recipes, {
    fields: [cookLogs.recipeId],
    references: [recipes.id],
  }),
})); 
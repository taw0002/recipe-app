/**
 * This file defines the database schema for the recipe application.
 * It uses Drizzle ORM to define tables and relationships.
 */

import { pgTable, text, integer, serial, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

/**
 * Recipes table - stores basic recipe information
 */
export const recipes = pgTable('recipes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  cookingTime: integer('cooking_time').notNull(),
  averageRating: integer('average_rating').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

/**
 * Ingredients table - stores ingredients for recipes
 */
export const ingredients = pgTable('ingredients', {
  id: uuid('id').defaultRandom().primaryKey(),
  recipeId: uuid('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  order: integer('order').notNull(),
});

/**
 * Steps table - stores preparation steps for recipes
 */
export const steps = pgTable('steps', {
  id: uuid('id').defaultRandom().primaryKey(),
  recipeId: uuid('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  order: integer('order').notNull(),
});

/**
 * Tags table - stores unique tags that can be applied to recipes
 */
export const tags = pgTable('tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
});

/**
 * RecipeTags table - many-to-many relationship between recipes and tags
 */
export const recipeTags = pgTable('recipe_tags', {
  recipeId: uuid('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.recipeId, table.tagId] }),
  };
});

/**
 * CookLogs table - stores cooking logs for recipes
 */
export const cookLogs = pgTable('cook_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  recipeId: uuid('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(),
  rating: integer('rating').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
}); 
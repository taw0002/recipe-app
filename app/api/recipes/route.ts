/**
 * API routes for recipes.
 * This file handles GET (list recipes) and POST (create recipe) requests.
 */

import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/db';
import * as schema from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { cookies } from 'next/headers';

// Define types for our relational data to fix TypeScript errors
type Ingredient = { text: string; order: number };
type Step = { text: string; order: number };
type TagRelation = { tag: { name: string } };
type CookLog = { date: string; rating: number; notes: string | null };

// Extend the recipe type to include relationships
type RecipeWithRelations = {
  id: string;
  name: string;
  description: string;
  image: string;
  cookingTime: number;
  ingredients: Ingredient[];
  steps: Step[];
  tags: TagRelation[];
  cookLogs: CookLog[];
};

/**
 * GET handler for retrieving all recipes with their related data
 */
export async function GET() {
  try {
    // First, fetch all recipes (without relations to avoid the error)
    const dbRecipes = await db.select().from(schema.recipes);
    
    // For each recipe, fetch its related data separately
    const recipesWithRelations = await Promise.all(
      dbRecipes.map(async (recipe) => {
        // Fetch ingredients
        const ingredients = await db
          .select()
          .from(schema.ingredients)
          .where(eq(schema.ingredients.recipeId, recipe.id))
          .orderBy(asc(schema.ingredients.order));
          
        // Fetch steps
        const steps = await db
          .select()
          .from(schema.steps)
          .where(eq(schema.steps.recipeId, recipe.id))
          .orderBy(asc(schema.steps.order));
          
        // Fetch tags via recipeTags
        const recipeTags = await db
          .select({
            recipeId: schema.recipeTags.recipeId,
            tagId: schema.recipeTags.tagId,
            tagName: schema.tags.name
          })
          .from(schema.recipeTags)
          .innerJoin(schema.tags, eq(schema.recipeTags.tagId, schema.tags.id))
          .where(eq(schema.recipeTags.recipeId, recipe.id));
          
        // Fetch cook logs
        const cookLogs = await db
          .select()
          .from(schema.cookLogs)
          .where(eq(schema.cookLogs.recipeId, recipe.id));
          
        // Calculate average rating
        const totalRating = cookLogs.reduce((sum, log) => sum + log.rating, 0);
        const averageRating = cookLogs.length > 0 ? totalRating / cookLogs.length : 0;
          
        // Return the recipe with all its relations
        return {
          id: recipe.id,
          name: recipe.name,
          description: recipe.description,
          image: recipe.image,
          cookingTime: recipe.cookingTime,
          ingredients: ingredients.map(i => i.text),
          steps: steps.map(s => s.text),
          tags: recipeTags.map(t => t.tagName),
          cookLogs: cookLogs.map(log => ({
            date: log.date,
            rating: log.rating,
            notes: log.notes || "",
          })),
          averageRating: averageRating,
        };
      })
    );

    // Return the transformed recipes
    return NextResponse.json(recipesWithRelations);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating a new recipe
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.cookingTime) {
      return NextResponse.json(
        { error: 'Name, description, and cooking time are required' },
        { status: 400 }
      );
    }

    // Start a transaction to ensure all related data is created atomically
    const recipe = await db.transaction(async (tx) => {
      // Insert the recipe
      const [recipe] = await tx
        .insert(schema.recipes)
        .values({
          name: body.name,
          description: body.description,
          image: body.image || "/placeholder.svg?height=400&width=600",
          cookingTime: body.cookingTime,
        })
        .returning();

      // Insert ingredients
      if (body.ingredients && body.ingredients.length > 0) {
        await tx.insert(schema.ingredients).values(
          body.ingredients.map((text: string, index: number) => ({
            text,
            recipeId: recipe.id,
            order: index,
          }))
        );
      }

      // Insert steps
      if (body.steps && body.steps.length > 0) {
        await tx.insert(schema.steps).values(
          body.steps.map((text: string, index: number) => ({
            text,
            recipeId: recipe.id,
            order: index,
          }))
        );
      }

      // Insert tags
      if (body.tags && body.tags.length > 0) {
        // Create or find tags
        for (const tagName of body.tags) {
          // Try to find the tag
          let tag = await tx
            .select()
            .from(schema.tags)
            .where(eq(schema.tags.name, tagName))
            .then(rows => rows[0]);

          // Create the tag if it doesn't exist
          if (!tag) {
            [tag] = await tx
              .insert(schema.tags)
              .values({ name: tagName })
              .returning();
          }

          // Create the recipe-tag relationship
          await tx.insert(schema.recipeTags).values({
            recipeId: recipe.id,
            tagId: tag.id,
          });
        }
      }

      return recipe;
    });

    // Return the created recipe
    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to create recipe' },
      { status: 500 }
    );
  }
} 
/**
 * API routes for individual recipes.
 * This file handles GET, PATCH, and DELETE requests for specific recipes.
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import * as schema from '@/db/schema';
import { eq, and } from 'drizzle-orm';

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
 * GET handler for retrieving a single recipe by ID
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch the recipe from the database with related data
    const recipe = await db.query.recipes.findFirst({
      where: eq(schema.recipes.id, id),
      with: {
        ingredients: {
          orderBy: (ingredients: any, { asc }: any) => [asc(ingredients.order)],
        },
        steps: {
          orderBy: (steps: any, { asc }: any) => [asc(steps.order)],
        },
        tags: {
          with: {
            tag: true,
          },
        },
        cookLogs: true,
      },
    }) as RecipeWithRelations | null;

    // Return 404 if recipe not found
    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the expected frontend format
    const formattedRecipe = {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      image: recipe.image,
      cookingTime: recipe.cookingTime,
      ingredients: recipe.ingredients.map((i: Ingredient) => i.text),
      steps: recipe.steps.map((s: Step) => s.text),
      tags: recipe.tags.map((t: TagRelation) => t.tag.name),
      cookLogs: recipe.cookLogs.map((log: CookLog) => ({
        date: log.date,
        rating: log.rating,
        notes: log.notes || "",
      })),
      averageRating: recipe.cookLogs.length > 0
        ? recipe.cookLogs.reduce((sum: number, log: CookLog) => sum + log.rating, 0) / recipe.cookLogs.length
        : 0,
    };

    // Return the recipe
    return NextResponse.json(formattedRecipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 }
    );
  }
}

/**
 * PATCH handler for updating a recipe
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Check if recipe exists
    const existingRecipe = await db.query.recipes.findFirst({
      where: eq(schema.recipes.id, id),
    });

    if (!existingRecipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Update recipe in a transaction
    const updatedRecipe = await db.transaction(async (tx) => {
      // Update the recipe basic info
      const [recipe] = await tx
        .update(schema.recipes)
        .set({
          name: body.name !== undefined ? body.name : existingRecipe.name,
          description: body.description !== undefined ? body.description : existingRecipe.description,
          image: body.image !== undefined ? body.image : existingRecipe.image,
          cookingTime: body.cookingTime !== undefined ? body.cookingTime : existingRecipe.cookingTime,
        })
        .where(eq(schema.recipes.id, id))
        .returning();

      // Update ingredients if provided
      if (body.ingredients !== undefined) {
        // Delete existing ingredients
        await tx
          .delete(schema.ingredients)
          .where(eq(schema.ingredients.recipeId, id));

        // Insert new ingredients
        if (body.ingredients.length > 0) {
          await tx.insert(schema.ingredients).values(
            body.ingredients.map((text: string, index: number) => ({
              text,
              recipeId: id,
              order: index,
            }))
          );
        }
      }

      // Update steps if provided
      if (body.steps !== undefined) {
        // Delete existing steps
        await tx
          .delete(schema.steps)
          .where(eq(schema.steps.recipeId, id));

        // Insert new steps
        if (body.steps.length > 0) {
          await tx.insert(schema.steps).values(
            body.steps.map((text: string, index: number) => ({
              text,
              recipeId: id,
              order: index,
            }))
          );
        }
      }

      // Update tags if provided
      if (body.tags !== undefined) {
        // Delete existing tag relationships
        await tx
          .delete(schema.recipeTags)
          .where(eq(schema.recipeTags.recipeId, id));

        // Insert new tag relationships
        if (body.tags.length > 0) {
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
              recipeId: id,
              tagId: tag.id,
            });
          }
        }
      }

      return recipe;
    });

    // Return the updated recipe
    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to update recipe' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for removing a recipe
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if recipe exists
    const existingRecipe = await db.query.recipes.findFirst({
      where: eq(schema.recipes.id, id),
    });

    if (!existingRecipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Delete the recipe (cascading will handle related records due to foreign key constraints)
    await db.delete(schema.recipes).where(eq(schema.recipes.id, id));

    // Return success
    return NextResponse.json(
      { message: 'Recipe deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json(
      { error: 'Failed to delete recipe' },
      { status: 500 }
    );
  }
} 
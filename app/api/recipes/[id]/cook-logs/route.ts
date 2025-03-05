/**
 * API routes for recipe cook logs.
 * This file handles POST requests to add new cook logs to recipes.
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * POST handler for adding a new cook log to a recipe
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate required fields
    if (!body.date || body.rating === undefined) {
      return NextResponse.json(
        { error: 'Date and rating are required' },
        { status: 400 }
      );
    }

    // Check if recipe exists
    const recipe = await db.query.recipes.findFirst({
      where: eq(schema.recipes.id, id),
    });

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Add the cook log
    const [cookLog] = await db
      .insert(schema.cookLogs)
      .values({
        recipeId: id,
        date: body.date,
        rating: body.rating,
        notes: body.notes || null,
      })
      .returning();

    // Update the recipe's average rating
    const cookLogs = await db
      .select({ rating: schema.cookLogs.rating })
      .from(schema.cookLogs)
      .where(eq(schema.cookLogs.recipeId, id));

    const totalRating = cookLogs.reduce((sum, log) => sum + log.rating, 0);
    const averageRating = cookLogs.length > 0 ? totalRating / cookLogs.length : 0;

    await db
      .update(schema.recipes)
      .set({ averageRating })
      .where(eq(schema.recipes.id, id));

    // Return the created cook log
    return NextResponse.json(cookLog, { status: 201 });
  } catch (error) {
    console.error('Error adding cook log:', error);
    return NextResponse.json(
      { error: 'Failed to add cook log' },
      { status: 500 }
    );
  }
} 
/**
 * API route for generating recipe descriptions using OpenAI.
 * This endpoint takes recipe details and generates an engaging description.
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { name, ingredients } = await request.json();
    
    // Validate inputs
    if (!name) {
      return NextResponse.json(
        { error: 'Recipe name is required' },
        { status: 400 }
      );
    }

    // Ensure ingredients is an array, even if empty
    const ingredientsList = Array.isArray(ingredients) ? ingredients : [];

    // Generate a system prompt for creating a recipe description
    const prompt = ingredientsList.length > 0 
      ? `
        Create a mouthwatering, engaging description for a recipe called "${name}" with the following ingredients: ${ingredientsList.join(', ')}.
        
        The description should:
        - Be approximately 2-3 sentences long
        - Highlight the key flavors and textures
        - Mention a key cooking technique or special ingredient if applicable
        - Make the reader want to cook this dish immediately
        - Have a warm, inviting tone
        - Avoid clichés and generic phrases
        - Not include "This recipe for X..."
        - Avoid fluffy language
        
        Return just the description text with no additional formatting or commentary.
      `
      : `
        Create a concise description for a recipe called "${name}".
        
        The description should:
        - Be approximately 2-3 sentences long
        - Highlight what this dish might taste like based on its name
        - Make the reader want to cook this dish immediately
        - Have a warm, inviting tone
        - Avoid clichés and generic phrases
        - Not include "This recipe for X..."
        
        Return just the description text with no additional formatting or commentary.
      `;

    // Make the API call
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a professional food writer who creates compelling recipe descriptions." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    // Extract the description from the response
    const description = response.choices[0].message.content?.trim();

    // Return the description
    return NextResponse.json({ description });
  } catch (error: any) {
    console.error('Error generating description:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate description' },
      { status: 500 }
    );
  }
} 
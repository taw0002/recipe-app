/**
 * API route for generating recipe images using OpenAI's DALL-E model.
 * This endpoint takes a recipe description and generates an appropriate image.
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Standard dimensions for all recipe images
const IMAGE_SIZE = "1024x1024"; // Square format for consistency

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { prompt } = await request.json();
    
    // Validate the prompt
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'A valid prompt is required' },
        { status: 400 }
      );
    }

    // Enhanced system prompt for photorealistic food photography with dimension guidance
    const enhancedPrompt = `Create a professional, photorealistic food photography image of ${prompt}. 
    
The image should be:
- Perfectly lit
- Close up on the food
- Ultra high resolution with sharp details
- Photorealistic, as if taken by a professional food photographer
- Featuring beautifully plated food with garnishes
- Shot with a shallow depth of field
- Using a high-end camera with bokeh effect in background
- Composed as a square format image with the food as the central focus
- Shot from a 3/4 angle to show volume and dimension
- Placed on an elegant plate or wooden board
- In a sophisticated setting with minimal props
- Vibrant and appetizing with rich colors
- Without any text, watermarks, or human hands
- Suitable for a high-end cookbook or food magazine

Make sure the dish looks delicious and mouth-watering, and the composition works well in a square format.`;
    
    // Generate the image using DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: IMAGE_SIZE,
      quality: "hd",
      style: "natural",
      response_format: "url",
    });

    // Return the image URL
    return NextResponse.json({
      imageUrl: response.data[0].url
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    );
  }
} 
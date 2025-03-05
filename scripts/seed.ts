/**
 * Recipe Database Seeder
 * 
 * This script populates the database with sample recipe data for development and testing.
 * It includes recipes, ingredients, steps, tags, and cooking logs with different ratings.
 * 
 * Usage: npm run seed
 */

// Load environment variables
import 'dotenv/config';

import db from '../db/index';
import { recipes, ingredients, steps, tags, recipeTags, cookLogs } from '../db/schema';
import { sql } from 'drizzle-orm';
import { subDays } from 'date-fns';

// Check if database connection variables are present
if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
  console.error('❌ Database connection string not found in environment variables.');
  console.error('Please make sure you have POSTGRES_URL or DATABASE_URL set in your .env file.');
  process.exit(1);
}

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data (be careful with this in production!)
    console.log('Clearing existing data...');
    await db.execute(sql`TRUNCATE TABLE "cook_logs" CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE "recipe_tags" CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE "tags" CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE "steps" CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE "ingredients" CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE "recipes" CASCADE;`);
    
    // Create sample tags
    console.log('Creating tags...');
    const tagData = [
      { name: 'Breakfast' },
      { name: 'Lunch' },
      { name: 'Dinner' },
      { name: 'Vegetarian' },
      { name: 'Vegan' },
      { name: 'Gluten-Free' },
      { name: 'Quick' },
      { name: 'Easy' },
      { name: 'Italian' },
      { name: 'Asian' },
      { name: 'Mexican' },
      { name: 'Dessert' },
      { name: 'Healthy' },
      { name: 'Comfort Food' },
    ];
    
    const createdTags = await db.insert(tags).values(tagData).returning();
    
    const tagMap = createdTags.reduce((acc, tag) => {
      acc[tag.name] = tag.id;
      return acc;
    }, {} as Record<string, string>);
    
    // Create recipes
    console.log('Creating recipes...');
    const recipeData = [
      {
        name: 'Classic Spaghetti Carbonara',
        description: 'A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000',
        cookingTime: 25,
      },
      {
        name: 'Vegetable Stir Fry',
        description: 'A quick and healthy stir fry with colorful vegetables and a savory sauce.',
        image: 'https://images.unsplash.com/photo-1512058556646-c4da40fba323?q=80&w=1000',
        cookingTime: 20,
      },
      {
        name: 'Blueberry Pancakes',
        description: 'Fluffy pancakes loaded with fresh blueberries, perfect for a weekend breakfast.',
        image: 'https://images.unsplash.com/photo-1590137876181-2a5a7e340308?q=80&w=1000',
        cookingTime: 30,
      },
      {
        name: 'Chicken Enchiladas',
        description: 'Tortillas filled with seasoned chicken, covered in enchilada sauce and cheese.',
        image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?q=80&w=1000',
        cookingTime: 45,
      },
      {
        name: 'Chocolate Chip Cookies',
        description: 'Classic homemade cookies with the perfect balance of chocolate and sweetness.',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000',
        cookingTime: 35,
      },
    ];
    
    const createdRecipes = await db.insert(recipes).values(recipeData).returning();
    
    // Associate recipes with tags
    console.log('Associating recipes with tags...');
    const recipeTagAssociations = [
      { recipeId: createdRecipes[0].id, tags: ['Dinner', 'Italian', 'Comfort Food'] },
      { recipeId: createdRecipes[1].id, tags: ['Lunch', 'Dinner', 'Vegetarian', 'Vegan', 'Quick', 'Healthy', 'Asian'] },
      { recipeId: createdRecipes[2].id, tags: ['Breakfast', 'Vegetarian', 'Easy'] },
      { recipeId: createdRecipes[3].id, tags: ['Dinner', 'Mexican', 'Comfort Food'] },
      { recipeId: createdRecipes[4].id, tags: ['Dessert', 'Easy', 'Vegetarian'] },
    ];
    
    for (const assoc of recipeTagAssociations) {
      for (const tagName of assoc.tags) {
        await db.insert(recipeTags).values({
          recipeId: assoc.recipeId,
          tagId: tagMap[tagName],
        });
      }
    }
    
    // Add ingredients to recipes
    console.log('Adding ingredients to recipes...');
    const ingredientsData = [
      // Spaghetti Carbonara
      { recipeId: createdRecipes[0].id, text: '400g spaghetti', order: 1 },
      { recipeId: createdRecipes[0].id, text: '200g pancetta or guanciale, diced', order: 2 },
      { recipeId: createdRecipes[0].id, text: '3 large eggs', order: 3 },
      { recipeId: createdRecipes[0].id, text: '50g pecorino romano, grated', order: 4 },
      { recipeId: createdRecipes[0].id, text: '50g parmesan, grated', order: 5 },
      { recipeId: createdRecipes[0].id, text: 'Freshly ground black pepper', order: 6 },
      { recipeId: createdRecipes[0].id, text: 'Salt to taste', order: 7 },
      
      // Vegetable Stir Fry
      { recipeId: createdRecipes[1].id, text: '2 tbsp vegetable oil', order: 1 },
      { recipeId: createdRecipes[1].id, text: '2 cloves garlic, minced', order: 2 },
      { recipeId: createdRecipes[1].id, text: '1 tbsp ginger, grated', order: 3 },
      { recipeId: createdRecipes[1].id, text: '1 bell pepper, sliced', order: 4 },
      { recipeId: createdRecipes[1].id, text: '1 carrot, julienned', order: 5 },
      { recipeId: createdRecipes[1].id, text: '1 broccoli head, cut into florets', order: 6 },
      { recipeId: createdRecipes[1].id, text: '1 cup snow peas', order: 7 },
      { recipeId: createdRecipes[1].id, text: '3 tbsp soy sauce', order: 8 },
      { recipeId: createdRecipes[1].id, text: '1 tbsp sesame oil', order: 9 },
      { recipeId: createdRecipes[1].id, text: '1 tsp brown sugar', order: 10 },
      
      // Blueberry Pancakes
      { recipeId: createdRecipes[2].id, text: '2 cups all-purpose flour', order: 1 },
      { recipeId: createdRecipes[2].id, text: '2 tbsp sugar', order: 2 },
      { recipeId: createdRecipes[2].id, text: '2 tsp baking powder', order: 3 },
      { recipeId: createdRecipes[2].id, text: '1/2 tsp baking soda', order: 4 },
      { recipeId: createdRecipes[2].id, text: '1/2 tsp salt', order: 5 },
      { recipeId: createdRecipes[2].id, text: '2 cups buttermilk', order: 6 },
      { recipeId: createdRecipes[2].id, text: '2 large eggs', order: 7 },
      { recipeId: createdRecipes[2].id, text: '1/4 cup melted butter', order: 8 },
      { recipeId: createdRecipes[2].id, text: '1 1/2 cups fresh blueberries', order: 9 },
      
      // Chicken Enchiladas
      { recipeId: createdRecipes[3].id, text: '3 cups cooked chicken, shredded', order: 1 },
      { recipeId: createdRecipes[3].id, text: '2 cups enchilada sauce', order: 2 },
      { recipeId: createdRecipes[3].id, text: '8 flour tortillas', order: 3 },
      { recipeId: createdRecipes[3].id, text: '2 cups shredded cheese (Mexican blend)', order: 4 },
      { recipeId: createdRecipes[3].id, text: '1 onion, diced', order: 5 },
      { recipeId: createdRecipes[3].id, text: '1 bell pepper, diced', order: 6 },
      { recipeId: createdRecipes[3].id, text: '2 cloves garlic, minced', order: 7 },
      { recipeId: createdRecipes[3].id, text: '1 tbsp olive oil', order: 8 },
      { recipeId: createdRecipes[3].id, text: '1 tsp cumin', order: 9 },
      { recipeId: createdRecipes[3].id, text: '1 tsp chili powder', order: 10 },
      
      // Chocolate Chip Cookies
      { recipeId: createdRecipes[4].id, text: '2 1/4 cups all-purpose flour', order: 1 },
      { recipeId: createdRecipes[4].id, text: '1 tsp baking soda', order: 2 },
      { recipeId: createdRecipes[4].id, text: '1 tsp salt', order: 3 },
      { recipeId: createdRecipes[4].id, text: '1 cup unsalted butter, softened', order: 4 },
      { recipeId: createdRecipes[4].id, text: '3/4 cup granulated sugar', order: 5 },
      { recipeId: createdRecipes[4].id, text: '3/4 cup packed brown sugar', order: 6 },
      { recipeId: createdRecipes[4].id, text: '2 large eggs', order: 7 },
      { recipeId: createdRecipes[4].id, text: '2 tsp vanilla extract', order: 8 },
      { recipeId: createdRecipes[4].id, text: '2 cups semi-sweet chocolate chips', order: 9 },
    ];
    
    await db.insert(ingredients).values(ingredientsData);
    
    // Add steps to recipes
    console.log('Adding steps to recipes...');
    const stepsData = [
      // Spaghetti Carbonara
      { recipeId: createdRecipes[0].id, text: 'Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente.', order: 1 },
      { recipeId: createdRecipes[0].id, text: 'While the pasta is cooking, heat a large skillet over medium heat. Add the diced pancetta and cook until crispy.', order: 2 },
      { recipeId: createdRecipes[0].id, text: 'In a bowl, whisk together the eggs, grated cheeses, and a generous amount of black pepper.', order: 3 },
      { recipeId: createdRecipes[0].id, text: 'When the pasta is done, reserve 1/2 cup of the pasta water, then drain the pasta.', order: 4 },
      { recipeId: createdRecipes[0].id, text: 'Working quickly, add the hot pasta to the skillet with the pancetta. Toss to combine.', order: 5 },
      { recipeId: createdRecipes[0].id, text: 'Remove the skillet from the heat and pour in the egg and cheese mixture, tossing constantly to create a creamy sauce. Add a splash of the reserved pasta water if needed to loosen the sauce.', order: 6 },
      { recipeId: createdRecipes[0].id, text: 'Serve immediately with an extra sprinkle of cheese and black pepper.', order: 7 },
      
      // Vegetable Stir Fry
      { recipeId: createdRecipes[1].id, text: 'Prepare all vegetables by washing and cutting them as specified.', order: 1 },
      { recipeId: createdRecipes[1].id, text: 'In a small bowl, mix soy sauce, sesame oil, and brown sugar. Set aside.', order: 2 },
      { recipeId: createdRecipes[1].id, text: 'Heat vegetable oil in a wok or large frying pan over high heat.', order: 3 },
      { recipeId: createdRecipes[1].id, text: 'Add garlic and ginger, stir-fry for 30 seconds until fragrant.', order: 4 },
      { recipeId: createdRecipes[1].id, text: 'Add carrots and broccoli, stir-fry for 2 minutes.', order: 5 },
      { recipeId: createdRecipes[1].id, text: 'Add bell pepper and snow peas, stir-fry for another 2 minutes.', order: 6 },
      { recipeId: createdRecipes[1].id, text: 'Pour in the sauce mixture, toss everything together, and cook for 1 more minute.', order: 7 },
      { recipeId: createdRecipes[1].id, text: 'Serve hot, optionally over rice or noodles.', order: 8 },
      
      // Blueberry Pancakes
      { recipeId: createdRecipes[2].id, text: 'In a large bowl, whisk together flour, sugar, baking powder, baking soda, and salt.', order: 1 },
      { recipeId: createdRecipes[2].id, text: 'In another bowl, whisk together buttermilk, eggs, and melted butter.', order: 2 },
      { recipeId: createdRecipes[2].id, text: 'Pour the wet ingredients into the dry ingredients and stir just until combined. Do not overmix; some lumps are okay.', order: 3 },
      { recipeId: createdRecipes[2].id, text: 'Gently fold in the blueberries.', order: 4 },
      { recipeId: createdRecipes[2].id, text: 'Heat a griddle or non-stick pan over medium heat. Lightly grease with butter or oil.', order: 5 },
      { recipeId: createdRecipes[2].id, text: 'For each pancake, pour about 1/4 cup of batter onto the griddle. Cook until bubbles form on the surface and the edges look set, about 2-3 minutes.', order: 6 },
      { recipeId: createdRecipes[2].id, text: 'Flip and cook until golden brown on the other side, about 1-2 minutes more.', order: 7 },
      { recipeId: createdRecipes[2].id, text: 'Serve warm with maple syrup and additional fresh blueberries if desired.', order: 8 },
      
      // Chicken Enchiladas
      { recipeId: createdRecipes[3].id, text: 'Preheat oven to 350°F (175°C).', order: 1 },
      { recipeId: createdRecipes[3].id, text: 'In a large skillet, heat olive oil over medium heat. Add onion and bell pepper, cook until softened, about 5 minutes.', order: 2 },
      { recipeId: createdRecipes[3].id, text: 'Add garlic, cumin, and chili powder. Cook for 1 minute until fragrant.', order: 3 },
      { recipeId: createdRecipes[3].id, text: 'Stir in the shredded chicken and 1/2 cup of the enchilada sauce. Cook for 2-3 minutes until heated through.', order: 4 },
      { recipeId: createdRecipes[3].id, text: 'Warm the tortillas briefly in the microwave to make them more pliable.', order: 5 },
      { recipeId: createdRecipes[3].id, text: 'Spread 1/2 cup of enchilada sauce in the bottom of a 9x13 inch baking dish.', order: 6 },
      { recipeId: createdRecipes[3].id, text: 'Fill each tortilla with the chicken mixture and a sprinkle of cheese. Roll up and place seam-side down in the baking dish.', order: 7 },
      { recipeId: createdRecipes[3].id, text: 'Pour the remaining enchilada sauce over the top and sprinkle with the remaining cheese.', order: 8 },
      { recipeId: createdRecipes[3].id, text: 'Bake for 20-25 minutes until the cheese is melted and bubbly.', order: 9 },
      
      // Chocolate Chip Cookies
      { recipeId: createdRecipes[4].id, text: 'Preheat oven to 375°F (190°C).', order: 1 },
      { recipeId: createdRecipes[4].id, text: 'In a small bowl, whisk together flour, baking soda, and salt. Set aside.', order: 2 },
      { recipeId: createdRecipes[4].id, text: 'In a large bowl, beat butter, granulated sugar, and brown sugar until creamy.', order: 3 },
      { recipeId: createdRecipes[4].id, text: 'Add eggs one at a time, beating well after each addition. Stir in vanilla.', order: 4 },
      { recipeId: createdRecipes[4].id, text: 'Gradually add the flour mixture to the butter mixture, mixing until just combined.', order: 5 },
      { recipeId: createdRecipes[4].id, text: 'Stir in chocolate chips.', order: 6 },
      { recipeId: createdRecipes[4].id, text: 'Drop rounded tablespoons of dough onto ungreased baking sheets.', order: 7 },
      { recipeId: createdRecipes[4].id, text: 'Bake for 9-11 minutes until golden brown around the edges but still soft in the center.', order: 8 },
      { recipeId: createdRecipes[4].id, text: 'Cool on baking sheets for 2 minutes, then transfer to wire racks to cool completely.', order: 9 },
    ];
    
    await db.insert(steps).values(stepsData);
    
    // Add cooking logs
    console.log('Adding cooking logs...');
    const today = new Date();
    const cookLogData = [
      // Spaghetti Carbonara logs
      { 
        recipeId: createdRecipes[0].id, 
        date: subDays(today, 2),
        rating: 5, 
        notes: 'Amazing! Perfect balance of flavors. Used guanciale instead of pancetta for more authenticity.'
      },
      { 
        recipeId: createdRecipes[0].id, 
        date: subDays(today, 15),
        rating: 4, 
        notes: 'Delicious but a bit too peppery for my taste. Will adjust next time.'
      },
      
      // Vegetable Stir Fry logs
      { 
        recipeId: createdRecipes[1].id, 
        date: subDays(today, 5),
        rating: 4, 
        notes: 'Quick and healthy! Added some cashews for extra crunch.'
      },
      { 
        recipeId: createdRecipes[1].id, 
        date: subDays(today, 22),
        rating: 5, 
        notes: 'Perfect weeknight dinner. Used whatever veggies I had in the fridge and it worked great.'
      },
      
      // Blueberry Pancakes logs
      { 
        recipeId: createdRecipes[2].id, 
        date: subDays(today, 3),
        rating: 5, 
        notes: 'Best pancakes ever! So fluffy and the blueberries added just the right amount of sweetness.'
      },
      
      // Chicken Enchiladas logs
      { 
        recipeId: createdRecipes[3].id, 
        date: subDays(today, 8),
        rating: 4, 
        notes: 'Family loved these! Added some jalapeños for extra heat.'
      },
      { 
        recipeId: createdRecipes[3].id, 
        date: subDays(today, 1),
        rating: 3, 
        notes: 'Good, but not as flavorful as I expected. Will try a different enchilada sauce next time.'
      },
      
      // Chocolate Chip Cookies logs
      { 
        recipeId: createdRecipes[4].id, 
        date: subDays(today, 6),
        rating: 5, 
        notes: 'Perfect cookies! Crispy on the edges and chewy in the middle.'
      },
      { 
        recipeId: createdRecipes[4].id, 
        date: subDays(today, 30),
        rating: 4, 
        notes: 'Great recipe. Added some walnuts for extra texture.'
      },
      { 
        recipeId: createdRecipes[4].id, 
        date: today,
        rating: 5, 
        notes: 'Made these again and they were just as amazing as the first time!'
      },
    ];
    
    await db.insert(cookLogs).values(cookLogData);
    
    // Update average ratings
    console.log('Updating average ratings...');
    for (const recipe of createdRecipes) {
      const logs = cookLogData.filter(log => log.recipeId === recipe.id);
      if (logs.length > 0) {
        const totalRating = logs.reduce((sum, log) => sum + log.rating, 0);
        const averageRating = Math.round(totalRating / logs.length);
        
        await db.update(recipes)
          .set({ averageRating })
          .where(sql`${recipes.id} = ${recipe.id}`);
      }
    }
    
    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main(); 
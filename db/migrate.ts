/**
 * Database Migration Script
 * 
 * This script handles database schema migrations for our PostgreSQL database using Drizzle ORM.
 * It performs the following key functions:
 * 
 * 1. Loads environment variables from .env file containing database connection details
 * 2. Establishes connection to our Neon PostgreSQL database instance
 * 3. Runs any pending migrations from the ./drizzle folder to update database schema
 * 
 * The script can be:
 * - Run manually during development to apply schema changes
 * - Executed during deployment/build to ensure production DB is up to date
 * - Used to keep development and production schemas in sync
 */

import { migrate } from 'drizzle-orm/vercel-postgres/migrator'; // Import Drizzle's migration tool
import { sql } from '@vercel/postgres'; // Import Vercel's PostgreSQL client
import { drizzle } from 'drizzle-orm/vercel-postgres'; // Import Drizzle ORM for Vercel Postgres
import * as schema from './schema'; // Import our database schema definitions
import dotenv from 'dotenv'; // Import dotenv for environment variable management

// Load environment variables from .env file
// This includes DATABASE_URL and other connection details
dotenv.config();

// Initialize database connection
// Creates a connection to our Neon PostgreSQL instance using Vercel's SQL client
// The drizzle() wrapper adds ORM functionality to the connection
console.log('Connecting to Neon PostgreSQL database...');
const db = drizzle(sql, { schema });

// Execute pending migrations
// Looks for migration files in ./drizzle folder and applies them in order
// Migrations are tracked in a special table to know which ones have been applied
console.log('Running migrations...');
migrate(db, { migrationsFolder: './drizzle' })
  .then(() => {
    // If migrations succeed, log success and exit normally
    console.log('Migrations completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    // If migrations fail, log the error and exit with failure code
    console.error('Migration error:', error);
    process.exit(1);
  }); 
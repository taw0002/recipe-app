/**
 * This script generates and applies database migrations for a PostgreSQL database.
 * It can be run manually or as part of the build process.
 */

import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to the Postgres database
console.log('Connecting to Neon PostgreSQL database...');
const db = drizzle(sql, { schema });

// Apply migrations
console.log('Running migrations...');
migrate(db, { migrationsFolder: './drizzle' })
  .then(() => {
    console.log('Migrations completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration error:', error);
    process.exit(1);
  }); 
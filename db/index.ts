/**
 * This file sets up the database connection for the application.
 * It creates a connection to Neon PostgreSQL database.
 */

import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

// Import the relations
import './relations';

// Create the database connection with prepared queries
const db = drizzle(sql, { schema });

export default db; 
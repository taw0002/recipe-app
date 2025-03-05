# Authentication Implementation Plan with NextAuth.js

This document outlines the step-by-step process for implementing authentication in our recipe application using NextAuth.js.

## Implementation Checklist

- [x] **Step 1: Install required packages**
  - [x] Install NextAuth.js
  - [x] Install necessary adapters for our database (Drizzle adapter)
  - [ ] Install any additional authentication providers we might need

- [ ] **Step 2: Configure environment variables**
  - [ ] Set up NextAuth secret
  - [ ] Configure database connection strings
  - [ ] Add provider-specific credentials (if using OAuth providers)

- [ ] **Step 3: Set up database schema for authentication**
  - [ ] Create schema for users table
  - [ ] Create schema for accounts table (for OAuth connections)
  - [ ] Create schema for sessions table
  - [ ] Create schema for verification tokens

- [ ] **Step 4: Create API routes for authentication**
  - [ ] Set up the main NextAuth API route
  - [ ] Configure authentication providers
  - [ ] Set up callbacks and event handlers

- [ ] **Step 5: Create authentication provider wrapper component**
  - [ ] Create SessionProvider to wrap the application
  - [ ] Update layout component to include the SessionProvider

- [ ] **Step 6: Create authentication UI components**
  - [ ] Implement sign-in form
  - [ ] Implement sign-up form (if needed)
  - [ ] Create user dropdown/profile component

- [ ] **Step 7: Add route protection**
  - [ ] Create middleware for protected routes
  - [ ] Add authentication checks to API routes
  - [ ] Implement redirect logic for unauthenticated users

- [ ] **Step 8: Associate user data with recipes**
  - [ ] Update recipe schema to include user ID
  - [ ] Modify API routes to filter recipes by user
  - [ ] Update seed data to include user associations

- [ ] **Step 9: Update UI to reflect authentication state**
  - [ ] Show user-specific content
  - [ ] Add login/logout buttons
  - [ ] Update dashboard to show only user's recipes

- [ ] **Step 10: Test authentication flows**
  - [ ] Test sign in/sign up
  - [ ] Test protected routes
  - [ ] Test user-specific data access

## Technical Implementation Details

### Database Schema Changes

We'll need to extend our current database schema to support authentication:

1. User Table:
   - id (primary key)
   - name
   - email
   - emailVerified
   - image (avatar)
   - created_at/updated_at timestamps

2. Account Table (for OAuth providers):
   - id (primary key)
   - userId (foreign key to User)
   - type (oauth, email, etc)
   - provider (google, github, etc)
   - providerAccountId
   - refresh_token
   - access_token
   - expires_at
   - token_type
   - scope
   - id_token
   - session_state

3. Session Table:
   - id (primary key)
   - userId (foreign key to User)
   - expires
   - sessionToken

4. VerificationToken Table (for email verification):
   - identifier
   - token
   - expires

### Required Changes to Existing Code

1. Recipe schema: Add userId field to associate recipes with users
2. API routes: Update to filter by authenticated user
3. UI components: Update to show authentication state and user-specific actions

### Authentication Flow

1. User navigates to protected page
2. If not authenticated, redirect to login page
3. User logs in with credentials or OAuth provider
4. Upon successful authentication, redirect to originally requested page
5. User can now access protected resources and perform authenticated actions

## Implementation Notes

As we implement each step, we'll update this document with additional details, challenges faced, and solutions applied. 
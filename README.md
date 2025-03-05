# Recipe App

A modern recipe management application built with Next.js, featuring Drizzle ORM and PostgreSQL database integration.

## Features

- Create, view, edit, and delete recipes
- Add cooking logs to track when you've made a recipe and how it turned out
- Organize recipes with tags
- Dashboard with cooking statistics
- AI-powered recipe image generation

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- PostgreSQL database (local or hosted)
- OpenAI API key (for image generation feature)

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env.local` and update the variables:
   ```
   DATABASE_URL="your-database-connection-string"
   OPENAI_API_KEY="your-openai-api-key"
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run database migrations:
   ```
   npm run db:migrate
   ```
5. (Optional) Seed the database with sample data:
   ```
   npm run db:seed
   ```
6. Start the development server:
   ```
   npm run dev
   ```

## Using AI Image Generation

This app integrates with OpenAI's DALL-E model to generate beautiful images for your recipes:

1. When creating or editing a recipe, fill in the recipe name and description
2. Click on the "Generate with AI" tab in the image section
3. The app will suggest a prompt based on your recipe details
4. Click "Generate Image" to create a custom image
5. The generated image will be automatically added to your recipe

**Note:** You need a valid OpenAI API key in your `.env.local` file to use this feature. If you don't have one, you can still use external image URLs.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - AI integration
- [OpenAI API](https://platform.openai.com/) - Image generation
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## License

MIT 
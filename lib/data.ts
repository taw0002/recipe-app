// This is a mock data file. In a real application, this would be replaced with a database.

export type CookLog = {
  date: string
  rating: number
  notes: string
}

export type Recipe = {
  id: string
  name: string
  description: string
  image: string
  cookingTime: number
  ingredients: string[]
  steps: string[]
  tags: string[]
  cookLogs: CookLog[]
  averageRating: number
}

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    image: "/placeholder.svg?height=400&width=600",
    cookingTime: 25,
    ingredients: [
      "350g spaghetti",
      "150g pancetta or guanciale, diced",
      "3 large eggs",
      "50g pecorino cheese, grated",
      "50g parmesan, grated",
      "Freshly ground black pepper",
      "Salt to taste",
    ],
    steps: [
      "Bring a large pot of salted water to boil and cook the spaghetti according to package instructions until al dente.",
      "While the pasta is cooking, heat a large skillet over medium heat. Add the pancetta and cook until crispy, about 5-7 minutes.",
      "In a bowl, whisk together the eggs, grated cheeses, and a generous amount of black pepper.",
      "When the pasta is done, reserve 1/2 cup of the pasta water, then drain the pasta.",
      "Working quickly, add the hot pasta to the skillet with the pancetta, tossing to combine.",
      "Remove the skillet from heat and add the egg and cheese mixture, tossing continuously until the eggs thicken but don't scramble. Add a splash of the reserved pasta water if needed to create a creamy sauce.",
      "Serve immediately with additional grated cheese and black pepper on top.",
    ],
    tags: ["Italian", "Pasta", "Quick", "Dinner"],
    cookLogs: [
      {
        date: "2023-10-15T18:30:00.000Z",
        rating: 5,
        notes: "Turned out perfect! Used bacon instead of pancetta and it was still delicious.",
      },
      {
        date: "2023-11-02T19:15:00.000Z",
        rating: 4,
        notes: "Good but slightly too much pepper for my taste. Will use less next time.",
      },
    ],
    averageRating: 4.5,
  },
  {
    id: "2",
    name: "Chicken Tikka Masala",
    description: "Grilled chunks of chicken in a creamy spiced tomato sauce.",
    image: "/placeholder.svg?height=400&width=600",
    cookingTime: 60,
    ingredients: [
      "800g boneless chicken thighs, cut into bite-sized pieces",
      "1 cup plain yogurt",
      "2 tbsp lemon juice",
      "6 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "2 tsp ground cumin",
      "2 tsp ground turmeric",
      "2 tsp garam masala",
      "2 tsp paprika",
      "2 tbsp vegetable oil",
      "1 large onion, finely chopped",
      "2 cans (400g each) tomato sauce",
      "1 cup heavy cream",
      "Fresh cilantro for garnish",
      "Salt to taste",
    ],
    steps: [
      "In a large bowl, combine yogurt, lemon juice, half the garlic, half the ginger, 1 tsp cumin, 1 tsp turmeric, 1 tsp garam masala, and 1 tsp paprika. Add chicken and stir to coat. Cover and refrigerate for at least 1 hour, preferably overnight.",
      "Preheat oven to 500°F (260°C). Line a baking sheet with foil and place marinated chicken pieces on it. Bake for 15 minutes until slightly charred.",
      "Meanwhile, heat oil in a large pot over medium heat. Add onions and cook until softened, about 5 minutes.",
      "Add remaining garlic and ginger, and cook for another minute until fragrant.",
      "Add remaining cumin, turmeric, garam masala, and paprika. Stir and cook for 30 seconds.",
      "Add tomato sauce and bring to a simmer. Cook for 15 minutes, stirring occasionally.",
      "Add the cooked chicken pieces, including any juices. Simmer for 10 minutes.",
      "Stir in heavy cream and simmer for another 5 minutes. Adjust salt to taste.",
      "Garnish with fresh cilantro and serve with rice or naan bread.",
    ],
    tags: ["Indian", "Curry", "Chicken", "Dinner"],
    cookLogs: [
      {
        date: "2023-09-20T19:00:00.000Z",
        rating: 5,
        notes: "Amazing flavor! Added a bit more cream to make it milder for the kids.",
      },
    ],
    averageRating: 5,
  },
  {
    id: "3",
    name: "Avocado Toast",
    description: "Simple and nutritious breakfast with mashed avocado on toasted bread.",
    image: "/placeholder.svg?height=400&width=600",
    cookingTime: 10,
    ingredients: [
      "2 slices of bread (sourdough or whole grain)",
      "1 ripe avocado",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "2 eggs (optional)",
      "Microgreens or sprouts for garnish (optional)",
    ],
    steps: [
      "Toast the bread slices until golden and crisp.",
      "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
      "Add lemon juice, salt, and pepper to the avocado and mash with a fork to your desired consistency.",
      "Spread the mashed avocado evenly on the toast slices.",
      "If desired, top with a fried or poached egg.",
      "Sprinkle with red pepper flakes and garnish with microgreens if using.",
      "Serve immediately.",
    ],
    tags: ["Breakfast", "Vegetarian", "Quick", "Healthy"],
    cookLogs: [],
    averageRating: 0,
  },
]


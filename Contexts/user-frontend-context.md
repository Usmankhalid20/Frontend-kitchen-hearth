# Kitchen Hearth — User Workspace Frontend Context

## 1. Purpose

The User Workspace is the authenticated area of Kitchen Hearth.

It gives users one place to:

- Generate recipes with the AI Assistant.
- View saved recipes.
- Manage their own recipes.
- Favorite recipes.
- Plan meals.
- Manage their profile and settings.

The User Workspace should feel like a personal kitchen workspace.

It is not an admin dashboard.

It should focus on the user's cooking activity and personal content.

---

# 2. Core User Experience

The main user flow is:

User registers or logs in
↓
User enters the User Workspace
↓
User sees the Dashboard
↓
User creates a recipe using AI Assistant
↓
User views the generated recipe
↓
User saves the recipe
↓
Recipe appears in My Recipes
↓
User can favorite it or add it to a Meal Plan

---

# 3. User Workspace Structure

The authenticated application should contain:

/dashboard

/ai-assistant

/recipes

/recipes/:id

/meal-planner

/settings

All user workspace routes must be protected.

Unauthenticated users should not access these pages.

---

# 4. User Workspace Layout

The authenticated area should use a consistent layout.

Recommended structure:

┌─────────────────────────────────────┐
│ Navbar / Header │
├──────────────┬──────────────────────┤
│ │ │
│ Sidebar │ Main Content │
│ │ │
│ │ │
└──────────────┴──────────────────────┘

The layout should be reusable.

Do not create a separate layout for every page.

Recommended:

src/
├── layouts/
│ └── UserLayout.jsx
│
├── components/
│ └── user/
│ ├── UserSidebar.jsx
│ ├── UserHeader.jsx
│ └── UserNavigation.jsx
│
└── pages/
└── user/
├── Dashboard/
├── AIAssistant/
├── Recipes/
├── MealPlanner/
└── Settings/

---

# 5. User Sidebar

The sidebar should contain:

## Main Navigation

- Overview
- AI Assistant
- My Recipes
- Meal Planner

## Account

- Settings
- Logout

The sidebar should be reusable across all User Workspace pages.

The current active route should be visually clear.

The navigation should be data-driven.

Do not manually duplicate navigation JSX.

Example navigation data:

[
{
label: "Overview",
path: "/dashboard"
},
{
label: "AI Assistant",
path: "/ai-assistant"
},
{
label: "My Recipes",
path: "/recipes"
},
{
label: "Meal Planner",
path: "/meal-planner"
}
]

Use Lucide React icons where appropriate.

Do not introduce another icon library.

---

# 6. Dashboard

The Dashboard is the user's home page after authentication.

The Dashboard should answer:

"What can I cook or manage next?"

The Dashboard should not become a generic analytics dashboard.

Avoid unnecessary charts and meaningless statistics.

---

## Dashboard Structure

Recommended sections:

1. Welcome Header
2. Main AI Assistant CTA
3. Recipe Statistics
4. Recent Recipes
5. Upcoming Meals

---

## Welcome Section

Example:

"Good evening, Usman."

Supporting text:

"What are you cooking today?"

The user's name should come from the authenticated user state.

Do not hardcode the user's name.

---

## Main CTA

The main action should be:

"Create a Recipe"

The CTA navigates to:

/ai-assistant

The AI Assistant remains the main product action.

Do not embed the full AI Assistant inside the Dashboard.

---

## Statistics

Possible statistics:

- Saved Recipes
- Generated Recipes
- Favorite Recipes
- Planned Meals

Only show statistics that are backed by real data.

Do not create fake values.

If a statistic is not available from the backend, do not display it as real data.

---

## Recent Recipes

Show the user's recently saved recipes.

Each recipe card can display:

- Recipe name
- Image if available
- Cooking time
- Difficulty
- Created date
- Favorite status

Actions:

- View Recipe
- Add to Favorites

The recipe list should come from the backend.

Do not hardcode recipe data in the Dashboard.

---

## Upcoming Meals

Show meals planned by the user.

If no meals exist:

Display an empty state.

Example:

"No meals planned yet."

CTA:

"Plan a Meal"

Do not display an empty table with no explanation.

---

# 7. AI Assistant

The existing AI Assistant already exists and works.

Do not rewrite it.

Do not create a second recipe-generation system.

The existing AI Assistant remains the only place responsible for:

- Receiving the user's cooking idea.
- Calling the AI recipe generation API.
- Displaying the generated recipe.
- Allowing the user to save the recipe.

The User Dashboard only links to the AI Assistant.

---

# 8. AI Assistant Flow

The existing flow is:

User enters:

"I want to make chicken tikka"

        ↓

Frontend sends request to existing backend API

        ↓

Backend calls OpenAI

        ↓

AI generates recipe

        ↓

Frontend displays recipe

        ↓

User clicks Save Recipe

        ↓

Recipe is saved to the user's account

Do not duplicate this flow elsewhere.

---

# 9. My Recipes

My Recipes is the user's personal recipe library.

Route:

/recipes

The page should show only recipes owned by the authenticated user.

The backend must enforce ownership.

The frontend must not rely only on hiding recipes from the UI.

---

## Recipe List Features

The user should be able to:

- View recipes.
- Search recipes.
- Filter recipes.
- Sort recipes.
- Favorite recipes.
- Delete recipes.
- Open recipe details.

Possible filters:

- All
- Favorites
- Recent

Additional filters can be added later if supported by the backend.

---

# 10. Recipe Card

Create a reusable RecipeCard component.

The component should work for all recipes.

It should receive data through props.

Possible data:

- id
- title
- description
- image
- cookingTime
- difficulty
- servings
- isFavorite
- createdAt

The RecipeCard should not contain recipe-specific logic.

Do not create separate components such as:

- ChickenTikkaCard
- PastaCard
- BiryaniCard

Use one reusable RecipeCard.

---

# 11. Recipe Details

Route:

/recipes/:id

The page should display:

- Recipe name
- Description
- Ingredients
- Quantities
- Cooking time
- Difficulty
- Servings
- Step-by-step instructions
- Favorite status
- Created date

Possible actions:

- Add/remove favorite
- Add to Meal Planner
- Delete recipe

The backend must verify that the user has permission to access the recipe.

---

# 12. Recipe Ownership

Recipes belong to users.

Example:

User A
↓
Recipe A

User A can:

- Read Recipe A
- Update Recipe A
- Delete Recipe A

User B cannot access Recipe A.

The backend must verify ownership.

Frontend checks are only for user experience.

They are not security.

The backend must enforce:

Authenticated user
↓
Recipe exists
↓
Recipe belongs to current user
↓
Allow action

Otherwise:

Return:

403 Forbidden

or:

404 Not Found

depending on the application's security design.

---

# 13. Favorites

Users should be able to favorite their own recipes.

Possible implementation:

Recipe:

{
isFavorite: Boolean
}

OR:

Separate favorites collection.

Use the existing backend architecture and choose the simplest approach that fits the current database design.

Do not create a new complex system unnecessarily.

The frontend should provide:

- Favorite button
- Active favorite state
- Loading state
- Error state

The favorite state must come from backend data.

Do not rely only on local state for permanent favorites.

---

# 14. Meal Planner

The Meal Planner allows users to organize recipes by date.

Route:

/meal-planner

Basic flow:

Saved Recipe
↓
Add to Meal Plan
↓
Select Date
↓
Meal appears on Meal Planner

Example:

Monday
Chicken Tikka

Tuesday
Creamy Pasta

Wednesday
No meal planned

---

# 15. Meal Planner Scope

Keep the first version simple.

The user should be able to:

- View planned meals.
- Add a saved recipe to a date.
- Remove a planned meal.
- Change the planned date.

Do not build a complex calendar system initially.

Do not add:

- Nutrition tracking
- Grocery list generation
- Complex drag-and-drop
- Recurring meal schedules

unless explicitly requested.

---

# 16. Settings

The Settings page should allow users to manage their account.

Possible features:

- View profile information.
- Update name.
- Update profile image if supported.
- Change password.
- Logout.

Only implement features supported by the backend.

Do not show UI for functionality that does not exist.

---

# 17. Zustand State Management

Zustand is the frontend global state management solution.

Do not introduce:

- Redux
- Redux Toolkit
- Context API for global application state
- A second global state library

Recommended stores:

src/
└── stores/
├── authStore.js
├── recipeStore.js
└── mealPlanStore.js

Only create a store when shared state is actually needed.

Do not put every piece of local UI state into Zustand.

---

# 18. Auth Store

The auth store is responsible for authentication state.

Possible state:

- user
- isAuthenticated
- isLoading

Possible actions:

- login
- register
- logout
- checkAuth

The exact implementation should follow the existing project.

The auth store should be the single source of truth for the authenticated user.

Do not create duplicate authentication state in:

- Navbar
- Sidebar
- Dashboard
- AI Assistant
- Settings

---

# 19. Recipe State

Use a recipe store only if recipe state is shared across multiple pages or components.

Possible state:

- recipes
- currentRecipe
- isLoading
- error

Possible actions:

- fetchRecipes
- fetchRecipeById
- saveRecipe
- deleteRecipe
- toggleFavorite

API calls should remain organized through service files.

The store should not contain unrelated UI logic.

---

# 20. API Architecture

Recommended frontend flow:

Component
↓
Zustand Store
↓
Service
↓
Axios API Client
↓
Backend API

Example:

Recipes Page
↓
recipeStore.fetchRecipes()
↓
recipe.service.js
↓
apiClient.get()
↓
GET /api/v1/recipes

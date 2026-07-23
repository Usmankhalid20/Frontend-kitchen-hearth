# Kitchen Hearth — Landing Page Context

## 1. Project Overview

Kitchen Hearth is a recipe application that helps users turn a cooking idea into a complete recipe.

The application uses:

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Lucide React
- Zustand

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- OpenAI API

The AI Assistant and recipe generation functionality already exist and are working.

The landing page must not duplicate or rebuild the AI Assistant.

The landing page is the public entry point of the application.

---

# 2. Main Product Experience

The core product flow is:

User has a cooking idea
↓
User describes what they want to cook
↓
AI Assistant generates ingredients and recipe
↓
User views the recipe
↓
User can save the recipe

Example:

"I want to make chicken tikka"

The AI Assistant can generate:

- Recipe name
- Description
- Ingredients
- Quantities
- Cooking time
- Difficulty
- Servings
- Cooking instructions

The existing AI Assistant is the only place responsible for recipe generation.

The Landing Page must not generate recipes.

---

# 3. Landing Page Responsibility

The Landing Page should:

1. Explain what Kitchen Hearth does.
2. Show the value of the product.
3. Demonstrate the product visually.
4. Give users recipe ideas.
5. Encourage users to start creating a recipe.
6. Navigate users to the existing AI Assistant.

The Landing Page should not:

- Call the OpenAI API.
- Generate recipes.
- Create a second AI input field.
- Duplicate the AI Assistant.
- Duplicate authentication logic.
- Create a second global state system.
- Create an AuthContext if Zustand is already being used.

---

# 4. Main User Flow

## Unauthenticated User

Landing Page
↓
User clicks "Create a Recipe"
↓
Zustand auth store checks authentication state
↓
User is not authenticated
↓
Navigate to Login/Register
↓
Authentication succeeds
↓
Navigate to AI Assistant
↓
Existing AI recipe generation flow

---

## Authenticated User

Landing Page
↓
User clicks "Create a Recipe"
↓
Zustand auth store confirms authentication
↓
Navigate to AI Assistant
↓
Existing AI recipe generation flow

---

# 5. Main CTA

The primary CTA is:

"Create a Recipe"

The CTA must be authentication-aware.

If the user is authenticated:

Navigate to:

/ai-assistant

If the user is not authenticated:

Navigate to:

/login

After successful login or registration:

Navigate to:

/ai-assistant

The Landing Page must not make an AI API request.

---

# 6. Landing Page Structure

The page should contain:

1. Navbar
2. Hero Section
3. How It Works
4. Explore Ideas
5. Feature Overview
6. Final CTA
7. Footer

Do not add unnecessary sections.

The page should have one dominant action:

"Create a Recipe"

---

# 7. Navbar

## Unauthenticated State

Show:

- Kitchen Hearth logo
- Discover
- How It Works
- Log In
- Get Started

---

## Authenticated State

Show:

- Kitchen Hearth logo
- Discover
- AI Assistant
- My Recipes
- Meal Plan
- User menu or profile
- Logout

The Navbar must read authentication state from the existing Zustand auth store.

Do not create local authentication state inside the Navbar.

Do not call the authentication API directly from the Navbar.

---

# 8. Hero Section

## Main Heading

"Turn an idea into a recipe."

## Supporting Text

"Tell us what you want to cook, and we'll help you figure out what you need and how to make it."

## Primary CTA

"Create a Recipe"

The CTA must navigate based on the current authentication state.

---

# 9. Hero Visual

The Hero should visually show the result of the product.

Use a recipe preview card.

Example:

Recipe:

Chicken Tikka

Information:

- 45 min
- Easy
- 4 servings

Ingredients:

- Chicken
- Yogurt
- Lemon
- Garlic
- Spices

Recipe preview:

"Marinate the chicken with yogurt, lemon, garlic, and spices..."

The preview should be static UI.

It must not call the AI API.

It must not generate a real recipe.

The purpose is to visually communicate:

"An idea can become a recipe."

The visual should feel like part of the actual Kitchen Hearth product.

Avoid:

- Generic chatbot UI
- Random AI graphics
- Excessive gradients
- Overly futuristic design
- Unnecessary animation

---

# 10. How It Works

Use exactly three steps.

## Step 1

Title:

"Tell us what you want to cook"

Description:

"Describe the dish, craving, or meal you have in mind."

---

## Step 2

Title:

"Get what you need"

Description:

"See the ingredients and quantities required for your recipe."

---

## Step 3

Title:

"Start cooking"

Description:

"Follow clear, step-by-step cooking instructions."

The content should be stored as data and rendered dynamically.

Do not manually duplicate the same JSX structure.

---

# 11. Explore Recipe Ideas

Show example recipe ideas:

- Chicken Tikka
- Quick Pasta
- Biryani
- Homemade Pizza
- Vegetarian Dinner

These are examples only.

They are not separate AI generation systems.

When a user clicks an idea, navigate to the existing AI Assistant.

The selected idea may be passed using:

- React Router navigation state
- URL query parameters
- sessionStorage

Use the approach that best fits the existing project.

Example:

User clicks:

"Chicken Tikka"

The AI Assistant can receive:

"I want to make chicken tikka"

The AI Assistant remains responsible for making the actual AI API request.

The Landing Page must not call:

POST /api/v1/ai/generate

---

# 12. Feature Overview

Only show features that exist or are actively being developed.

## AI Recipe Assistant

Turn a cooking idea into ingredients and a complete recipe.

## My Recipes

Save and access recipes later.

## Meal Planning

Organize recipes and plan meals.

If a feature is not implemented yet:

Either do not show it

OR

Clearly label it as:

"Coming Soon"

Do not advertise unfinished functionality as fully available.

---

# 13. Final CTA

Heading:

"Your next recipe starts with an idea."

Supporting text:

"Tell us what you're craving and start cooking."

Button:

"Create Your First Recipe"

Behavior:

Authenticated user:

/ai-assistant

Unauthenticated user:

/login

The CTA must reuse the same navigation logic as the Hero CTA.

Do not duplicate authentication logic.

Create reusable CTA behavior where appropriate.

---

# 14. Zustand Authentication Integration

Zustand is the single source of truth for frontend authentication state.

Do not use AuthContext for authentication.

Do not create a second authentication state system.

The existing Zustand auth store should manage or expose:

- user
- isAuthenticated
- isLoading
- login
- register
- logout
- checkAuth

The exact implementation should follow the existing project structure.

The Landing Page should only consume the authentication state it needs.

Example:

- isAuthenticated
- isLoading

The Landing Page should not contain authentication API logic.

---

# 15. Frontend Authentication Architecture

Preferred flow:

Landing Page
↓
useAuthStore()
↓
isAuthenticated
↓
React Router navigation

Authentication API flow:

Login/Register Page
↓
Zustand Auth Store
↓
Auth Service
↓
Axios API Client
↓
Backend API

The Landing Page should not directly call Axios.

The Landing Page should not directly call:

- /auth/login
- /auth/register
- /auth/logout
- /auth/me

These responsibilities belong to the authentication service and Zustand store.

---

# 16. API Layer

Use a centralized Axios client.

Recommended structure:

src/
├── services/
│ ├── apiClient.js
│ ├── auth.service.js
│ ├── ai.service.js
│ └── recipe.service.js
│
└── stores/
├── authStore.js
└── recipeStore.js

The Landing Page does not need to call the AI service.

The AI Assistant should use the existing AI service.

The authentication store should use the existing auth service.

---

# 17. Routing

The Landing Page route is:

/

Existing routes:

/login

/register

/ai-assistant

/my-recipes

/meal-plan

The existing AI Assistant route must remain unchanged.

Do not move or rewrite the AI Assistant unless specifically requested.

The Landing Page should navigate to existing routes.

---

# 18. Protected Routes

Protected pages should require authentication.

Examples:

/ai-assistant

/my-recipes

/meal-plan

If the user is unauthenticated:

Redirect to:

/login

After successful authentication:

Redirect the user to the intended page.

Do not duplicate protection logic inside every page.

Use a reusable ProtectedRoute component or the existing project implementation.

---

# 19. Reusable Components

Recommended structure:

src/
├── pages/
│ └── Landing/
│ ├── Landing.jsx
│ ├── landing.data.js
│ └── components/
│ ├── HeroSection.jsx
│ ├── HowItWorks.jsx
│ ├── ExploreIdeas.jsx
│ ├── FeatureOverview.jsx
│ └── FinalCTA.jsx
│
├── components/
│ ├── common/
│ │ ├── Button.jsx
│ │ ├── Container.jsx
│ │ └── SectionHeading.jsx
│ │
│ └── layout/
│ ├── Navbar.jsx
│ └── Footer.jsx
│
├── stores/
│ └── authStore.js
│
└── services/
├── apiClient.js
└── auth.service.js

Reuse existing components if they already exist.

Do not create duplicate components.

---

# 20. Dynamic Data

Repeated content must be data-driven.

Examples:

Navigation links

How-it-works steps

Recipe ideas

Feature cards

Example data:

const recipeIdeas = [
"Chicken Tikka",
"Quick Pasta",
"Biryani",
"Homemade Pizza",
"Vegetarian Dinner"
];

Components should render the data.

Do not duplicate JSX for every recipe idea.

The same component should work for:

- Chicken Tikka
- Pasta
- Biryani
- Pizza

---

# 21. CTA Reuse

Hero CTA and Final CTA have the same primary behavior.

Do not duplicate complex authentication logic.

Create a reusable navigation helper or use the existing routing logic.

Conceptually:

User clicks Create Recipe
↓
Check Zustand auth state
↓
Authenticated?
↓
Yes → /ai-assistant
No → /login

Both CTA sections should use the same behavior.

---

# 22. Design Direction

The landing page should feel:

- Warm
- Modern
- Calm
- Food-focused
- Premium
- Simple
- Human-made

The landing page should not feel like:

- Generic AI SaaS
- Chatbot interface
- Admin dashboard
- Random template
- Excessively futuristic AI product

Prioritize:

- Clear visual hierarchy
- Strong typography
- Good spacing
- High-quality food/product visuals
- Clear CTA
- Responsive design

The user should immediately understand:

1. What Kitchen Hearth does.
2. Why it is useful.
3. What to do next.

---

# 23. Important Implementation Rules

Before modifying the Landing Page:

1. Inspect the existing frontend structure.
2. Inspect the existing AI Assistant.
3. Inspect the existing Zustand stores.
4. Inspect the existing authentication flow.
5. Inspect the existing API services.
6. Inspect the existing routes.
7. Inspect existing shared components.
8. Reuse existing design tokens and styles.

Do not:

- Rewrite the AI Assistant.
- Create a duplicate AI generation flow.
- Create an AuthContext.
- Create a second Zustand auth store.
- Create duplicate authentication logic.
- Call OpenAI from the Landing Page.
- Call the AI generation API from the Landing Page.
- Create a second Axios instance unnecessarily.
- Replace reusable components without a reason.
- Modify unrelated pages.
- Install unnecessary packages.
- Introduce a new UI library.
- Create a second global state system.

Only modify files required for the Landing Page.

---

# 24. Acceptance Criteria

The Landing Page is complete when:

- The user immediately understands what Kitchen Hearth does.
- The page has one clear primary CTA.
- The existing AI Assistant is not duplicated.
- The existing AI generation API is not called from the Landing Page.
- The CTA correctly handles authenticated and unauthenticated users.
- Zustand is used as the frontend authentication state source.
- No AuthContext is introduced.
- No second authentication state system is created.
- The Landing Page is responsive.
- Components are reusable.
- Repeated content is data-driven.
- Existing authentication is reused.
- Existing AI Assistant functionality is preserved.
- Existing routes are preserved.
- Existing pages are not unnecessarily changed.
- No unnecessary packages are installed.

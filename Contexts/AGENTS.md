# Frontend Rules

## Stack

- React
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Lucide React

## Structure

Use:

src/
├── components/
├── pages/
├── services/
├── context/
├── hooks/
├── routes/
├── lib/
├── App.jsx
└── main.jsx

## Rules

- Keep components focused.
- Do not create giant components.
- Keep API calls in services.
- Do not hardcode API URLs.
- Use VITE_API_URL.
- Use local state unless global state is genuinely required.
- Use AuthContext only for authentication state.
- Do not introduce Redux or Zustand without a real need.
- Reuse existing components before creating new ones.
- Maintain the existing Kitchen Hearth design system.
- Do not redesign unrelated pages.
- Make all UI responsive.
- Handle loading, error, and empty states.

## AI Assistant Flow

The main flow is:

User describes desired dish
→ AI generates ingredients
→ User reviews ingredients
→ AI generates recipe
→ User can save recipe

The primary input is natural language.

Do not make ingredient chips the primary interaction.

The AI Assistant should not look like a generic ChatGPT clone.

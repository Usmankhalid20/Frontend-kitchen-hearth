# 🍽️ Kitchen Hearth — Frontend

> **Your personal AI sous-chef.** Turn ingredients into restaurant-quality recipes with the power of AI.

The Kitchen Hearth frontend is a React + Vite single-page application that connects to the Kitchen Hearth backend API to deliver AI-powered recipe generation, meal planning, and recipe discovery.

---

## ✨ Features

- **AI Recipe Generation** — Describe ingredients or a meal idea and get a full recipe instantly
- **Recipe Discovery** — Browse and search a curated library of recipes
- **Saved Recipes** — Bookmark and revisit your favourites
- **Meal Planner** — Organise your weekly meals at a glance
- **User Authentication** — Secure sign-up / login with JWT-based sessions
- **Admin Panel** — Manage users and content from a dedicated admin dashboard

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & transitions |
| GSAP | Advanced scroll animations |
| Zustand | Global state management |
| Axios | HTTP client |
| Lucide React | Icon library |

---

## 📁 Project Structure

```
src/
├── components/        # Shared / reusable UI components
├── layouts/           # Page layout wrappers
├── pages/
│   ├── Landing/       # Public landing page
│   ├── Auth/          # Login & Register
│   ├── user/
│   │   ├── AIAssistant/   # AI recipe generator
│   │   ├── Dashboard/     # User dashboard
│   │   ├── Recipes/       # Saved recipes
│   │   ├── MealPlanner/   # Weekly meal planner
│   │   └── Settings/      # Account settings
│   └── admin/         # Admin panel
├── routes/            # Route definitions & auth guards
├── services/          # Axios API call wrappers
└── stores/            # Zustand state stores
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Kitchen Hearth backend running on `http://localhost:5000`

### Install & run

```bash
npm install
npm run dev    # http://localhost:5173
```

### Environment

Create a `.env` file in this directory if you need to override the API base URL:

```env
VITE_API_URL=http://localhost:5000
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |

---

## 📄 License

MIT © Kitchen Hearth

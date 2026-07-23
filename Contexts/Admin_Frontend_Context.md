# Kitchen Hearth — Admin Frontend Context

## 1. Project Overview

Kitchen Hearth is a **MERN Stack** application.

The frontend is built with:

- React
- React Router
- Zustand
- Axios
- Tailwind CSS
- Lucide React

The backend already exposes authentication and administrative APIs.

This context focuses only on the frontend implementation of the Admin Dashboard.

Do not modify unrelated pages.

Do not redesign the existing application.

The Admin Dashboard should integrate into the existing frontend architecture.

---

# 2. Existing Frontend Architecture

Reuse the existing project structure.

Recommended structure:

```text
src/
│
├── components/
├── layouts/
├── pages/
├── services/
├── stores/
├── routes/
├── hooks/
└── utils/
```

Reuse existing:

- Layouts
- Buttons
- Cards
- Tables
- Inputs
- Modals
- Toasts
- Loading Components

Avoid duplicate components.

---

# 3. Objectives

Implement a production-ready Admin Dashboard.

Focus on:

- Clean UI
- Excellent UX
- Responsive Design
- Permission-based Navigation
- Reusable Components
- Data-driven Interfaces

The dashboard should feel like a modern SaaS product.

---

# 4. Existing Authentication

Reuse the existing Zustand authentication store.

Use the existing authentication state.

Do not create:

- AuthContext
- Another Zustand auth store
- Duplicate authentication logic

Use the existing store for:

- User
- Role
- Permissions
- isAuthenticated

---

# 5. Route Protection

Protect every admin route.

Only authenticated users with the required permissions should access dashboard pages.

Unauthorized users should be redirected appropriately.

Hide inaccessible routes from the sidebar.

---

# 6. Admin Layout

Create a dedicated Admin Layout.

Structure:

```text
Sidebar
        │
        ├── Logo
        ├── Navigation
        └── User Menu

↓

Top Navbar

↓

Page Content

↓

Footer (optional)
```

The layout should be reusable for every admin page.

---

# 7. Sidebar Navigation

The sidebar should be permission-aware.

Show only pages the current user can access.

Navigation:

- Dashboard
- Users
- Admin Management
- Roles & Permissions
- Recipes
- AI Usage
- Audit Logs
- Settings

Super Admin-only pages:

- Admin Management
- Roles & Permissions
- Settings

These pages should not appear for normal Admins.

---

# 8. Dashboard

The dashboard is an overview of application activity.

Display summary cards:

- Total Users
- Total Recipes
- Total Admins
- AI Requests Today
- Failed Requests
- Active Users

Display additional sections:

- Recent Users
- Recent Recipes
- Recent Activity

Display real charts using backend analytics.

Do not display fake statistics.

---

# 9. Users Page

Features:

- User Table
- Search
- Filters
- Pagination
- User Details
- Suspend User
- Restore User
- Soft Delete User

Actions should appear based on permissions.

---

# 10. Admin Management

Super Admin only.

Features:

- Admin List
- Create Admin
- Edit Admin
- Delete Admin
- View Admin Details

Normal Admins should never access this page.

---

# 11. Roles & Permissions

Display:

- Roles
- Assigned Permissions
- Permission Matrix

If permission editing is unavailable, render the data in read-only mode.

Do not build a complex permission editor unless required.

---

# 12. Recipes

Display:

- Recipe Table
- Search
- Filters
- Public Recipes
- Reported Recipes

Actions:

- View
- Delete
- Moderate

---

# 13. AI Usage

Display backend analytics.

Examples:

- Total Requests
- Daily Requests
- Failed Requests
- Average Response Time
- Most Active Users

Use charts where appropriate.

---

# 14. Audit Logs

Display:

- Action
- Actor
- Target
- Timestamp

Support:

- Search
- Filters
- Pagination

Audit logs are read-only.

---

# 15. Settings

Super Admin only.

Display configuration sections.

Examples:

- Application Settings
- AI Settings
- Security Settings
- System Information

Sensitive actions should require confirmation.

---

# 16. Component Structure

Recommended components:

```text
components/admin/

AdminLayout

Sidebar

TopNavbar

DashboardCard

DataTable

SearchBar

FilterDropdown

StatsCard

ActivityCard

ChartCard

ConfirmModal

PermissionGuard

EmptyState

LoadingState
```

Build reusable components.

Avoid duplicated layouts.

---

# 17. State Management

Reuse Zustand.

Create admin stores only if necessary.

Examples:

- dashboardStore
- userStore
- recipeStore

Do not store duplicate authentication state.

---

# 18. API Integration

Reuse the existing Axios client.

Recommended services:

```text
services/

admin.service.js

analytics.service.js

user.service.js

recipe.service.js
```

Do not create another Axios instance.

---

# 19. UI & UX Guidelines

The dashboard should feel:

- Modern
- Professional
- Clean
- Responsive
- Fast
- Consistent
- Accessible

Prioritize:

- Clear hierarchy
- Consistent spacing
- Readable typography
- Reusable cards
- Meaningful colors
- Responsive tables
- Empty states
- Loading skeletons
- Error states
- Confirmation dialogs

Avoid:

- Cluttered layouts
- Unnecessary animations
- Random gradients
- Fake statistics
- Generic templates

---

# 20. Responsive Design

Support:

- Desktop
- Tablet
- Mobile

Sidebar behavior:

Desktop

- Fixed sidebar

Tablet

- Collapsible sidebar

Mobile

- Drawer navigation

Tables should remain usable on smaller screens.

---

# 21. Implementation Rules

Before implementing:

- Inspect the existing frontend architecture.
- Reuse existing layouts.
- Reuse existing components.
- Reuse existing Zustand stores.
- Reuse existing Axios client.
- Follow existing routing conventions.
- Keep components modular.
- Keep pages lightweight.
- Move reusable UI into shared components.
- Do not rewrite unrelated pages.
- Do not introduce another UI library.
- Do not duplicate authentication logic.

Only modify files required for the Admin Dashboard.

---

# 22. Acceptance Criteria

The Admin Dashboard is complete when:

- The dashboard integrates with the existing frontend.
- Existing authentication is reused.
- Existing Zustand store is reused.
- Existing Axios client is reused.
- Navigation is permission-aware.
- Super Admin pages are hidden from normal Admins.
- Dashboard displays real backend data.
- Tables support search, filtering, and pagination.
- Charts display real analytics.
- Components are reusable.
- Layout is responsive.
- Loading and error states are implemented.
- No duplicate authentication logic exists.
- No unnecessary packages are installed.
- The UI is consistent with the rest of Kitchen Hearth.

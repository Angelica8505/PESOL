# Welcome to PESOLUTION

PESOLUTION is a job platform designed to connect applicants, employers, and administrators through a smart, user-friendly interface. It combines modern frontend features, role-based pages, and productivity tools to help users find jobs, manage applications, and collaborate effectively.

This repository contains the full PESOLUTION app, including the landing pages, authentication flows, dashboards, and backend API connectivity. Whether you are an applicant searching for work, an employer posting opportunities, or an admin managing the system, PESOLUTION is built to support your needs.

## PESOLUTION Code Overview

### Architecture and Stack
- Frontend: React + TypeScript with Vite and Tailwind CSS.
- Backend: PHP + MySQL API for authentication, profiles, bookmarks, and AI features.
- Dev server: `server.ts` uses Express and Vite middleware for local development.
- AI: Gemini integration through server-side endpoints and a front-end AI chat service.

### Frontend Structure
- `src/main.tsx`: React application entry point that renders `<App />`.
- `src/App.tsx`: Main route definitions and protected navigation for applicant, employer, and admin users.
- `src/lib/api.ts`: Wrapper for sending JSON requests to the backend API with `fetch` and error handling.
- `src/services/chatService.ts`: Sends AI chat data and language preferences to the backend AI endpoints.

### State and Context
- `src/contexts/AuthContext.tsx`: Manages login, register, logout, and user session state.
- `src/contexts/ProfileContext.tsx`: Stores user profile data, AI roadmap results, job match statistics, and profile updates.
- `src/contexts/ThemeContext.tsx` / `LanguageContext.tsx`: Manage theme preferences and language selection across the app.
- `src/contexts/BookmarkContext.tsx`: Handles saved job bookmarks for applicants.
- `src/contexts/ToastContext.tsx`: Shows temporary feedback messages for success or error events.

### Pages and User Flows
- Applicant routes: dashboards, job search, forum, profile, saved jobs, applications.
- Employer routes: employer dashboard and related portal pages.
- Admin routes: admin dashboard and portal pages.
- Role-based navigation is enforced by `ProtectedRoute` in `src/App.tsx`, which redirects users to the correct portal based on their role.

### Backend PHP API
- `api/config.php`: Reads `.env` environment variables for DB, AI key, and Power BI URL.
- `api/database.php`: Creates a reusable PDO connection to MySQL.
- `api/index.php`: Main API router handling authentication, profile management, bookmarks, and AI helpers.

#### Important backend routes
- `auth/register`: Creates a new user and profile, stores session data.
- `auth/login`: Verifies credentials and returns user/profile info.
- `auth/logout`: Clears session state.
- `auth/me`: Returns current authenticated user session.
- `profile` GET/PUT: Reads and updates profile details, skills, education, and experience.
- `bookmarks`: Provides user job bookmarks and toggling behavior.
- `ai/*`: AI-enabled endpoints for career roadmaps, job recommendations, chat responses, and resume data extraction.

### Notes for Explanation
- The front-end requests `/api/*` routes through the API wrapper, keeping backend logic separated from UI logic.
- Authentication uses PHP sessions for secure login state in the browser.
- The system supports multi-role accounts and only allows users to access pages for their assigned role.
- AI features are routed through server code to avoid exposing API keys in the browser.

This overview should help you explain how the system is organized, how the frontend and backend communicate, and the purpose of the major code components.

# Docsier Landing Page

## Overview

Public-facing marketing website and authentication portal for Docsier. Includes the landing page, feature showcase, and login/signup functionality.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Supabase (authentication)

## Setup

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env

# Start development server
npm run dev
```

The app runs on `http://localhost:8080` by default.

### Environment Variables

Configure these in your `.env` file:

```
VITE_APP_URL=http://localhost:8081
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Pages

- `/` - Landing page with hero, features, and CTA
- `/auth` - Login/signup/password reset
- `/rentabilidad` - ROI calculator

## Authentication Flow

1. Users visit the landing page
2. Click "Login" to go to `/auth`
3. Enter credentials (email/password)
4. On success, redirected to the Agent Dashboard at `VITE_APP_URL#token=<access_token>`
5. Dashboard reads the token from `window.location.hash`, validates it, establishes the session, and clears the hash

The token is passed in the URL fragment (not the query string) so it is never sent to servers or leaked via logs and `Referer` headers.

## Deployment (Railway)

Vite inlines env vars at build time, so these must be set as Railway service variables **before** building: `VITE_APP_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Without `VITE_SUPABASE_*` the app fails to start; without `VITE_APP_URL` login shows an error instead of redirecting to localhost.

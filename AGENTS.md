# Project Context for AI Assistants

## Stack

This is a **Next.js 14** app using the **Pages Router**, TypeScript, and Tailwind CSS.  
The photo data comes from the **Pexels API** (REST).

## Conventions

- All data fetching go in `useEffect` hooks inside Client Components, following best practices
- New UI components go in `app/components/`.
- State that is shared across pages should be lifted into `pages/_app.tsx`.
- The Pexels API key is exposed on the client via `NEXT_PUBLIC_PEXELS_API_KEY`.
- When adding pagination, always use the `page` query param; the API does not support cursor-based pagination.

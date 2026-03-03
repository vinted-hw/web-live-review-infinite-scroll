# web-live-review-infinite-scroll

A masonry photo gallery built with Next.js 15, TypeScript, and Tailwind CSS, powered by the [Pexels API](https://www.pexels.com/api/).

## Prerequisites

- Node.js 18+
- A [Pexels API key](https://www.pexels.com/api/new/)

## Setup

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd web-live-review-infinite-scroll
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and add your Pexels API key:

   ```
   PEXELS_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start development server     |
| `npm run build` | Build for production         |
| `npm run start` | Start production server      |
| `npm run lint`  | Run ESLint                   |
| `npm test`      | Run tests                    |

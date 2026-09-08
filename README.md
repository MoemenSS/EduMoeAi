# EduMoeAi

A Next.js 16 / React 19 / TypeScript learning platform for FUE Computer Science students, connected to Supabase and deployed on Vercel.

## Run

Node.js 24 is required.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set only the public Supabase URL and publishable key in the public environment variables. Never put service-role keys in `NEXT_PUBLIC_*` variables.

```sh
npm run typecheck
npm run lint
npm run build
```

## Structure

- `app/`: page routes, auth callback, and authenticated admin server actions.
- `components/`: student workspaces and admin editors.
- `lib/`: course design metadata, content access, practice seed, shared learning calculations, Supabase clients.
- `content/`: original starter reading seed.
- `database/`: reviewed database operations and rollback-only verification scripts.
- `design-reference/`: supplied original HTML, preserved outside the production public directory.
- `public/brand/`: SVG wordmark and app mark.
- `docs/`: release status, verification evidence, and third-party notices.

Course and practice content comes from Supabase. The checked-in question bank is seed/reference data; admin edits in the database control the published practice library. Ranked challenges use a separate private answer bank and server scoring.

## Deployment

`vercel.json` explicitly selects the Next.js framework. Deploy from the linked project directory with `vercel --prod`, or push to the connected GitHub production branch. The public deployment is https://edu-moe-ai.vercel.app/.

See `docs/release-status.md` for what is implemented and what still requires configuration or content. SQL operation files describe migrations already applied to the linked project; do not blindly rerun them against production.

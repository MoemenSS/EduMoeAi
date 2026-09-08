# EduMoeAi

A Next.js 16 / React 19 / TypeScript conversion of the original EduMoe interface for FUE Computer Science students. The supplied HTML documents are the visual source of truth and are generated into typed runtime documents without redesigning them.

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

- `app/`: thin TSX page routes for every original screen, plus the existing auth callback.
- `components/original-page.tsx`: the isolated React renderer that prevents framework styles from changing the originals.
- `lib/original-pages.generated.ts`: generated TypeScript documents used by the production routes.
- `scripts/convert-original-pages.mjs`: repeatable converter from the supplied HTML sources to the typed runtime source.
- `content/`: original starter reading seed.
- `database/`: reviewed database operations and rollback-only verification scripts.
- `design-reference/`: supplied original HTML preserved as reference copies outside the public directory.
- `public/brand/`: SVG wordmark and app mark.
- `docs/`: release status, verification evidence, and third-party notices.

The original page styling, copy, canvas effects, themes, and browser interactions are preserved. Only old links such as `dashboard.html` are translated to their equivalent Next.js routes.

## Deployment

`vercel.json` explicitly selects the Next.js framework. Deploy from the linked project directory with `vercel --prod`, or push to the connected GitHub production branch. The public deployment is https://edu-moe-ai.vercel.app/.

See `docs/release-status.md` for what is implemented and what still requires configuration or content. SQL operation files describe migrations already applied to the linked project; do not blindly rerun them against production.

# Release status — September 8, 2026

## Implemented

- Next.js/React/TypeScript routes for all nine supplied HTML entry points, plus About and sign-in. Original files preserved outside `public/`.
- Ruby glass homepage with interactive C++/logic/calculus excerpts, four persisted accent themes, mobile layout, reduced-motion support, and low-power effects control.
- HeroUI buttons, scoped loading of mathjs and third-party labs, SVG brand assets, and a small silent product-tour WebM.
- Supabase-backed course catalog and eight published starter readings with worked examples. Each course opens its own material.
- 256 editable practice questions/variations in Supabase: 64 authored concepts and 192 numerical variants. This is 32 items per subject, not 256 different concepts. Questions and answers shuffle for each set.
- Device and account practice history, per-account local storage, dashboard accuracy/streak/weak-topic calculations, and shared MoeAI learning signals.
- Server-backed idempotent lesson completion with percentage calculated from published lessons.
- Original OneCompiler C++ embed restored. Full external Logisim.app engine loads only on request.
- Calculus differentiation with input validation; binomial/Poisson distributions; complete/cycle/path graphs; ideal projectile motion.
- Ranked solo challenges with 376 separate private question variants, server deadlines, 20-start daily limit, serialized starts, server scoring, replay protection, ownership checks, and opt-in public leaderboard. No fake bots or Elo.
- Admin course/lecture/question editing, draft/published/archived states, resource/configuration records, student account lookup, audited role changes, and automatic database audit entries. Revoked admin roles are checked against current database state.
- Auth session refresh proxy and safe callback redirect handling. New public profiles opt out of the ladder until the student chooses to publish their display name.

## Not complete or awaiting the owner

- The eight Telegram recordings have not been uploaded to YouTube. The source posts and destination channel are still needed; the starter readings are not substitutes for those recordings.
- No generative model provider/key is configured. MoeAI explicitly runs in notes mode, retrieving published passages and calculated learning signals; it is not a live generative tutor yet.
- Live head-to-head matchmaking, Elo seasons, and tournaments are not included. Ranked currently uses a real, verified solo challenge ladder.
- The first administrator must sign in once, and the owner must identify the email to receive the admin role. No real administrator was inferred or silently assigned.
- Admin resources/settings are stored content records. They are not a full institution ERP, document ingestion pipeline, model management system, or arbitrary database editor.
- Formal testing on a physical 4 GB phone is outstanding. Desktop/mobile browser checks and reduced-effects behavior are covered; hardware performance is not claimed.
- External lab availability and mobile usability remain dependent on OneCompiler and Logisim.app. A full-screen link is provided when embedding is blocked.

## Operation notes

The SQL files document changes applied to the linked Supabase project and rollback-only tests. They are not a clean-room initial schema; the base tables already existed. Do not rerun operation scripts blindly.

No service-role key is shipped to clients. Practice answers are intentionally public to support immediate explanations; the ranked answer bank is private and distinct.

The original HTML references contain historical demos and unimplemented controls. Their presence in the repository does not mean every original interaction is production-ready.

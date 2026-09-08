# Release status — original design restoration

## Published interface

The original EduMoe HTML documents are the visual source of truth for all nine main routes. Each document is converted into a generated TypeScript module and rendered by a small TSX route component inside an isolated document viewport. This retains the original CSS cascade, DOM, canvas work, fonts, copy, animations, and JavaScript behavior without interference from the newer shared UI.

| Original document | Production route |
| --- | --- |
| `index (7).html` | `/` |
| `courses.html` | `/courses` |
| `dashboard.html` | `/dashboard` |
| `lecture_example.html` | `/lecture` |
| `moeai.html` | `/moeai` |
| `quizzes.html` | `/quizzes` |
| `ranked.html` | `/ranked` |
| `simulators.html` | `/simulators` |
| `admin.html` | `/admin` |

The converter maps legacy `.html` links and the homepage's obsolete “coming soon” navigation handlers to their corresponding Next.js routes. They open in the top-level window. External links, appearance, and non-navigation interactions remain as authored in the originals.

## Verification

- TypeScript and ESLint pass.
- The Next.js 16 production build passes.
- All nine converted routes load in the browser.
- Direct-source and TSX-route captures were compared in the same browser state. The layout, typography, palette, artwork, copy, and controls match.
- The original documents remain in `design-reference/originals/`, and `scripts/convert-original-pages.mjs` makes the conversion reproducible.

The existing Supabase migrations and supporting newer components remain in the repository history and source tree, but the restored original routes do not visually expose that newer interface.

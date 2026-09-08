# Original design references

These nine original HTML files were supplied by Moemen and are preserved as migration references. They are not served by Next.js and are not production entry points. Their embedded demo statistics, mock AI replies, and client-side administrative controls are not trusted production implementations.

| Original | TypeScript route | Main module |
| --- | --- | --- |
| index (7).html | / | app/page.tsx, components/home-playground.tsx |
| courses.html | /courses | components/course-catalog.tsx, lib/catalog.ts |
| lecture_example.html | /lecture?course=… | components/lecture-workspace.tsx |
| dashboard.html | /dashboard | components/dashboard-experience.tsx, lib/learning.ts |
| quizzes.html | /quizzes | components/quiz-studio.tsx, lib/question-bank.ts |
| simulators.html | /simulators | components/simulator-lab.tsx, components/math-lab.tsx |
| ranked.html | /ranked | components/ranked-arena.tsx, database/learning-operations.sql |
| moeai.html | /moeai | components/moeai-chat.tsx |
| admin.html | /admin | components/admin-console.tsx, app/admin/actions.ts |

The production routes are a maintained implementation of the core flows, not a claim that every control in the original prototypes has been migrated. Multiplayer tournaments, flashcards, broad institution management, and generative MoeAI are tracked in docs/release-status.md.

# EduMoeAI

EduMoeAI is a student-built Computer Science learning platform for FUE. The production site intentionally uses one self-contained HTML file per page so the interface stays easy to inspect, edit, and teach from.

## Pages

- `index.html` — home, animated EduMoe book, subject map, and platform navigation
- `courses.html` — curriculum and lecture entry points
- `quizzes.html` — browser-based practice
- `simulators.html` — C++, math, physics, probability, and logic tools
- `ranked.html` — ranked learning interface
- `dashboard.html` — student progress interface
- `lecture_example.html` — interactive lecture workspace
- `moeai.html` — full educational AI workspace with Markdown, KaTeX, code blocks, voice input, source uploads, study modes, and local conversation continuity
- `about.html` — project story, principles, roadmap, and community
- `admin.html` — original administration interface
- `api/moeai.js` — server-only streamed provider fallback for MoeAI

Every page keeps its CSS and JavaScript inline. There is no framework build step and no browser-exposed AI credential.

## Local preview

Serve the directory with any static server:

```powershell
python -m http.server 4173
```

Static pages work directly. The `/api/moeai` route requires Vercel or an equivalent Node serverless runtime.

## MoeAI configuration

Copy `.env.example` to `.env.local` for local secret storage. Configure `GEMINI_API_KEY`, optional `GROQ_API_KEY` and `GEMINI_BACKUP_API_KEY`, and `MOEAI_SYSTEM_PROMPT` as private Vercel environment variables. Never place them in an HTML file or a variable prefixed with `NEXT_PUBLIC_`.

Provider order is Gemini, Groq, then the backup Gemini credential. The browser receives only streamed response text.

## Deployment

The repository is linked to the `edu-moe-ai` Vercel project. A production deployment serves the HTML files directly and runs `api/moeai.js` as a Vercel Function.

Public site: https://edu-moe-ai.vercel.app/

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceDirectory = path.resolve(
  process.cwd(),
  "../EduMoeAi Aug 28 (No BS) (Old)/frontend of EduMoe/public",
);

const pages = {
  home: "index (7).html",
  courses: "courses.html",
  dashboard: "dashboard.html",
  lecture: "lecture_example.html",
  moeai: "moeai.html",
  quizzes: "quizzes.html",
  ranked: "ranked.html",
  simulators: "simulators.html",
  admin: "admin.html",
};

const routeLinks = {
  "index.html": "/",
  "courses.html": "/courses",
  "dashboard.html": "/dashboard",
  "lecture_example.html": "/lecture",
  "moeai.html": "/moeai",
  "quizzes.html": "/quizzes",
  "ranked.html": "/ranked",
  "simulators.html": "/simulators",
  "admin.html": "/admin",
};

const homeToastRoutes = {
  "📚 Courses page coming soon!": "/courses",
  "📚 Courses coming soon!": "/courses",
  "📘 Structured Programming — coming soon": "/courses",
  "🔌 Logic Design — coming soon": "/courses",
  "📐 Differential Equations — coming soon": "/courses",
  "🎲 Probability & Statistics — coming soon": "/courses",
  "∫ Calculus — coming soon": "/courses",
  "⚡ Physics — coming soon": "/courses",
  "🔢 Discrete Mathematics — coming soon": "/courses",
  "💾 Computing Fundamentals — coming soon": "/courses",
  "🎛️ Simulators page coming soon!": "/simulators",
  "🎛️ Simulators coming soon!": "/simulators",
  "⌨️ Compiler coming soon!": "/simulators",
  "🧮 Math Solver coming soon!": "/simulators",
  "🔌 Logic Sim coming soon!": "/simulators",
  "📝 Quizzes coming soon!": "/quizzes",
  "📝 Practice page coming soon!": "/quizzes",
  "🏆 Ranked page coming soon!": "/ranked",
  "🏆 Ranked coming soon!": "/ranked",
  "🧠 MoeAI is coming soon — the FUE curriculum-aware assistant.": "/moeai",
  "🧠 MoeAI page coming soon!": "/moeai",
  "🧠 MoeAI coming soon!": "/moeai",
  "ℹ️ About coming soon!": "/about",
  "📊 Admin panel coming soon!": "/admin",
};

const converted = {};

for (const [key, fileName] of Object.entries(pages)) {
  let document = await readFile(path.join(sourceDirectory, fileName), "utf8");
  for (const [oldLink, route] of Object.entries(routeLinks)) {
    document = document.replaceAll(
      `href="${oldLink}"`,
      `target="_top" href="${route}"`,
    );
  }

  if (key === "home") {
    for (const [toast, route] of Object.entries(homeToastRoutes)) {
      document = document.replaceAll(
        `onclick="showToast('${toast}')"`,
        `onclick="window.top.location.href='${route}'; return false;"`,
      );
    }
  }
  converted[key] = document;
}

const output = `// Generated from the supplied original HTML files. Do not edit by hand.\n\nexport const originalDocuments = ${JSON.stringify(converted)} as const;\n\nexport type OriginalPageName = keyof typeof originalDocuments;\n`;

await writeFile(
  path.resolve(process.cwd(), "lib/original-pages.generated.ts"),
  output,
  "utf8",
);

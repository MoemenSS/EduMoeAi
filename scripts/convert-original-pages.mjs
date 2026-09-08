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

const converted = {};

for (const [key, fileName] of Object.entries(pages)) {
  let document = await readFile(path.join(sourceDirectory, fileName), "utf8");
  for (const [oldLink, route] of Object.entries(routeLinks)) {
    document = document.replaceAll(
      `href="${oldLink}"`,
      `target="_top" href="${route}"`,
    );
  }
  converted[key] = document;
}

const output = `// Generated from the supplied original HTML files. Do not edit by hand.\n\nexport const originalDocuments = ${JSON.stringify(converted)} as const;\n\nexport type OriginalPageName = keyof typeof originalDocuments;\n`;

await writeFile(
  path.resolve(process.cwd(), "lib/original-pages.generated.ts"),
  output,
  "utf8",
);

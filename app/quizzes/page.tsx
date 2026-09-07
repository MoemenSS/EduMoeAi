import type { Metadata } from "next";
import { AppPage } from "@/components/app-page";
import { QuizStudio } from "@/components/quiz-studio";

export const metadata: Metadata = { title: "Practice", description: "Curriculum-aligned quizzes that adapt to your learning signals." };
export default function QuizzesPage() { return <AppPage eyebrow="Practice studio" title="Turn weak spots into momentum." description="Focused checks across eight subjects, with useful feedback and a path back to the lesson."><QuizStudio /></AppPage>; }


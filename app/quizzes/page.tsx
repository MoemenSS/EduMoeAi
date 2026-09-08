import type { Metadata } from "next";
import { AppPage } from "@/components/app-page";
import { QuizStudio } from "@/components/quiz-studio";
import { createClient } from "@/lib/supabase/server";
import type { QuizQuestion } from "@/lib/question-bank";
export const metadata: Metadata = {
  title: "Practice",
  description:
    "Curriculum-aligned questions with explanations and saved learning signals.",
};
export default async function QuizzesPage() {
  const db = await createClient();
  const [
    { data, error },
    {
      data: { user },
    },
  ] = await Promise.all([
    db
      .from("practice_questions")
      .select("id,title,subject,topic,options,correct,explanation")
      .eq("status", "published")
      .limit(1000),
    db.auth.getUser(),
  ]);
  const questions: QuizQuestion[] = (data || []).map((q) => ({
    ...q,
    prompt: q.title,
    options: q.options as QuizQuestion["options"],
  }));
  return (
    <AppPage
      eyebrow="Practice studio"
      title="Turn weak spots into momentum."
      description="Focused checks across eight subjects, with useful feedback and a path back to the lesson."
    >
      {error ? (
        <p role="alert">
          The question library could not be loaded. Please refresh and try
          again.
        </p>
      ) : questions.length ? (
        <QuizStudio bank={questions} userId={user?.id || null} />
      ) : (
        <p>No practice questions have been published yet.</p>
      )}
    </AppPage>
  );
}

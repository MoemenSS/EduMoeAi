import type { Metadata } from "next";
import { AppPage } from "@/components/app-page";
import { MoeAiChat } from "@/components/moeai-chat";
import { getCatalog } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/server";
export const metadata: Metadata = {
  title: "MoeAI",
  description: "Course notes and personal learning signals in one workspace.",
};
export default async function MoeAiPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const params = await searchParams;
  const catalog = await getCatalog();
  const course =
    catalog.courses.find((c) => c.code === (params.course || "CS102")) ||
    catalog.courses[0];
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  const { data: attempts } = user
    ? await db
        .from("quiz_attempts")
        .select("id,subject,score,total,answers,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100)
    : { data: [] };
  return (
    <AppPage
      eyebrow="MoeAI workspace"
      title="Your context comes first."
      description="Find the relevant course note and see what needs practice. Learning analytics use your recorded results, with no model call required."
      wide
    >
      <MoeAiChat
        userId={user?.id || null}
        lessons={catalog.lessons.filter((l) => l.course_id === course?.id)}
        attempts={attempts || []}
        course={course?.code || "CS102"}
        title={course?.title || "Structured Programming"}
      />
    </AppPage>
  );
}

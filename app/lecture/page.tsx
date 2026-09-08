import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppPage } from "@/components/app-page";
import { LectureWorkspace } from "@/components/lecture-workspace";
import { getCatalog } from "@/lib/catalog";
export const metadata: Metadata = {
  title: "Lecture workspace",
  description: "Read, watch, and practice a course concept.",
};
export default async function LecturePage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; lesson?: string }>;
}) {
  const params = await searchParams;
  const catalog = await getCatalog();
  if (catalog.error)
    return (
      <AppPage
        title="The library is taking a moment."
        eyebrow="Courses"
        description={catalog.error}
      >
        <a href="/courses">Return to courses</a>
      </AppPage>
    );
  const course = catalog.courses.find(
    (c) => c.code === (params.course || "CS102"),
  );
  if (!course) notFound();
  const lessons = catalog.lessons.filter((l) => l.course_id === course.id);
  return (
    <AppPage
      eyebrow={course.code}
      title={course.title}
      description="Read the explanation. Try the idea. Keep the part that clicks."
      wide
    >
      <LectureWorkspace
        course={course.code}
        title={course.title}
        lessons={lessons}
        selectedId={params.lesson}
      />
    </AppPage>
  );
}

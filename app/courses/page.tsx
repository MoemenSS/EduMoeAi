import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { AppPage } from "@/components/app-page";
import { CourseCatalog } from "@/components/course-catalog";
import { getCatalog } from "@/lib/catalog";
export const metadata: Metadata = {
  title: "Courses",
  description:
    "Your first-year Computer Science curriculum, from concept to practice.",
};
export default async function CoursesPage() {
  const { courses, lessons, error } = await getCatalog();
  return (
    <AppPage
      eyebrow="YOUR SEMESTER, SORTED"
      title="Big ideas. Clear starting points."
      description="Pick your subject, read a worked explanation, then make it stick in the practice studio."
      meta={
        <span>
          <BookOpen size={15} />
          {courses.length} subjects · {lessons.length} published readings
        </span>
      }
    >
      {error ? (
        <p role="alert">{error}</p>
      ) : (
        <CourseCatalog courses={courses} />
      )}
      <section className="content-release glass-panel">
        <div>
          <span className="section-kicker">FROM THE ORIGINAL COMMUNITY</span>
          <h2>Looking for Moemen’s recordings?</h2>
          <p>
            The existing lectures are on Telegram. YouTube editions will appear
            here after their links and thumbnails are published.
          </p>
        </div>
        <a
          className="button button-secondary"
          href="https://t.me/CS_Epic_Save"
          target="_blank"
          rel="noreferrer"
        >
          Open the lecture community ↗
        </a>
      </section>
    </AppPage>
  );
}

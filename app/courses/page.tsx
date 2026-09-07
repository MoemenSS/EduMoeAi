import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock3 } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { SiteHeader } from "@/components/site-header";
import { courses, upcomingCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore EduMoe's organized Computer Science learning paths.",
};

export default function CoursesPage() {
  return (
    <main>
      <div className="ambient ambient-one" aria-hidden="true" />
      <SiteHeader />
      <section className="courses-hero shell">
        <Link className="back-link" href="/"><ArrowLeft size={15} aria-hidden="true" /> Home</Link>
        <span className="section-kicker">Courses</span>
        <h1>Build the foundation.<br /><span>One clear module at a time.</span></h1>
        <p>Real first-year material, organized for the way FUE Computer Science students actually study.</p>
        <div className="courses-meta">
          <span><BookOpen size={16} aria-hidden="true" /> 8 curriculum paths</span>
          <span><Clock3 size={16} aria-hidden="true" /> New lectures arriving this week</span>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-heading"><div><span className="section-kicker">Available now</span><h2>Start learning.</h2></div></div>
        <div className="course-grid">
          {courses.map((course) => <CourseCard key={course.code} course={course} />)}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-heading"><div><span className="section-kicker">Being prepared</span><h2>Coming into focus.</h2></div></div>
        <div className="course-grid muted-grid">
          {upcomingCourses.map((course) => <CourseCard key={course.code} course={course} />)}
        </div>
      </section>
    </main>
  );
}

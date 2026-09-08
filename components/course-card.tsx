import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type Course = {
  code: string;
  title: string;
  description: string;
  accent: string;
  symbol: string;
  status: string;
  lessons?: number;
  topics?: string[];
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <article
      className="course-card"
      style={{ "--course-accent": course.accent } as React.CSSProperties}
    >
      <div className="course-card-top">
        <span className="course-symbol" aria-hidden="true">
          {course.symbol}
        </span>
        <span className="course-code">{course.code}</span>
      </div>
      <div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
      </div>
      <div className="course-card-bottom">
        <span>{course.status}</span>
        <Link
          href={`/courses#${course.code.toLowerCase()}`}
          aria-label={`Explore ${course.title}`}
        >
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

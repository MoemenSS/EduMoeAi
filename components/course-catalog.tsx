"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Search } from "lucide-react";
import type { Course } from "@/components/course-card";

export function CourseCatalog({ courses }: { courses: Course[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const filters = ["All", "Computer Science", "Mathematics", "Physics"];
  const visible = useMemo(() => courses.filter((course) => {
    const textMatch = `${course.code} ${course.title} ${course.description}`.toLowerCase().includes(query.toLowerCase());
    const subjectMatch = active === "All" ||
      (active === "Computer Science" && course.code.startsWith("CS")) ||
      (active === "Mathematics" && ["MTH", "STA"].some((prefix) => course.code.startsWith(prefix))) ||
      (active === "Physics" && course.code.startsWith("PHY"));
    return textMatch && subjectMatch;
  }), [active, courses, query]);

  return (
    <section className="catalog-section">
      <div className="filter-bar glass-panel">
        <label className="search-field"><Search size={16} aria-hidden="true" /><span className="sr-only">Search courses</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the curriculum" /></label>
        <div className="filter-chips" aria-label="Filter courses">
          {filters.map((filter) => <button className={active === filter ? "active" : ""} key={filter} onClick={() => setActive(filter)}>{filter}</button>)}
        </div>
      </div>
      <div className="catalog-grid">
        {visible.map((course, index) => (
          <article id={course.code.toLowerCase()} className="catalog-card" key={course.code} style={{ "--course-accent": course.accent } as React.CSSProperties}>
            <div className="catalog-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="catalog-card-copy"><span>{course.code}</span><h2>{course.title}</h2><p>{course.description}</p></div>
            <div className="catalog-card-footer"><span><Check size={14} aria-hidden="true" /> {course.status}</span><Link href={course.code === "CS102" ? "/lecture" : "/dashboard"} aria-label={`Open ${course.title}`}><ArrowUpRight size={18} /></Link></div>
          </article>
        ))}
      </div>
      {visible.length === 0 ? <div className="empty-state"><Search size={22} /><h2>No course found</h2><p>Try another title, code, or subject.</p></div> : null}
    </section>
  );
}


"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Check, ChevronRight, CirclePlay, Code2, MessageSquareText } from "lucide-react";
import { lectureUnits } from "@/lib/courses";

export function LectureWorkspace() {
  const [tab, setTab] = useState<"notes" | "practice" | "discuss">("notes");
  const [done, setDone] = useState(false);
  return (
    <div className="lecture-layout">
      <aside className="lesson-sidebar workspace-panel">
        <div className="lesson-course"><span>CS102</span><strong>Structured Programming</strong><small>9 of 18 lessons complete</small></div>
        <div className="mini-progress"><span style={{ width: "50%" }} /></div>
        {lectureUnits.map((unit, unitIndex) => <details key={unit.title} open={unitIndex === 2}><summary>{unit.title}<ChevronRight size={14} /></summary>{unit.lessons.map((lesson, lessonIndex) => <Link className={unitIndex === 2 && lessonIndex === 1 ? "active" : ""} href="/lecture" key={lesson}><span>{unitIndex < 2 || lessonIndex === 0 ? <Check size={12} /> : String(lessonIndex + 1)}</span>{lesson}</Link>)}</details>)}
      </aside>
      <article className="lesson-main">
        <header className="lesson-header"><div><span className="section-kicker">Unit 3 · Lesson 2</span><h1>Pointers, without the mystery.</h1><p>Learn why addresses matter and how references move data through a C++ program.</p></div><button className={done ? "lesson-complete done" : "lesson-complete"} onClick={() => setDone((value) => !value)}>{done ? <Check size={16} /> : null}{done ? "Completed" : "Mark complete"}</button></header>
        <div className="lesson-video glass-panel"><CirclePlay size={52} /><div><span>Guided concept</span><strong>What actually lives inside a pointer?</strong><small>08:42 · curriculum walkthrough</small></div></div>
        <div className="lesson-tabs" role="tablist"><button className={tab === "notes" ? "active" : ""} onClick={() => setTab("notes")}><BookOpen size={15} /> Notes</button><button className={tab === "practice" ? "active" : ""} onClick={() => setTab("practice")}><Code2 size={15} /> Practice</button><button className={tab === "discuss" ? "active" : ""} onClick={() => setTab("discuss")}><MessageSquareText size={15} /> Ask MoeAI</button></div>
        {tab === "notes" ? <section className="lesson-content workspace-panel"><h2>The useful mental model</h2><p>A pointer stores the address of another value. That extra level of indirection lets your program share, update, and traverse data without copying everything.</p><div className="code-sample"><span>int score = 95;</span><span>int* pointer = &amp;score;</span><span>*pointer = 100;</span></div><h3>Read the symbols as actions</h3><ul><li><code>&amp;score</code> asks for the address of <code>score</code>.</li><li><code>*pointer</code> follows that address to the stored value.</li><li>The pointer type tells C++ how to interpret the memory it finds.</li></ul></section> : null}
        {tab === "practice" ? <PracticeCheck /> : null}
        {tab === "discuss" ? <section className="lesson-content workspace-panel"><h2>Ask in the context of this lesson</h2><p>MoeAI already knows you are studying pointers in Unit 3. Open the full workspace to trace code, compare references, or generate focused practice.</p><Link className="button button-primary" href="/moeai">Open MoeAI <ChevronRight size={16} /></Link></section> : null}
      </article>
    </div>
  );
}

function PracticeCheck() {
  const [answer, setAnswer] = useState<string | null>(null);
  return <section className="lesson-content workspace-panel"><span className="section-kicker">Quick check</span><h2>What does the dereference operator return?</h2><div className="answer-grid">{["The variable's name", "The value at an address", "A new address", "The size in bytes"].map((option, index) => <button className={answer === option ? (index === 1 ? "correct" : "incorrect") : ""} key={option} onClick={() => setAnswer(option)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>{answer ? <p className="answer-feedback">{answer === "The value at an address" ? "Exactly. Dereferencing follows the stored address and reads the value there." : "Not quite—think of * as following an address to the value stored there."}</p> : null}</section>;
}


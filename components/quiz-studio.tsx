"use client";

import { useMemo, useState } from "react";
import { Bookmark, Check, ChevronRight, RotateCcw, Sparkles, Timer } from "lucide-react";
import { questionBank, quizSubjects } from "@/lib/question-bank";

const ALL = "Mixed review";

export function QuizStudio() {
  const [subject, setSubject] = useState(ALL);
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => {
    const pool = subject === ALL ? questionBank : questionBank.filter((item) => item.subject === subject);
    return [...pool].sort((a, b) => hash(`${a.id}-${seed}`) - hash(`${b.id}-${seed}`)).slice(0, Math.min(10, pool.length));
  }, [seed, subject]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);
  const current = questions[index];

  function reset(nextSubject = subject) {
    setSubject(nextSubject); setSeed((value) => value + 1); setIndex(0); setChoice(null); setScore(0); setChecked(false); setDone(false);
  }
  function continueSession() {
    if (!checked) { if (choice === current.correct) setScore((value) => value + 1); setChecked(true); return; }
    if (index === questions.length - 1) setDone(true);
    else { setIndex((value) => value + 1); setChoice(null); setChecked(false); }
  }

  if (done) return <section className="quiz-result glass-panel"><span className="ai-orb"><Sparkles size={18} /></span><span className="section-kicker">Session complete</span><h2>{score} / {questions.length}</h2><p>Your answers were scored locally. MoeAI was not called, so this study signal costs nothing to calculate.</p><button className="button button-primary" onClick={() => reset()}><RotateCcw size={15} /> Build another set</button></section>;

  const saved = bookmarks.includes(current.id);
  return <div className="quiz-layout">
    <aside className="quiz-setup workspace-panel">
      <span className="section-kicker">Question library</span><h2>64 authored questions</h2>
      <p className="quiz-library-note">Eight subjects are in the typed bank now. Each session is re-ordered so practice is not a memorized six-question loop.</p>
      <label className="quiz-subject-label">Subject<select value={subject} onChange={(event) => reset(event.target.value)}><option>{ALL}</option>{quizSubjects.map((name) => <option key={name}>{name}</option>)}</select></label>
      <div className="quiz-meta-row"><span><Timer size={15} /> 10–15 min</span><span>{questions.length} / {subject === ALL ? 64 : 8}</span></div>
      <div className="quiz-progress-list">{questions.map((question, questionIndex) => <div className={questionIndex === index ? "active" : questionIndex < index ? "complete" : ""} key={question.id}><span>{questionIndex < index ? <Check size={12} /> : questionIndex + 1}</span><div><strong>{question.subject}</strong><small>{question.topic}</small></div></div>)}</div>
    </aside>
    <section className="quiz-runner glass-panel">
      <header><span>{current.subject} · {current.topic}</span><button className={saved ? "active" : ""} onClick={() => setBookmarks((items) => saved ? items.filter((id) => id !== current.id) : [...items, current.id])}><Bookmark size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save"}</button></header>
      <div className="question-count">Question {index + 1} of {questions.length}</div><h1>{current.prompt}</h1>
      <div className="answer-grid">{current.options.map((option, optionIndex) => <button disabled={checked} className={checked ? optionIndex === current.correct ? "correct" : choice === optionIndex ? "incorrect" : "" : choice === optionIndex ? "selected" : ""} key={option} onClick={() => setChoice(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>
      {checked ? <div className="quiz-explanation"><strong>{choice === current.correct ? "Correct." : "Not quite."}</strong> {current.explanation}</div> : null}
      <footer><small>{checked ? `${bookmarks.length} saved for review` : "Select one answer to continue"}</small><button disabled={choice === null} onClick={continueSession}>{checked ? index === questions.length - 1 ? "See results" : "Next question" : "Check answer"} <ChevronRight size={16} /></button></footer>
    </section>
  </div>;
}

function hash(value: string) { return Array.from(value).reduce((total, char) => (total * 31 + char.charCodeAt(0)) % 100000, 7); }

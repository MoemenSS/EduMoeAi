"use client";

import { useState } from "react";
import { Bookmark, Check, ChevronRight, RotateCcw, Sparkles, Timer } from "lucide-react";

const questions = [
  { topic: "C++ · Pointers", question: "What does the expression &value produce?", options: ["The current value", "The memory address", "A reference copy", "The type size"], correct: 1 },
  { topic: "Logic Design · K-maps", question: "Which grouping is valid in a Karnaugh map?", options: ["Any diagonal pair", "Groups of powers of two", "Only rows of four", "Prime-sized groups"], correct: 1 },
  { topic: "Probability · Poisson", question: "Which value must equal both the mean and variance?", options: ["x", "n", "λ", "p"], correct: 2 },
];

export function QuizStudio() {
  const [index, setIndex] = useState(0); const [choice, setChoice] = useState<number | null>(null); const [score, setScore] = useState(0); const [bookmarked, setBookmarked] = useState(false); const [done, setDone] = useState(false);
  const current = questions[index];
  function next() { if (choice === current.correct) setScore((value) => value + 1); if (index === questions.length - 1) setDone(true); else { setIndex((value) => value + 1); setChoice(null); setBookmarked(false); } }
  function restart() { setIndex(0); setChoice(null); setScore(0); setDone(false); setBookmarked(false); }
  if (done) return <section className="quiz-result glass-panel"><span className="ai-orb"><Sparkles size={18} /></span><span className="section-kicker">Session complete</span><h2>{score + (choice === current.correct ? 1 : 0)} / {questions.length}</h2><p>Your next practice set will put more weight on the concepts you missed.</p><button className="button button-primary" onClick={restart}><RotateCcw size={15} /> Try again</button></section>;
  return <div className="quiz-layout"><aside className="quiz-setup workspace-panel"><span className="section-kicker">Session</span><h2>Focused mixed review</h2><div className="quiz-meta-row"><span><Timer size={15} /> 8 min</span><span>{questions.length} questions</span></div><div className="quiz-progress-list">{questions.map((question, questionIndex) => <div className={questionIndex === index ? "active" : questionIndex < index ? "complete" : ""} key={question.topic}><span>{questionIndex < index ? <Check size={12} /> : questionIndex + 1}</span><div><strong>{question.topic.split(" · ")[0]}</strong><small>{question.topic.split(" · ")[1]}</small></div></div>)}</div></aside><section className="quiz-runner glass-panel"><header><span>{current.topic}</span><button className={bookmarked ? "active" : ""} onClick={() => setBookmarked((value) => !value)}><Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} /> {bookmarked ? "Saved" : "Save"}</button></header><div className="question-count">Question {index + 1} of {questions.length}</div><h1>{current.question}</h1><div className="answer-grid">{current.options.map((option, optionIndex) => <button className={choice === optionIndex ? "selected" : ""} key={option} onClick={() => setChoice(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div><footer><small>Select one answer to continue</small><button disabled={choice === null} onClick={next}>Check & continue <ChevronRight size={16} /></button></footer></section></div>;
}


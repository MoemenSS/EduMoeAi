"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, BookOpenCheck, BrainCircuit, Code2, Plus, Sparkles } from "lucide-react";

type Message = { role: "student" | "moe"; text: string };
const replies = [
  "Let’s anchor it to your CS102 notes: a pointer is a typed address. The type tells C++ how many bytes to read and how to interpret them.",
  "Start with the invariant, then test one concrete case. I can turn this into a three-question practice set when you’re ready.",
  "Your last quiz suggests the definition is clear but application is shaky. Let’s trace one small example line by line.",
];

export function MoeAiChat() {
  const [mode, setMode] = useState("Tutor");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ role: "moe", text: "I’m connected to your Structured Programming path. What are you trying to understand?" }]);
  function send(event: FormEvent) { event.preventDefault(); const text = input.trim(); if (!text) return; setMessages((items) => [...items, { role: "student", text }, { role: "moe", text: replies[items.length % replies.length] }]); setInput(""); }
  return (
    <div className="moe-workspace glass-panel">
      <aside className="moe-sidebar"><div className="moe-side-title"><span className="ai-orb"><Sparkles size={16} /></span><div><strong>MoeAI</strong><small>Curriculum connected</small></div></div><button className="new-chat" onClick={() => setMessages([{ role: "moe", text: "Fresh page. Which course should we work on?" }])}><Plus size={15} /> New conversation</button><span className="side-label">Modes</span>{["Tutor", "Debug", "Practice"].map((item) => <button className={mode === item ? "mode active" : "mode"} key={item} onClick={() => setMode(item)}>{item === "Tutor" ? <BrainCircuit size={15} /> : item === "Debug" ? <Code2 size={15} /> : <BookOpenCheck size={15} />}{item}</button>)}<div className="context-card"><span>Active context</span><strong>CS102 · Pointers</strong><small>Lesson 3.2 · 68% course progress</small></div></aside>
      <section className="moe-thread"><header><div><span className="section-kicker">{mode} mode</span><h1>Understand it. Then use it.</h1></div><span className="online-pill">MoeAI ready</span></header><div className="message-list">{messages.map((message, index) => <div className={`full-message ${message.role}`} key={`${message.role}-${index}`}>{message.role === "moe" ? <span className="tiny-orb"><Sparkles size={12} /></span> : null}<p>{message.text}</p></div>)}</div><div className="prompt-chips">{["Trace a pointer example", "Quiz me on references", "Explain stack vs heap"].map((prompt) => <button key={prompt} onClick={() => setInput(prompt)}>{prompt}</button>)}</div><form className="moe-composer" onSubmit={send}><label><span className="sr-only">Ask MoeAI</span><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about a lecture, paste code, or describe where you’re stuck…" /></label><button aria-label="Send message"><ArrowUp size={17} /></button></form></section>
    </div>
  );
}


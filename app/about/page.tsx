import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CircuitBoard,
  HeartHandshake,
} from "lucide-react";
import { AppPage } from "@/components/app-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why EduMoe exists and what the project is building for Computer Science students.",
};

export default function AboutPage() {
  return (
    <AppPage
      eyebrow="About EduMoe"
      title="Made by a student who wanted a better way to learn."
      description="EduMoe is an independent learning system for Computer Science students at FUE. Built from real study sessions, shared explanations, and the belief that good learning tools should be easier to find."
    >
      <section className="about-grid">
        <article className="about-manifesto glass-panel">
          <span className="section-kicker">The starting point</span>
          <h2>Understanding should feel connected.</h2>
          <p>
            Lectures, practice, tools, deadlines, and AI help usually live in
            separate places. EduMoe brings them into one context so a student
            can move from confusion to explanation, experimentation, and recall
            without rebuilding their study setup every time.
          </p>
          <p>
            The product is still being built in public. It began with
            explanations shared through the CS Epic Save Telegram community.
            Today it brings the course reading, practice, and experiments into
            one connected study space.
          </p>
          <Link className="button button-primary" href="/courses">
            Explore the curriculum <ArrowRight size={16} />
          </Link>
        </article>
        <div className="about-principles">
          {[
            {
              icon: BookOpenCheck,
              title: "Course-first",
              copy: "Every tool begins with the real subject and lecture context.",
            },
            {
              icon: BrainCircuit,
              title: "AI when it matters",
              copy: "MoeAI explains hard ideas; ordinary analytics stay deterministic and inexpensive.",
            },
            {
              icon: CircuitBoard,
              title: "Learn by doing",
              copy: "Code, circuits, math, and probability become interactive workspaces.",
            },
            {
              icon: HeartHandshake,
              title: "Student-owned",
              copy: "Clear language, honest progress, and no fake certainty or inflated claims.",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <article className="workspace-panel" key={title}>
              <Icon size={20} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </AppPage>
  );
}

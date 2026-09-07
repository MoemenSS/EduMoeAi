import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  BrainCircuit,
  CalendarClock,
  ChevronRight,
  CircuitBoard,
  Gauge,
  ShieldCheck,
  Sparkles,
  Swords,
  Code2,
  FunctionSquare,
  MessageCircleMore,
  Play,
  Trophy,
} from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { SiteHeader } from "@/components/site-header";
import { courses } from "@/lib/courses";

const capabilities = [
  {
    icon: BookOpenCheck,
    eyebrow: "Curriculum-aware",
    title: "Answers grounded in what you actually study",
    copy: "MoeAI connects explanations to your course material instead of giving generic answers in isolation.",
  },
  {
    icon: BrainCircuit,
    eyebrow: "Learns with you",
    title: "Practice that responds to your progress",
    copy: "Review weak concepts, build confidence, and turn mistakes into the next useful learning step.",
  },
  {
    icon: CalendarClock,
    eyebrow: "One learning home",
    title: "Courses, deadlines, and progress together",
    copy: "Keep the context that matters close, so you spend less energy organizing and more energy learning.",
  },
];

const workspaces = [
  { href: "/dashboard", icon: Gauge, label: "Dashboard", copy: "Your next useful step" },
  { href: "/moeai", icon: BrainCircuit, label: "MoeAI", copy: "Curriculum-aware help" },
  { href: "/quizzes", icon: BookOpenCheck, label: "Practice", copy: "Focused concept checks" },
  { href: "/simulators", icon: CircuitBoard, label: "Labs", copy: "See the idea move" },
  { href: "/ranked", icon: Swords, label: "Ranked", copy: "Recall under pressure" },
];

const liveTools = [
  { href: "/simulators", icon: Code2, label: "Live C++ compiler", copy: "Write, run, and trace first-year programs without leaving the lesson.", accent: "#61dafb" },
  { href: "/simulators", icon: CircuitBoard, label: "Circuit lab", copy: "Build gates, inspect truth tables, then continue in browser Logisim.", accent: "#b197fc" },
  { href: "/simulators", icon: FunctionSquare, label: "Math studio", copy: "Explore calculus, probability, discrete math, and physics visually.", accent: "#ffb86b" },
  { href: "/moeai", icon: MessageCircleMore, label: "MoeAI workspace", copy: "Ask inside the exact course, lecture, and problem you are working on.", accent: "#ff5d87" },
];

export default function Home() {
  return (
    <main>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <SiteHeader />

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow-pill"><Sparkles size={14} aria-hidden="true" /> Built with FUE Computer Science students</div>
          <h1>
            Computer science,<br />
            <span>finally made clear.</span>
          </h1>
          <p className="hero-description">
            Lectures, C++ tools, circuit labs, deep practice, and MoeAI—organized around the
            courses you are actually taking, in the visual language EduMoe started with.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/dashboard">
              Start learning <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button button-secondary" href="/moeai">
              Meet MoeAI <ChevronRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-proof" aria-label="EduMoe community proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>M</span><span>A</span><span>Y</span><span>+</span>
            </div>
            <p><strong>8 connected subjects</strong><span>one first-year CS learning system</span></p>
          </div>
        </div>
        <div className="hero-media glass-panel">
          <Image src="/media/edumoe-learning-film.png" alt="Programming, digital logic, mathematics, probability, and physics connected by one learning path" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
          <div className="hero-media-caption"><span className="play-disc"><Play size={17} fill="currentColor" /></span><span><strong>Inside EduMoe</strong><small>Courses become one connected learning system</small></span></div>
          <div className="hero-media-chip">01:24 · product film</div>
        </div>
      </section>

      <section className="tool-bento shell" aria-labelledby="tools-heading">
        <div className="tool-bento-heading"><span className="section-kicker">Not a static course site</span><h2 id="tools-heading">Build it. Understand it. Break it. Fix it.</h2><p>The working tools from the original prototype stay central—now organized as maintainable product features.</p></div>
        <div className="tool-bento-grid">
          {liveTools.map(({ href, icon: Icon, label, copy, accent }, index) => <Link className={`tool-tile tool-tile-${index + 1}`} href={href} key={label} style={{ "--tile-accent": accent } as React.CSSProperties}><span className="tool-icon"><Icon size={22} /></span><span className="tool-index">0{index + 1}</span><span className="tool-copy"><strong>{label}</strong><small>{copy}</small></span><ArrowUpRight size={18} /></Link>)}
        </div>
      </section>

      <section className="workspace-rail shell" aria-label="EduMoe learning workspaces">
        {workspaces.map(({ href, icon: Icon, label, copy }) => <Link href={href} key={href}><Icon size={18} /><span><strong>{label}</strong><small>{copy}</small></span><ArrowRight size={15} /></Link>)}
      </section>

      <section className="signal-bar" aria-label="Platform benefits">
        <div className="shell signal-grid">
          <span><ShieldCheck size={17} aria-hidden="true" /> Curriculum-grounded</span>
          <span><BrainCircuit size={17} aria-hidden="true" /> Personal learning context</span>
          <span><BookOpenCheck size={17} aria-hidden="true" /> Built around real courses</span>
        </div>
      </section>

      <section className="section shell" id="courses">
        <div className="section-heading">
          <div><span className="section-kicker">Your learning space</span><h2>Start with the courses that matter now.</h2></div>
          <Link href="/courses">View all courses <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="course-grid">
          {courses.map((course) => <CourseCard key={course.code} course={course} />)}
        </div>
      </section>

      <section className="ranked-callout shell">
        <div><span className="section-kicker">Competitive arena</span><h2>Practice gets sharper when every round counts.</h2><p>Topic-based matchmaking, Elo progression, tournaments, and a campus ladder—designed around mastery, not button mashing.</p><Link className="button button-secondary" href="/ranked">Enter Ranked <Swords size={16} /></Link></div>
        <div className="ranked-score glass-panel"><Trophy size={26} /><span>Silver II</span><strong>1,206</strong><small>94 Elo to Gold I</small><i><b style={{ width: "64%" }} /></i></div>
      </section>

      <section className="section shell" id="moeai">
        <div className="moeai-story glass-panel">
          <div className="story-copy">
            <span className="section-kicker">MoeAI · your intelligence layer</span>
            <h2>Not another chatbot.<br />A tutor that knows the learning journey.</h2>
            <p>
              Ask about a lecture, untangle a difficult idea, practice a weak topic, then see that
              learning reflected in your progress. That connected loop is the point.
            </p>
            <div className="story-quote">
              <Sparkles size={18} aria-hidden="true" />
              <span>“We built an educational environment where the AI knows the curriculum, knows the student, and helps at the right moment.”</span>
            </div>
          </div>
          <div className="learning-loop" aria-label="MoeAI learning loop">
            <div><span>01</span><strong>Ask</strong><small>Bring the confusing part</small></div>
            <div><span>02</span><strong>Understand</strong><small>Learn in your context</small></div>
            <div><span>03</span><strong>Practice</strong><small>Test the real concept</small></div>
            <div><span>04</span><strong>Improve</strong><small>Update your next step</small></div>
          </div>
        </div>
      </section>

      <section className="section shell" id="how-it-works">
        <div className="center-heading"><span className="section-kicker">Designed around the student</span><h2>Less switching. More understanding.</h2></div>
        <div className="capability-grid">
          {capabilities.map(({ icon: Icon, eyebrow, title, copy }) => (
            <article key={title} className="capability-card">
              <Icon size={21} aria-hidden="true" />
              <span>{eyebrow}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta shell">
        <div className="final-cta-inner">
          <span className="section-kicker">The next study session starts here</span>
          <h2>Your courses finally have a home.</h2>
          <p>Explore the first-year Computer Science curriculum and keep every useful learning step connected.</p>
          <Link className="button button-light" href="/dashboard">Open EduMoe <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <footer className="site-footer shell">
          <span>EDUMOE</span>
        <p>Built for students who want to understand, not just memorize.</p>
        <span>FUE · Computer Science</span>
      </footer>
    </main>
  );
}

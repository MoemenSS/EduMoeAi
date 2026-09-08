import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CircuitBoard,
  Code2,
  BrainCircuit,
  Swords,
  Sparkles,
  Heart,
  Gauge,
  GraduationCap,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { HomePlayground } from "@/components/home-playground";
import { courses } from "@/lib/courses";

const features = [
  {
    number: "01",
    title: "Your semester, sorted.",
    description:
      "Find your subject, understand the concept, and keep the next lesson close.",
    href: "/courses",
    label: "Explore courses",
    icon: BookOpen,
    color: "#f43f6d",
    className: "feature-courses",
  },
  {
    number: "02",
    title: "Make the theory move.",
    description:
      "Run real C++. Build real circuits. Change one variable and see what happens.",
    href: "/simulators",
    label: "Step inside the labs",
    icon: CircuitBoard,
    color: "#a78bfa",
    className: "feature-labs",
  },
  {
    number: "03",
    title: "Understand. Don’t memorize.",
    description:
      "Concept checks, code traces, and fresh numerical variations. Every answer has a reason.",
    href: "/quizzes",
    label: "Start a practice set",
    icon: GraduationCap,
    color: "#38bdf8",
    className: "feature-practice",
  },
  {
    number: "04",
    title: "A little healthy competition.",
    description:
      "Challenge yourself with timed questions and compare verified results with other students.",
    href: "/ranked",
    label: "Enter the arena",
    icon: Swords,
    color: "#fb923c",
    className: "feature-ranked",
  },
];
export default function Home() {
  return (
    <main className="home-v4">
      <SiteHeader />
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow-pill">
            <span className="live-dot" /> FOR FUE COMPUTER SCIENCE. BY ONE OF
            YOU.
          </div>
          <h1>
            Learn the hard stuff.
            <br />
            <span>The cool way.</span>
          </h1>
          <p className="hero-description">
            The lecture that clicks. The code that finally runs. The “ohhh, now
            I get it.” Your whole CS semester, in one place.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/courses">
              Find your course <ArrowRight size={17} />
            </Link>
            <Link className="button button-secondary" href="/simulators">
              <PlayIcon /> Try a live lab
            </Link>
          </div>
          <div className="hero-proof">
            <span className="community-icon">
              <Heart size={20} />
            </span>
            <p>
              <strong>Made by students. Open to everyone.</strong>
              <span>Free learning tools. Zero gatekeeping.</span>
            </p>
          </div>
        </div>
        <HomePlayground />
      </section>
      <section className="subject-marquee" aria-label="Your curriculum">
        <div className="shell">
          {[
            "C++",
            "LOGIC DESIGN",
            "CALCULUS",
            "DISCRETE MATH",
            "PHYSICS",
            "PROBABILITY",
          ].map((s) => (
            <span key={s}>
              <i />
              {s}
            </span>
          ))}
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              A WHOLE STUDY SESSION. ONE TAB.
            </span>
            <h2>
              Everything you need.
              <br />
              <span className="muted-heading">Nothing in your way.</span>
            </h2>
          </div>
          <p className="heading-aside">
            Go from watching to trying to understanding.
            <br />
            That’s where the learning happens.
          </p>
        </div>
        <div className="experience-grid">
          {features.map(
            ({
              number,
              title,
              description,
              href,
              label,
              icon: Icon,
              color,
              className,
            }) => (
              <Link
                className={`experience-card glass-panel ${className}`}
                href={href}
                key={href}
                style={{ "--tile-accent": color } as React.CSSProperties}
              >
                <div className="experience-card-top">
                  <span className="feature-icon">
                    <Icon size={24} />
                  </span>
                  <span>{number} / EDUMOE</span>
                  <ArrowUpRight size={20} />
                </div>
                <div className="feature-preview" aria-hidden="true">
                  {number === "01" ? (
                    <>
                      <span>
                        CS102 <b>Structured Programming</b>
                      </span>
                      <span>
                        CS103 <b>Logic Design</b>
                      </span>
                      <span>
                        MTH101 <b>Calculus & Mathematics</b>
                      </span>
                    </>
                  ) : number === "02" ? (
                    <div className="lab-formula">
                      <Code2 size={45} />
                      <span>input → explore → understand</span>
                      <CircuitBoard size={45} />
                    </div>
                  ) : number === "03" ? (
                    <>
                      <span>What changes when the input changes?</span>
                      <span className="preview-answer">
                        ✓ Explain the reasoning.
                      </span>
                      <span>↻ Try a new variation.</span>
                    </>
                  ) : (
                    <div className="arena-preview">
                      <Swords size={45} />
                      <b>YOUR NEXT CHALLENGE</b>
                      <span>Think clearly. Answer confidently.</span>
                    </div>
                  )}
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <strong className="feature-link">
                  {label} <ArrowRight size={15} />
                </strong>
              </Link>
            ),
          )}
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              PICK UP WHERE CURIOSITY STARTS
            </span>
            <h2>
              Your first year,
              <br />
              all connected.
            </h2>
          </div>
          <Link href="/courses">
            Browse the curriculum <ArrowRight size={16} />
          </Link>
        </div>
        <div className="home-subjects">
          {courses.map((course) => (
            <Link
              key={course.code}
              href={`/lecture?course=${course.code}`}
              style={
                { "--course-accent": course.accent } as React.CSSProperties
              }
            >
              <span>{course.symbol}</span>
              <div>
                <small>{course.code}</small>
                <h3>{course.title}</h3>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <section className="shell moe-feature glass-panel">
        <div>
          <span className="section-kicker">
            <Sparkles size={14} /> THE MOEAI WORKSPACE
          </span>
          <h2>Stuck is a starting point.</h2>
          <p>
            Keep your course notes, practice history, and next steps together.
            See what needs attention before asking for help.
          </p>
          <Link href="/moeai" className="button button-primary">
            Meet MoeAI <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="moe-context-preview">
          <BrainCircuit size={36} />
          <span>YOUR LEARNING CONTEXT</span>
          <strong>
            One concept.
            <br />A clearer next step.
          </strong>
          <Link href="/dashboard">
            <Gauge size={17} /> Open your learning dashboard{" "}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section shell home-manifesto">
        <span className="section-kicker">BUILT BETWEEN LECTURES</span>
        <h2>
          University is hard enough.
          <br />
          <span>Finding good help shouldn’t be.</span>
        </h2>
        <p>
          EduMoe started with students helping students understand Computer
          Science. That’s still the whole idea.
        </p>
        <Link href="/about">
          The story behind EduMoe <ArrowUpRight size={16} />
        </Link>
      </section>
      <section className="shell product-tour">
        <details className="glass-panel">
          <summary>
            Take a quick look around{" "}
            <span>Watch the EduMoe product tour →</span>
          </summary>
          <video
            controls
            playsInline
            preload="none"
            aria-label="EduMoe product walkthrough"
          >
            <source src="/media/edumoe-product-tour.webm" type="video/webm" />
            <track
              kind="captions"
              src="/media/edumoe-product-tour.vtt"
              srcLang="en"
              label="English"
              default
            />
            Your browser does not support this video.
          </video>
          <p>
            A silent walkthrough of the working homepage.{" "}
            <a href="/media/edumoe-product-tour.webm" download>
              Download the video
            </a>
          </p>
        </details>
      </section>
      <footer className="site-footer shell">
        <Link href="/">
          EDUMOE<span className="brand-dot">.</span>
        </Link>
        <p>Made for the moment it finally clicks.</p>
        <div>
          <a href="https://t.me/CS_Epic_Save" target="_blank" rel="noreferrer">
            Community <ArrowUpRight size={13} />
          </a>
          <Link href="/about">About</Link>
          <Link href="/login">Sign in</Link>
        </div>
      </footer>
    </main>
  );
}
function PlayIcon() {
  return <Code2 size={17} />;
}

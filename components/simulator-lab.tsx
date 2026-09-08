"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  ArrowUpRight,
  CircuitBoard,
  Code2,
  FunctionSquare,
  Sigma,
  Waves,
  Calculator,
  Play,
} from "lucide-react";
const MathLab = dynamic(() => import("@/components/math-lab"), {
  loading: () => <p className="empty-note">Loading the mathematics engine…</p>,
});
const tabs = [
  { name: "Circuit", icon: CircuitBoard },
  { name: "C++", icon: Code2 },
  { name: "Calculus", icon: FunctionSquare },
  { name: "Probability", icon: Calculator },
  { name: "Discrete", icon: Sigma },
  { name: "Physics", icon: Waves },
];
export function SimulatorLab() {
  const [lab, setLab] = useState("Circuit");
  return (
    <div className="simulator-shell">
      <div
        className="lab-switcher workspace-panel"
        role="group"
        aria-label="Learning labs"
      >
        {tabs.map(({ name, icon: Icon }) => (
          <button
            aria-pressed={lab === name}
            className={lab === name ? "active" : ""}
            key={name}
            onClick={() => setLab(name)}
          >
            <Icon size={16} />
            {name}
          </button>
        ))}
      </div>
      {lab === "Circuit" ? (
        <ExternalLab
          key="circuit"
          title="The real circuit lab."
          eyebrow="LOGISIM · OPEN SOURCE"
          description="Gates, wires, clocks, multiplexers, registers, RAM, and your own subcircuits. Open the full Logisim engine when you’re ready to build."
          url="https://logisim.app/"
          label="Logisim"
        />
      ) : lab === "C++" ? (
        <ExternalLab
          key="cpp"
          title="Write it. Run it. Understand it."
          eyebrow="C++ · ONECOMPILER"
          description="The working compiler from your original EduMoe. Edit the program, provide input, and run real C++ in a remote sandbox."
          url="https://onecompiler.com/embed/cpp?theme=dark&hideTitle=true&hideNew=true&hideStdin=false"
          label="C++ compiler"
        />
      ) : (
        <MathLab lab={lab} />
      )}
    </div>
  );
}
function ExternalLab({
  title,
  eyebrow,
  description,
  url,
  label,
}: {
  title: string;
  eyebrow: string;
  description: string;
  url: string;
  label: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className="lab-panel glass-panel">
      <div className="lab-toolbar">
        <div>
          <span className="section-kicker">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <a className="run-button" href={url} target="_blank" rel="noreferrer">
          Open full screen <ArrowUpRight size={15} />
        </a>
      </div>
      {loaded ? (
        <>
          <iframe
            className="external-lab"
            src={url}
            title={label}
            allow="fullscreen; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <p className="lab-note">
            If your browser blocks the embedded tool, use Open full screen. Save
            your work using the tool’s export controls.
          </p>
        </>
      ) : (
        <div className="lab-launch">
          <CircuitBoard size={45} />
          <h3>Your workbench is ready.</h3>
          <p>{description}</p>
          <button
            className="button button-primary"
            onClick={() => setLoaded(true)}
          >
            <Play size={15} /> Load {label}
          </button>
          <small>Loads only when you ask, to keep mobile browsing light.</small>
        </div>
      )}
    </section>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Code2,
  CircuitBoard,
  FunctionSquare,
  Play,
  RotateCcw,
} from "lucide-react";
import { Button } from "@heroui/react";

const subjects = ["C++", "Logic", "Calculus"] as const;
export function HomePlayground() {
  const [subject, setSubject] = useState<(typeof subjects)[number]>("C++");
  const [ran, setRan] = useState(false);
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [x, setX] = useState(2);
  return (
    <div className="subject-stage">
      <div className="floating-note note-top">
        <CircuitBoard size={18} />
        <span>
          Less memorizing.
          <br />
          <strong>More lightbulb moments.</strong>
        </span>
      </div>
      <section
        className="subject-window glass-panel"
        aria-label="Try a learning tool"
      >
        <header>
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>your next lightbulb moment</span>
          <ArrowUpRight size={15} />
        </header>
        <div
          className="subject-tabs"
          role="group"
          aria-label="Explore a subject"
        >
          {subjects.map((name) => (
            <Button
              key={name}
              className={subject === name ? "selected" : ""}
              aria-pressed={subject === name}
              onPress={() => setSubject(name)}
            >
              {name === "C++" ? (
                <Code2 size={16} />
              ) : name === "Logic" ? (
                <CircuitBoard size={16} />
              ) : (
                <FunctionSquare size={16} />
              )}
              {name}
            </Button>
          ))}
        </div>
        {subject === "C++" ? (
          <div className="playground-content">
            <span className="file-label">first_lightbulb.cpp</span>
            <pre>
              <code>
                <span className="syntax-purple">int</span>
                {" score = 95;\n"}
                <span className="syntax-purple">int*</span>
                {" pointer = &score;\n\n"}
                <span className="syntax-comment">
                  {"// One address. One shared value.\n"}
                </span>
                {"*pointer += 5;\n"}
                <span className="syntax-blue">cout</span>
                {" << score;"}
              </code>
            </pre>
            <div className="playground-output" aria-live="polite">
              <span>OUTPUT</span>
              <strong>{ran ? "100" : "What will it print?"}</strong>
            </div>
            <Button
              className="button button-primary"
              onPress={() => setRan(!ran)}
            >
              {ran ? <RotateCcw size={14} /> : <Play size={14} />}
              {ran ? "Try again" : "Trace this example"}
            </Button>
          </div>
        ) : null}
        {subject === "Logic" ? (
          <div className="playground-content">
            <span className="file-label">
              XOR · DIFFERENT INPUTS, TRUE OUTPUT
            </span>
            <div className="mini-circuit">
              <Button onPress={() => setA(!a)} aria-label="Toggle input A">
                A <strong>{Number(a)}</strong>
              </Button>
              <span>⊕</span>
              <Button onPress={() => setB(!b)} aria-label="Toggle input B">
                B <strong>{Number(b)}</strong>
              </Button>
            </div>
            <div className="playground-output" aria-live="polite">
              <span>OUTPUT</span>
              <strong>
                {Number(a !== b)} · {a !== b ? "Light on" : "Light off"}
              </strong>
            </div>
            <p>
              Toggle either input. XOR is true exactly when the inputs differ.
            </p>
          </div>
        ) : null}
        {subject === "Calculus" ? (
          <div className="playground-content">
            <span className="file-label">A DERIVATIVE YOU CAN FEEL</span>
            <div className="mini-equation">f(x) = x²</div>
            <label className="range-label">
              Move along the curve: x = {x}
              <input
                aria-label="Point on parabola"
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
              />
            </label>
            <div className="playground-output" aria-live="polite">
              <span>SLOPE AT x = {x}</span>
              <strong>
                f′({x}) = {2 * x}
              </strong>
            </div>
            <p>
              A negative slope falls. A positive slope climbs. At zero, the
              curve turns.
            </p>
          </div>
        ) : null}
        <footer>
          <span>
            <Check size={13} /> Learn by doing
          </span>
          <Link href="/simulators">
            Open the full lab <ArrowUpRight size={14} />
          </Link>
        </footer>
      </section>
      <div className="floating-note note-bottom">
        <span className="note-symbol">∫</span>
        <span>
          From “I don’t get it”
          <br />
          <strong>to “wait, that makes sense.”</strong>
        </span>
      </div>
    </div>
  );
}

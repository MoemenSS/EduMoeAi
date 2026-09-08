"use client";
import { useMemo, useState } from "react";
import { parse, derivative } from "mathjs";
import type { MathNode } from "mathjs";

type Point = { x: number; y: number };
function Plot({
  points,
  label,
  xMax = 10,
  yMax = 10,
}: {
  points: Point[];
  label: string;
  xMax?: number;
  yMax?: number;
}) {
  return (
    <svg
      className="math-plot"
      viewBox="0 0 600 280"
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line
            x1="40"
            x2="570"
            y1={240 - i * 40}
            y2={240 - i * 40}
            stroke="#ffffff10"
          />
          <text
            x="30"
            y={244 - i * 40}
            fill="#a899b8"
            textAnchor="end"
            fontSize="10"
          >
            {((yMax * i) / 5).toFixed(1)}
          </text>
          <text
            x={40 + i * 106}
            y="264"
            fill="#a899b8"
            textAnchor="middle"
            fontSize="10"
          >
            {((xMax * i) / 5).toFixed(1)}
          </text>
        </g>
      ))}
      <polyline
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        points={points
          .filter((p) => Number.isFinite(p.y) && p.y >= 0 && p.y <= yMax)
          .map((p) => `${40 + (p.x / xMax) * 530},${240 - (p.y / yMax) * 200}`)
          .join(" ")}
      />
    </svg>
  );
}
function validate(node: MathNode) {
  let count = 0;
  node.traverse((n) => {
    if (++count > 48) throw Error("Please use a shorter expression.");
    if (
      ![
        "OperatorNode",
        "ConstantNode",
        "SymbolNode",
        "FunctionNode",
        "ParenthesisNode",
      ].includes(n.type)
    )
      throw Error("Use a scalar expression in x.");
    if (
      n.type === "SymbolNode" &&
      !["x", "sin", "cos", "tan", "exp", "log", "sqrt", "e", "pi"].includes(
        String(n),
      )
    )
      throw Error("Use x and elementary functions only.");
  });
}
export default function MathLab({ lab }: { lab: string }) {
  return lab === "Calculus" ? (
    <Calculus />
  ) : lab === "Probability" ? (
    <Probability />
  ) : lab === "Discrete" ? (
    <Discrete />
  ) : (
    <Physics />
  );
}
function Calculus() {
  const [input, setInput] = useState("x^2 + 3*x"),
    [expression, setExpression] = useState("x^2 + 3*x"),
    [x, setX] = useState(2);
  const data = useMemo(() => {
    try {
      if (expression.length > 120)
        throw Error("Please use fewer than 120 characters.");
      const tree = parse(expression);
      validate(tree);
      const d = derivative(tree, "x"),
        f = tree.compile(),
        df = d.compile();
      const points = Array.from({ length: 101 }, (_, i) => ({
        x: i / 10,
        y: Number(f.evaluate({ x: i / 10 })),
      }));
      const value = Number(f.evaluate({ x })),
        slope = Number(df.evaluate({ x }));
      if (!Number.isFinite(value) || !Number.isFinite(slope))
        throw Error("The function or derivative is undefined at this point.");
      return { derivative: d.toString(), points, value, slope, error: "" };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : "Cannot evaluate this expression.",
      };
    }
  }, [expression, x]);
  return (
    <section className="lab-panel glass-panel">
      <div className="lab-toolbar">
        <div>
          <span className="section-kicker">CALCULUS · SYMBOLIC + VISUAL</span>
          <h2>Find the slope. See the change.</h2>
        </div>
      </div>
      <form
        className="math-form"
        onSubmit={(e) => {
          e.preventDefault();
          setExpression(input);
        }}
      >
        <label>
          f(x)
          <input
            maxLength={120}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button className="button button-primary">Explore</button>
      </form>
      <p className="lab-note">
        Try x^3, sin(x), exp(x), or log(x). Powers use ^. Angles are in radians.
      </p>
      {data.error ? (
        <p role="alert" className="error-note">
          {data.error}
        </p>
      ) : (
        <>
          <Plot
            points={data.points!}
            yMax={Math.max(
              1,
              ...data.points!.map((p) =>
                Number.isFinite(p.y) ? Math.max(0, Math.min(1e6, p.y)) : 0,
              ),
            )}
            label={`Positive-quadrant plot of ${expression}, x from 0 to 10`}
          />
          <label className="range-label">
            Evaluate at x = {x}
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
            />
          </label>
          <div className="lab-readouts">
            <span>
              f′(x)<strong>{data.derivative}</strong>
            </span>
            <span>
              f({x})<strong>{data.value?.toFixed(3)}</strong>
            </span>
            <span>
              Slope at {x}
              <strong>{data.slope?.toFixed(3)}</strong>
            </span>
          </div>
        </>
      )}
    </section>
  );
}
function fact(n: number): number {
  return n < 2 ? 1 : n * fact(n - 1);
}
function Probability() {
  const [kind, setKind] = useState("Binomial"),
    [n, setN] = useState(10),
    [p, setP] = useState(0.5),
    [lambda, setLambda] = useState(3);
  const probabilities = Array.from(
    {
      length: kind === "Binomial" ? n + 1 : Math.max(20, Math.ceil(lambda * 4)),
    },
    (_, k) =>
      kind === "Binomial"
        ? (fact(n) / fact(k) / fact(n - k)) * p ** k * (1 - p) ** (n - k)
        : (Math.exp(-lambda) * lambda ** k) / fact(k),
  );
  const mean = kind === "Binomial" ? n * p : lambda,
    variance = kind === "Binomial" ? n * p * (1 - p) : lambda;
  return (
    <section className="lab-panel glass-panel">
      <div className="lab-toolbar">
        <div>
          <span className="section-kicker">PROBABILITY · DISTRIBUTIONS</span>
          <h2>Make uncertainty visible.</h2>
        </div>
        <label>
          Distribution
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            <option>Binomial</option>
            <option>Poisson</option>
          </select>
        </label>
      </div>
      <div className="physics-controls">
        {kind === "Binomial" ? (
          <>
            <label>
              Trials n = {n}
              <input
                type="range"
                min="1"
                max="30"
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
              />
            </label>
            <label>
              Success probability p = {p}
              <input
                type="range"
                min="0"
                max="1"
                step=".05"
                value={p}
                onChange={(e) => setP(Number(e.target.value))}
              />
            </label>
          </>
        ) : (
          <label>
            Average count λ = {lambda}
            <input
              type="range"
              min=".5"
              max="10"
              step=".5"
              value={lambda}
              onChange={(e) => setLambda(Number(e.target.value))}
            />
          </label>
        )}
      </div>
      <div
        className="probability-bars"
        role="img"
        aria-label={`${kind} probability mass function`}
      >
        {probabilities.map((value, k) => (
          <div key={k} title={`P(X=${k})=${(100 * value).toFixed(3)}%`}>
            <i
              style={{
                height: `${(value / Math.max(...probabilities)) * 190}px`,
              }}
            />
            <small>{k}</small>
          </div>
        ))}
      </div>
      <div className="lab-readouts">
        <span>
          Expected value<strong>{mean.toFixed(2)}</strong>
        </span>
        <span>
          Variance<strong>{variance.toFixed(2)}</strong>
        </span>
        <span>
          Displayed probability
          <strong>
            {(probabilities.reduce((a, b) => a + b, 0) * 100).toFixed(2)}%
          </strong>
        </span>
      </div>
      <details className="probability-table">
        <summary>Inspect exact probabilities</summary>
        {probabilities.map((v, k) => (
          <span key={k}>
            P(X={k}) = {v.toFixed(6)}
          </span>
        ))}
      </details>
      <p className="lab-note">
        {kind === "Binomial"
          ? "A fixed number of independent trials, each with the same success probability. P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ."
          : "Independent events at a constant rate. P(X=k)=e⁻λ λᵏ/k!. The chart includes the displayed range; remaining probability is in the tail."}
      </p>
    </section>
  );
}
function Discrete() {
  const [n, setN] = useState(5),
    [kind, setKind] = useState("Complete");
  const vertices = Array.from({ length: n }, (_, i) => ({
    x: 300 + 105 * Math.cos((2 * Math.PI * i) / n - Math.PI / 2),
    y: 145 + 105 * Math.sin((2 * Math.PI * i) / n - Math.PI / 2),
  }));
  const edges: number[][] = [];
  for (let a = 0; a < n; a++)
    for (let b = a + 1; b < n; b++)
      if (
        kind === "Complete" ||
        b === a + 1 ||
        (kind === "Cycle" && a === 0 && b === n - 1)
      )
        edges.push([a, b]);
  return (
    <section className="lab-panel glass-panel">
      <div className="lab-toolbar">
        <div>
          <span className="section-kicker">DISCRETE MATH · GRAPH EXPLORER</span>
          <h2>Every connection counts.</h2>
        </div>
        <label>
          Graph
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            <option>Complete</option>
            <option>Cycle</option>
            <option>Path</option>
          </select>
        </label>
      </div>
      <label className="range-label">
        Vertices = {n}
        <input
          type="range"
          min="3"
          max="12"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
        />
      </label>
      <svg
        className="math-plot"
        viewBox="0 0 600 290"
        role="img"
        aria-label={`${kind} graph with ${n} vertices and ${edges.length} edges`}
      >
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={vertices[a].x}
            y1={vertices[a].y}
            x2={vertices[b].x}
            y2={vertices[b].y}
            stroke="#bba5db66"
            strokeWidth="2"
          />
        ))}
        {vertices.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r="15"
              fill="#32243f"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={point.y + 4}
              textAnchor="middle"
              fill="white"
              fontSize="12"
            >
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
      <div className="lab-readouts">
        <span>
          Vertices<strong>{n}</strong>
        </span>
        <span>
          Edges<strong>{edges.length}</strong>
        </span>
        <span>
          Sum of degrees<strong>{2 * edges.length}</strong>
        </span>
      </div>
      <p className="lab-note">
        {kind === "Complete"
          ? "Every pair of vertices shares an edge: |E|=n(n−1)/2."
          : kind === "Cycle"
            ? "Each vertex has degree 2. There are n edges forming a closed loop."
            : "A path has n−1 edges. Its two endpoints have degree 1; interior vertices have degree 2."}{" "}
        The degree sum is always twice the edge count.
      </p>
    </section>
  );
}
function Physics() {
  const [speed, setSpeed] = useState(20),
    [angle, setAngle] = useState(45);
  const radians = (angle * Math.PI) / 180,
    g = 9.81,
    t = (2 * speed * Math.sin(radians)) / g,
    range = speed * Math.cos(radians) * t,
    height = (speed * Math.sin(radians)) ** 2 / (2 * g);
  const points = Array.from({ length: 101 }, (_, i) => {
    const time = (t * i) / 100;
    return {
      x: speed * Math.cos(radians) * time,
      y: Math.max(0, speed * Math.sin(radians) * time - 0.5 * g * time * time),
    };
  });
  return (
    <section className="lab-panel glass-panel">
      <div className="lab-toolbar">
        <div>
          <span className="section-kicker">PHYSICS · PROJECTILE MOTION</span>
          <h2>Change the launch. Follow the arc.</h2>
        </div>
      </div>
      <div className="physics-controls">
        <label>
          Initial speed {speed} m/s
          <input
            type="range"
            min="1"
            max="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
        <label>
          Launch angle {angle}°
          <input
            type="range"
            min="5"
            max="85"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </label>
      </div>
      <Plot
        points={points}
        xMax={Math.max(range, 1)}
        yMax={Math.max(height * 1.2, 1)}
        label="Projectile trajectory, horizontal and vertical distance in metres"
      />
      <div className="lab-readouts">
        <span>
          Range<strong>{range.toFixed(2)} m</strong>
        </span>
        <span>
          Maximum height<strong>{height.toFixed(2)} m</strong>
        </span>
        <span>
          Flight time<strong>{t.toFixed(2)} s</strong>
        </span>
      </div>
      <p className="lab-note">
        Ideal model: no air resistance, level launch and landing, g = 9.81 m/s².
        x(t)=v₀cos(θ)t; y(t)=v₀sin(θ)t−½gt².
      </p>
    </section>
  );
}

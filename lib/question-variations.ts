import type { QuizQuestion } from "./question-bank";

// Numerical variants supplement authored concepts; they are not counted as new concepts.
export function buildVariations(): QuizQuestion[] {
  const result: QuizQuestion[] = [];
  function add(
    subject: string,
    topic: string,
    prompt: string,
    answer: number,
    wrong: number[],
    explanation: string,
  ) {
    const values = [...new Set([answer, ...wrong])];
    let padding = 1;
    while (values.length < 4) {
      const value = answer + padding++;
      if (!values.includes(value)) values.push(value);
    }
    result.push({
      id: `variant-${result.length + 1}`,
      subject,
      topic,
      prompt,
      options: values.slice(0, 4).map(String) as QuizQuestion["options"],
      correct: 0,
      explanation,
    });
  }
  for (let n = 2; n <= 13; n++) {
    add(
      "Structured Programming",
      "Loop tracing",
      `What is sum after int sum=0; for(int i=1;i<=${n};i++) sum+=i;?`,
      (n * (n + 1)) / 2,
      [n * n, n, (n * (n - 1)) / 2],
      `The loop adds 1 through ${n}. Their sum is n(n+1)/2 = ${(n * (n + 1)) / 2}.`,
    );
    add(
      "Structured Programming",
      "Integer arithmetic",
      `In C++, what is ${n * 3 + 1} % 3?`,
      1,
      [0, 3, n],
      `${n * 3 + 1} = 3 × ${n} + 1. The remainder is 1.`,
    );
    add(
      "Computing Fundamentals",
      "Binary capacity",
      `How many distinct unsigned patterns can ${n} bits encode?`,
      2 ** n,
      [2 * n, 2 ** n - 1, n],
      `Each bit has two possibilities. ${n} independent bits give 2^${n} = ${2 ** n} patterns.`,
    );
    add(
      "Computing Fundamentals",
      "Storage units",
      `Using 1 KiB = 1024 bytes, how many bytes are in ${n} KiB?`,
      n * 1024,
      [n * 1000, n * 8, n * 1024 - 1],
      `KiB is binary: multiply ${n} by 1024.`,
    );
    add(
      "Logic Design",
      "Truth tables",
      `A combinational circuit has ${n} binary inputs. How many rows are in its complete truth table?`,
      2 ** n,
      [n * 2, n + 1, 2 ** n - 1],
      `A truth table lists all 2^${n} input combinations.`,
    );
    add(
      "Logic Design",
      "Multiplexers",
      `How many select bits does a ${2 ** n}-to-1 multiplexer require?`,
      n,
      [2 * n, 2 ** n, n + 1],
      `There must be one binary selection code per input. log₂(${2 ** n}) = ${n}.`,
    );
    add(
      "Calculus & Mathematics",
      "Derivative evaluation",
      `For f(x) = x² + ${n}x, what is f′(${n})?`,
      3 * n,
      [n * n + n, 2 * n, n],
      `Differentiate term by term: f′(x) = 2x + ${n}. At x=${n}, the slope is ${3 * n}.`,
    );
    add(
      "Calculus & Mathematics",
      "Definite integrals",
      `Evaluate the integral of 2x from 0 to ${n}.`,
      n * n,
      [2 * n, (n * n) / 2, n * n + 1],
      `An antiderivative is x². Apply the bounds: ${n}² − 0² = ${n * n}.`,
    );
    add(
      "Discrete Mathematics",
      "Graph theory",
      `How many edges does a complete simple undirected graph with ${n} vertices have?`,
      (n * (n - 1)) / 2,
      [n * n, n * (n - 1), n],
      `Every unordered pair forms an edge: choose(${n},2) = ${(n * (n - 1)) / 2}.`,
    );
    add(
      "Discrete Mathematics",
      "Power sets",
      `A finite set contains ${n} elements. How many subsets does it have, including the empty set?`,
      2 ** n,
      [n * n, n, 2 ** n - 1],
      `Each element is either included or excluded, giving 2^${n} subsets.`,
    );
    add(
      "Physics for CS",
      "Newton’s second law",
      `A ${n} kg object accelerates at 3 m/s². What is the net force in newtons?`,
      3 * n,
      [n / 3, n + 3, 9 * n],
      `Newton’s second law is F = ma = ${n} × 3 = ${3 * n} N.`,
    );
    add(
      "Physics for CS",
      "Electric circuits",
      `A ${n * 10} Ω resistor carries 0.2 A. What is the voltage across it in volts?`,
      2 * n,
      [n * 10, n / 2, 5 * n],
      `Ohm’s law gives V = IR = 0.2 × ${n * 10} = ${2 * n} V.`,
    );
    add(
      "Differential Equations",
      "Initial value problems",
      `If dy/dx = ${n} and y(0) = 2, what is y(3)?`,
      3 * n + 2,
      [3 * n, n + 2, 6 * n],
      `Integrating gives y = ${n}x + C. The initial condition sets C=2, so y(3) = ${3 * n + 2}.`,
    );
    add(
      "Differential Equations",
      "Exponential models",
      `For y′ = ${n}y with y(0)=1, what is the exponent coefficient k in y=e^(kx)?`,
      n,
      [n * n, 1, 0],
      `The derivative of e^(kx) is k e^(kx). Substitution into y′=${n}y gives k=${n}.`,
    );
    add(
      "Probability & Statistics",
      "Expected value",
      `X is binomial with ${n * 4} independent trials and success probability 0.25. What is E[X]?`,
      n,
      [n * 4, n / 4, n * 3],
      `For a binomial distribution E[X]=np = ${n * 4} × 0.25 = ${n}.`,
    );
    add(
      "Probability & Statistics",
      "Poisson scaling",
      `Arrivals follow a Poisson process at ${n} per hour. What is the expected number in three hours?`,
      n * 3,
      [n, n / 3, n * n],
      `Expected counts scale with interval length: ${n} × 3 = ${n * 3}.`,
    );
  }
  return result;
}

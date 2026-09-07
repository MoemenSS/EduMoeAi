import type { Course } from "@/components/course-card";

export const courses: Course[] = [
  {
    code: "CS101",
    title: "Computing Fundamentals",
    description: "Build the mental models behind modern computing.",
    accent: "#f43f6d",
    symbol: "01",
    status: "Foundation",
    lessons: 8,
    topics: ["How computers represent data", "CPU, memory, and storage", "Operating systems", "Networks and the web"],
  },
  {
    code: "CS102",
    title: "Structured Programming",
    description: "Move from syntax to confident problem solving in C++.",
    accent: "#8ac7ff",
    symbol: "{ }",
    status: "8 modules",
    lessons: 12,
    topics: ["C++ program anatomy", "Control flow", "Functions and scope", "Arrays, pointers, and memory"],
  },
  {
    code: "CS103",
    title: "Logic Design",
    description: "Understand gates, circuits, and digital systems visually.",
    accent: "#c9a7ff",
    symbol: "⊕",
    status: "6 modules",
    lessons: 10,
    topics: ["Boolean algebra", "Combinational circuits", "Karnaugh maps", "Sequential logic"],
  },
  {
    code: "MTH101",
    title: "Calculus & Mathematics",
    description: "Learn the why behind limits, derivatives, and integrals.",
    accent: "#ffbd7b",
    symbol: "∫",
    status: "7 modules",
    lessons: 10,
    topics: ["Limits and continuity", "Derivative rules", "Applications of derivatives", "Integrals"],
  },
  {
    code: "MTH102",
    title: "Discrete Mathematics",
    description: "Master sets, relations, proofs, counting, and graph thinking.",
    accent: "#ff9fc7",
    symbol: "∈",
    status: "6 modules",
    lessons: 9,
    topics: ["Logic and proof", "Sets and relations", "Counting", "Graphs and trees"],
  },
  {
    code: "PHY101",
    title: "Physics for CS",
    description: "Connect mechanics, electricity, and circuits to practical systems.",
    accent: "#7dd8e8",
    symbol: "λ",
    status: "5 modules",
    lessons: 8,
    topics: ["Kinematics", "Forces and energy", "Electricity", "DC circuits"],
  },
  {
    code: "MTH201",
    title: "Differential Equations",
    description: "Model change with first-order methods and applied systems.",
    accent: "#f0d17a",
    symbol: "dy",
    status: "8 modules",
    lessons: 11,
    topics: ["First-order equations", "Separable models", "Exact equations", "Second-order systems"],
  },
  {
    code: "STA201",
    title: "Probability & Statistics",
    description: "Reason about uncertainty, distributions, and data with confidence.",
    accent: "#a8b8ff",
    symbol: "P",
    status: "7 modules",
    lessons: 10,
    topics: ["Counting probability", "Random variables", "Discrete distributions", "Estimation"],
  },
];

export const upcomingCourses: Course[] = [
  {
    code: "CS201",
    title: "Data Structures",
    description: "Move from arrays and pointers to reusable structures and algorithms.",
    accent: "#ff9fc7",
    symbol: "[]",
    status: "Next term",
    lessons: 0,
    topics: ["Linear structures", "Trees", "Hashing", "Graph algorithms"],
  },
  {
    code: "CS202",
    title: "Object-Oriented Programming",
    description: "Design maintainable programs with classes and clear abstractions.",
    accent: "#7dd8e8",
    symbol: "{}",
    status: "Next term",
    lessons: 0,
    topics: ["Classes", "Composition", "Inheritance", "Polymorphism"],
  },
];

export const courseProgress = [
  { code: "CS102", name: "Structured Programming", progress: 68, next: "Pointers & arrays" },
  { code: "CS103", name: "Logic Design", progress: 42, next: "Karnaugh maps" },
  { code: "MTH201", name: "Differential Equations", progress: 81, next: "Exact equations" },
  { code: "STA201", name: "Probability & Statistics", progress: 27, next: "Poisson distribution" },
];

export const lectureUnits = [
  {
    title: "Unit 1 · Foundations",
    lessons: ["What a program really does", "Variables and memory", "Control flow"],
  },
  {
    title: "Unit 2 · Functions",
    lessons: ["Function anatomy", "Scope and lifetime", "Pass by value vs reference"],
  },
  {
    title: "Unit 3 · Memory",
    lessons: ["Arrays in memory", "Pointers", "Dynamic allocation"],
  },
];

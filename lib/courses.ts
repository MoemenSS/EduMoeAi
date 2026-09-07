import type { Course } from "@/components/course-card";

export const courses: Course[] = [
  {
    code: "CS101",
    title: "Computing Fundamentals",
    description: "Build the mental models behind modern computing.",
    accent: "#79e9b4",
    symbol: "01",
    status: "Foundation",
  },
  {
    code: "CS102",
    title: "Structured Programming",
    description: "Move from syntax to confident problem solving in C++.",
    accent: "#8ac7ff",
    symbol: "{ }",
    status: "8 modules",
  },
  {
    code: "CS103",
    title: "Logic Design",
    description: "Understand gates, circuits, and digital systems visually.",
    accent: "#c9a7ff",
    symbol: "⊕",
    status: "6 modules",
  },
  {
    code: "MTH101",
    title: "Calculus & Mathematics",
    description: "Learn the why behind limits, derivatives, and integrals.",
    accent: "#ffbd7b",
    symbol: "∫",
    status: "7 modules",
  },
];

export const upcomingCourses: Course[] = [
  {
    code: "MTH102",
    title: "Discrete Mathematics",
    description: "Logic, sets, relations, counting, and proofs.",
    accent: "#ff9fc7",
    symbol: "∈",
    status: "In preparation",
  },
  {
    code: "PHY101",
    title: "Physics for CS",
    description: "A practical path through the physics curriculum.",
    accent: "#7dd8e8",
    symbol: "λ",
    status: "In preparation",
  },
];

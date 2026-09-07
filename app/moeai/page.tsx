import type { Metadata } from "next";
import { AppPage } from "@/components/app-page";
import { MoeAiChat } from "@/components/moeai-chat";

export const metadata: Metadata = { title: "MoeAI", description: "Your curriculum-aware AI tutor and debugging workspace." };
export default function MoeAiPage() { return <AppPage eyebrow="MoeAI workspace" title="Ask with the context intact." description="Course-aware explanations, debugging, and practice built around what you are learning now." wide><MoeAiChat /></AppPage>; }


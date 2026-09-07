import type { Metadata } from "next";
import { AppPage } from "@/components/app-page";
import { RankedArena } from "@/components/ranked-arena";

export const metadata: Metadata = { title: "Ranked Arena", description: "Compete, learn, and climb the EduMoe campus ladder." };
export default function RankedPage() { return <AppPage eyebrow="Ranked arena" title="Test your understanding under pressure." description="Challenge curriculum bots, sharpen recall, and climb a learning-first campus ladder."><RankedArena /></AppPage>; }


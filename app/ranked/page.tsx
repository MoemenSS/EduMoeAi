import type { Metadata } from "next";
import { AppPage } from "@/components/app-page";
import { RankedArena } from "@/components/ranked-arena";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Ranked Arena",
  description: "Compete, learn, and climb the EduMoe campus ladder.",
};
export default async function RankedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <AppPage
      eyebrow="Ranked arena"
      title="Test your understanding under pressure."
      description="Take a timed solo challenge, get a server-verified score, and build your place on the student ladder."
    >
      <RankedArena userId={user?.id ?? null} />
    </AppPage>
  );
}

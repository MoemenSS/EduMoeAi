import type { Metadata } from "next";
import { AppPage } from "@/components/app-page";
import { SimulatorLab } from "@/components/simulator-lab";

export const metadata: Metadata = {
  title: "Interactive Labs",
  description:
    "Interactive Logic, C++, Probability, and Calculus learning tools.",
};
export default function SimulatorsPage() {
  return (
    <AppPage
      eyebrow="Interactive labs"
      title="See the concept move."
      description="Experiment with logic, code, distributions, and calculus in focused visual workspaces."
      wide
    >
      <SimulatorLab />
    </AppPage>
  );
}

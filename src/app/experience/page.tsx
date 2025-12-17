import { ExperienceSection } from "@/components/experience";
import { getExperience } from "@/lib/api";
import type { Experience } from "@/lib/api";

export default async function ExperiencePage() {
  let experience: Experience[] = [];

  try {
    experience = await getExperience();
  } catch {
    experience = [];
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ExperienceSection items={experience} />
    </main>
  );
}

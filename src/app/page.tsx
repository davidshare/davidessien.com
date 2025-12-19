import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { ExperienceSection } from "@/components/experience";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { getProjects, getPosts, getExperience } from "@/lib/api";

// --- Mock Data Fallback ---
// Since this is a generated demo, if no files exist, we use this data.

export default async function Home() {
  // Try to fetch real data, fall back to mock if empty (for preview purposes)
  const projects = await getProjects().catch(() => []);
  const experience = await getExperience().catch(() => []);
  const posts = await getPosts().catch(() => []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <Services projects={projects} />
        <Projects projects={projects} />
        <ExperienceSection items={experience} />
        <Blog posts={posts} />
        <Contact />
      </main>

    </div>
  );
}

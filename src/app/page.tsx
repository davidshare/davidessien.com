import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { ExperienceSection } from "@/components/experience";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { getProjects, getPosts, getExperienceSectionData } from "@/lib/api";
import { getAllServices } from '@/lib/services';

// --- Mock Data Fallback ---
// Since this is a generated demo, if no files exist, we use this data.

export default async function Home() {
  // Try to fetch real data, fall back to mock if empty (for preview purposes)
  const projects = await getProjects().catch(() => []);
  const experience = await getExperienceSectionData().catch(() => []);
  const posts = await getPosts().catch(() => []);
  const services = await getAllServices().catch(() => []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <Services services={services} />
        <Projects projects={projects} />
        <ExperienceSection items={experience} />
        <Blog posts={posts} />
        <Contact />
      </main>

    </div>
  );
}

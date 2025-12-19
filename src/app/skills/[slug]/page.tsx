import { notFound } from "next/navigation";
import Link from "next/link";
import skillsData from "@/content/skills.json";
import { getProjects } from "@/lib/api";
import { slugify } from '@/lib/utils';

interface Project {
  slug: string;
  title: string;
  description: string;
  categories?: string[];
  techStack?: string[];
  tags?: string[];
}

function normalize(str: string) {
  return str.toLowerCase().trim();
}

export async function generateStaticParams() {
  const { skills } = skillsData as any;

  return Object.keys(skills).map((skill) => ({
    slug: slugify(skill),
  }));
}

function getSkillBySlug(slug: string) {
  const { skills, descriptions } = skillsData as any;

  for (const category of Object.keys(skills)) {
    if (slugify(category) === slug) {
      return {
        title: category,
        description: descriptions?.[category] ?? "",
        tools: skills[category] as string[],
      };
    }
  }

  return null;
}

function projectMatchesSkill(project: Project, tools: string[]) {
  const haystack = [
    ...(project.categories ?? []),
    ...(project.techStack ?? []),
    ...(project.tags ?? []),
  ].map(normalize);

  return tools.some((tool) =>
    haystack.some((entry) => entry.includes(normalize(tool)))
  );
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    notFound();
  }

  const projects = (await getProjects()) as Project[];

  const relatedProjects = projects.filter((project) =>
    projectMatchesSkill(project, skill.tools)
  );

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/skills"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to skills
          </Link>

          <h1 className="text-4xl font-bold mt-4 mb-4">
            {skill.title}
          </h1>

          <p className="text-muted-foreground max-w-3xl">
            {skill.description}
          </p>
        </div>

        {/* Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">
            Tools & Technologies
          </h2>

          <div className="flex flex-wrap gap-2">
            {skill.tools.map((tool) => (
              <span
                key={tool}
                className="text-sm rounded-md bg-secondary px-3 py-1"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* Related Projects */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Related Projects
          </h2>

          {relatedProjects.length === 0 ? (
            <p className="text-muted-foreground">
              No projects explicitly linked to this skill yet.
            </p>
          ) : (
            <div className="flex flex-col gap-8">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="block p-6 border rounded-3xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {project.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

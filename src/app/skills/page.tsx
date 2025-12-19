import Link from "next/link";
import skillsData from "@/content/skills.json";
import { slugify } from '@/lib/utils';

interface SkillIndexItem {
  slug: string;
  title: string;
  description: string;
  count: number;
}

function getSkillIndex(): SkillIndexItem[] {
  const { skills, descriptions } = skillsData as any;

  return Object.entries(skills).map(([category, values]) => ({
    slug: slugify(category),
    title: category,
    description: descriptions?.[category] ?? "",
    count: (values as string[]).length,
  }));
}

export const metadata = {
  title: "Skills",
  description: "Technical skills, tools, and platforms I use professionally",
};

export default function SkillsPage() {
  const skillIndex = getSkillIndex();

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">My Skills</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A structured overview of the technologies, tools, and platforms I
            use to design, build, deploy, and operate modern systems.
          </p>
        </div>

        {/* Skills List */}
        <div className="flex flex-col gap-12">
          {skillIndex.map((item) => (
            <Link
              key={item.slug}
              href={`/skills/${item.slug}`}
              className="block p-6 border rounded-3xl hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
                    {item.description}
                  </p>
                </div>

                <div className="text-sm font-medium whitespace-nowrap bg-secondary/50 px-3 py-1 rounded-md h-fit">
                  {item.count} skills
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

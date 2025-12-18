import { getExperienceBySlug, getAllExperienceSlugs } from "@/lib/experience";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllExperienceSlugs();
  console.log('[generateStaticParams] Experience slugs:', slugs);
  return slugs.map((slug) => ({ slug }));
}

export default async function ExperienceSinglePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  console.log('[ExperienceSinglePage] Loading slug:', slug);

  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    console.error('[ExperienceSinglePage] Not found:', slug);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-6">{experience.title}</h1>
        <div className="flex items-center gap-4 mb-6 text-muted-foreground text-sm">
          <span>{experience.company}</span>
          {experience.location && <span>• {experience.location}</span>}
          <span>• {experience.duration.label}</span>
        </div>
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: experience.html }} />
        </div>
        {experience.techStack?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {experience.techStack.map((skill) => (
              <span
                key={skill}
                className="bg-secondary text-xs px-2 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
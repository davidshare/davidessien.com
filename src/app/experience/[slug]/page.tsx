import { getExperienceBySlug, getAllExperienceSlugs } from "@/lib/experience";
import { notFound } from "next/navigation";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = getAllExperienceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ExperienceSinglePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    console.error('[ExperienceSinglePage] Not found:', slug);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/experience">
              <ArrowLeft className="h-4 w-4" />
              Back to Experiences
            </Link>
          </Button>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold mb-6">{experience.title}</h1>
          <div className="flex items-center gap-4 mb-6 text-muted-foreground text-sm">
            <span>{experience.company}</span>
            {experience.location && <span>• {experience.location}</span>}
            <span>• {experience.duration.label}</span>
          </div>
          <article
            className="max-w-none
          text-gray-800 text-lg leading-relaxed
          [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-10 [&_h1]:mb-6
          [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-8 [&_h2]:mb-4
          [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3
          [&_p]:my-6 [&_p]:leading-8
          [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:my-6
          [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:my-6
          [&_li]:my-3
          [&_:not(pre)_code]:px-1.5 [&_:not(pre)_code]:py-0.5 [&_:not(pre)_code]:rounded [&_:not(pre)_code]:font-mono [&_:not(pre)_code]:text-sm
          [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-6 [&_pre]:rounded-xl [&_pre]:my-8 [&_pre]:overflow-x-auto
          [&_a]:text-primary [&_a]:font-medium [&_a]:hover:underline
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8
          [&_strong]:font-bold [&_strong]:text-gray-900"
            dangerouslySetInnerHTML={{ __html: experience.html }}
          />
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
    </div>
  );
}
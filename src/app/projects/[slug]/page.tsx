import { Metadata } from "next";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | David Essien`,
    description: project.description,
  };
}

export default async function ProjectSinglePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary"
              >
                {category}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="font-medium text-primary">{project.projectType}</span>

              {project.duration !== "N/A" && (
                <>
                  <span>•</span>
                  <span>{project.duration}</span>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {project.repoUrl && (
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}

              {project.demoUrl && (
                <Button asChild variant="default" size="sm" className="gap-2">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Project Diagram */}
        {project.diagram && (
          <div className="mb-12 rounded-2xl overflow-hidden border shadow-lg">
            <div className="relative aspect-video">
              <Image
                src={project.diagram}
                alt={`${project.title} architecture diagram`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none mb-12
          prose-headings:font-bold prose-headings:text-foreground
          prose-p:leading-relaxed
          prose-ul:list-disc prose-ol:list-decimal
          prose-strong:text-foreground
          prose-a:text-primary hover:prose-a:underline
          prose-img:rounded-xl
          prose-ul:pl-6 prose-ol:pl-6
          prose-li:my-1
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />

        {/* Tech Stack */}
        {project.techStack.length > 0 && (
          <div className="mb-12 py-6 rounded-2xl bg-secondary/20">
            <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
            <ul className="list-disc list-inside space-y-1">
              {project.techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

          </div>
        )}

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
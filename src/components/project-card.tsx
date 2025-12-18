"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group flex flex-col rounded-2xl border bg-card overflow-hidden h-full hover:shadow-lg transition-all duration-300">
        {/* Project Diagram/Image */}
        {project.diagram && (
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Image
              src={project.diagram}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-6 text-sm text-muted-foreground line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tech Stack Preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>

          {/* Type and Duration */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
            <span className="font-medium">{project.projectType}</span>
            <span>{project.duration}</span>
          </div>

          {/* View Project Button */}
          <div className="mt-4 pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-2 rounded-full hover:bg-primary hover:text-primary-foreground group-hover:translate-x-1 transition-all"
            >
              View Details <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
"use client";

import * as React from "react";
import Image from "next/image";
import Link from 'next/link'
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/api";

const categories = ["All", "Software", "Devops", "Web"];

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === "All" ||
      project.categories?.some(
        (category) => category.toLowerCase() === activeCategory.toLowerCase()
      )
  );

  return (
    <section id="works" className="py-20 md:py-32">
      <div className="container px-4 md:px-8">
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Projects
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${activeCategory === category
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="group relative overflow-hidden rounded-2xl bg-card border"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                    {project.primaryCategory}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold flex-1 line-clamp-2">{project.title}</h3>
                  <Button
                    asChild
                    variant="outline"
                    size="default"
                    className="gap-2 rounded-full bg-black text-white hover:bg-black/80 border-none dark:bg-white dark:text-black shrink-0"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      View Project <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.stats}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

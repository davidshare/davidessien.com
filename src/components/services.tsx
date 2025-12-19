"use client";

import * as React from "react";
import type { Project } from "@/lib/projects";
import Image from "next/image";
import { Cloud, Code2 } from "lucide-react";

interface ServicesProps {
  projects: Project[];
}



export function Services({ projects }: ServicesProps) {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const categories = React.useMemo(() => {
    const set = new Set<string>(["All"]);
    projects.forEach(p =>
      p.categories.forEach(c => set.add(c))
    );
    return Array.from(set);
  }, [projects]);


  const services = React.useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? projects
        : projects.filter(p =>
          p.categories.includes(activeCategory)
        );

    return filtered.slice(0, 2).map(project => ({
      icon: project.categories.includes("DevOps")
        ? <Cloud className="h-8 w-8" />
        : <Code2 className="h-8 w-8" />,
      title: project.title,
      description: project.description,
    }));
  }, [projects, activeCategory]);

  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Areas of Expertise
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            We conduct thorough evaluations of your competitors and target
            audience to uncover industry best practices
          </p>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors
        ${activeCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border bg-card p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {service.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-black">
              {/* Mockup of laptop */}
              <Image
                src="https://picsum.photos/800/600?grayscale"
                alt="Laptop showing code"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

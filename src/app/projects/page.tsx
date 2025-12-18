import { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | David Essien",
  description: "Explore technical projects showcasing cloud infrastructure, DevOps practices, and full-stack development skills.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-8">
          <ProjectsClient projects={projects} />
        </div>
      </main>
    </div>
  );
}
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {renderMarkdown} from "./markdown";
import {
  ProjectFrontmatterSchema,
  type ProjectFrontmatter,
} from "./content/project.schema";
import {cache} from "react";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export interface Project extends ProjectFrontmatter {
  slug: string;
  order: number;
  content: string;
  html: string;
}

function parseFilename(filename: string): {order: number; slug: string} {
  const base = filename.replace(/\.md$/, "");
  const match = base.match(/^(\d+)-/);
  let order = 0;
  const slug = base;

  if (match) {
    order = parseInt(match[1], 10);
  }

  return {order, slug};
}

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    try {
      const filePath = path.join(PROJECTS_DIR, `${slug}.md`);

      if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${slug}.md`);
        return null;
      }

      const raw = fs.readFileSync(filePath, "utf-8");
      const {data, content} = matter(raw);

      const parsed = ProjectFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.error(
          `Invalid project frontmatter in ${slug}:`,
          parsed.error.format()
        );
        return null;
      }

      const html = await renderMarkdown(content);
      const {order} = parseFilename(slug);

      return {
        ...parsed.data,
        slug,
        order,
        content,
        html,
      };
    } catch (error) {
      console.error(`Failed to load project ${slug}:`, error);
      return null;
    }
  }
);

export const getAllProjectSlugs = cache((): string[] => {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
});

export const getAllProjects = cache(async (): Promise<Project[]> => {
  const slugs = getAllProjectSlugs();
  const projects = await Promise.all(
    slugs.map((slug) => getProjectBySlug(slug))
  );
  return projects
    .filter((p): p is Project => p !== null)
    .sort((a, b) => a.order - b.order);
});

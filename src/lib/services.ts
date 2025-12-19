import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {renderMarkdown} from "./markdown";
import {
  ServiceFrontmatterSchema,
  type ServiceFrontmatter,
} from "./content/service.schema";
import {cache} from "react";

const SERVICES_DIR = path.join(process.cwd(), "src/content/services");

export interface Service extends ServiceFrontmatter {
  slug: string;
  order: number;
  content: string;
  html: string;
}

function parseFilename(filename: string): {order: number; slug: string} {
  const base = filename.replace(/\.md$/, "");
  const match = base.match(/^(\d+)-/);
  let order = 999; // default high if no prefix
  const slug = base;

  if (match) {
    order = parseInt(match[1], 10);
  }

  return {order, slug};
}

export const getServiceBySlug = cache(
  async (slug: string): Promise<Service | null> => {
    try {
      const filePath = path.join(SERVICES_DIR, `${slug}.md`);

      if (!fs.existsSync(filePath)) {
        console.error(`Service file not found: ${slug}.md`);
        return null;
      }

      const raw = fs.readFileSync(filePath, "utf-8");
      const {data, content} = matter(raw);

      const parsed = ServiceFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.error(
          `Invalid service frontmatter in ${slug}:`,
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
      console.error(`Failed to load service ${slug}:`, error);
      return null;
    }
  }
);

export const getAllServiceSlugs = cache((): string[] => {
  if (!fs.existsSync(SERVICES_DIR)) return [];

  return fs
    .readdirSync(SERVICES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
});

export const getAllServices = cache(async (): Promise<Service[]> => {
  const slugs = getAllServiceSlugs();
  const services = await Promise.all(
    slugs.map((slug) => getServiceBySlug(slug))
  );
  return services
    .filter((s): s is Service => s !== null)
    .sort((a, b) => a.order - b.order);
});

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {renderMarkdown} from "./markdown";
import {
  ExperienceFrontmatterSchema,
  type ExperienceFrontmatter,
} from "./content/experience.schema";
import {cache} from "react";

const EXPERIENCE_DIR = path.join(process.cwd(), "src/content/experiences");

export interface Experience extends ExperienceFrontmatter {
  slug: string; // From filename (with number prefix)
  order: number; // Extracted from filename prefix
  content: string;
  html: string;
}

// Helper: Extract order and slug from filename
function parseFilename(filename: string): {order: number; slug: string} {
  const base = filename.replace(/\.md$/, "");

  // Extract number prefix (e.g., "00-" gives order 0)
  const match = base.match(/^(\d+)-/);
  let order = 0;
  const slug = base; // Keep full filename as slug (with number prefix)

  if (match) {
    order = parseInt(match[1], 10);
  }

  return {order, slug};
}

// Get single experience by slug (slug includes number prefix)
export const getExperienceBySlug = cache(
  async (slug: string): Promise<Experience | null> => {
    try {
      // Slug already includes number prefix from index
      const filePath = path.join(EXPERIENCE_DIR, `${slug}.md`);

      if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${slug}.md`);
        return null;
      }

      const raw = fs.readFileSync(filePath, "utf-8");
      const {data, content} = matter(raw);

      const parsed = ExperienceFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.error(
          `Invalid experience frontmatter in ${slug}:`,
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
      console.error(`Failed to load experience ${slug}:`, error);
      return null;
    }
  }
);

// Get all experience slugs (for generateStaticParams)
export const getAllExperienceSlugs = cache((): string[] => {
  if (!fs.existsSync(EXPERIENCE_DIR)) return [];

  return fs
    .readdirSync(EXPERIENCE_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
});

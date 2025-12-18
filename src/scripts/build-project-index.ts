import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  ProjectFrontmatterSchema,
  type ProjectFrontmatter,
} from "@/lib/content/project.schema";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");

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

function buildProjectIndex() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error(`Directory not found: ${PROJECTS_DIR}`);
    return;
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, {recursive: true});
  }

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".md"));
  const index: Array<
    ProjectFrontmatter & {
      slug: string;
      order: number;
    }
  > = [];

  console.log(`Found ${files.length} project files`);

  for (const file of files) {
    console.log(`Processing: ${file}`);

    try {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const {data} = matter(raw);

      const parsed = ProjectFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.error(
          `❌ Invalid frontmatter in ${file}:`,
          parsed.error.format()
        );
        continue;
      }

      const {order, slug} = parseFilename(file);

      index.push({
        ...parsed.data,
        slug,
        order,
      });

      console.log(`✅ Added: ${slug}`);
    } catch (error) {
      console.error(`❌ Failed to process ${file}:`, error);
    }
  }

  // Sort by order number
  index.sort((a, b) => a.order - b.order);

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "project-index.json"),
    JSON.stringify(index, null, 2)
  );

  console.log(`✅ Built project index for ${index.length} items`);
  console.log(`📁 Output: ${path.join(PUBLIC_DIR, "project-index.json")}`);
}

buildProjectIndex();

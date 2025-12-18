import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  ExperienceFrontmatterSchema,
  type ExperienceFrontmatter,
} from "@/lib/content/experience.schema";

const EXPERIENCE_DIR = path.join(process.cwd(), "src/content/experiences");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Helper: Extract order from filename
function parseFilename(filename: string): {order: number; slug: string} {
  const base = filename.replace(/\.md$/, "");
  const match = base.match(/^(\d+)-/);
  let order = 0;
  const slug = base; // Keep full filename

  if (match) {
    order = parseInt(match[1], 10);
  }

  return {order, slug};
}

function buildExperienceIndex() {
  if (!fs.existsSync(EXPERIENCE_DIR)) {
    console.error(`Directory not found: ${EXPERIENCE_DIR}`);
    return;
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, {recursive: true});
  }

  const files = fs.readdirSync(EXPERIENCE_DIR).filter((f) => f.endsWith(".md"));
  const index: Array<
    ExperienceFrontmatter & {
      slug: string;
      order: number;
    }
  > = [];

  console.log(`Found ${files.length} experience files`);

  for (const file of files) {
    console.log(`Processing: ${file}`);

    try {
      const raw = fs.readFileSync(path.join(EXPERIENCE_DIR, file), "utf-8");
      const {data} = matter(raw);

      const parsed = ExperienceFrontmatterSchema.safeParse(data);
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
        slug, // Use filename as slug (with number prefix)
        order,
      });

      console.log(`✅ Added: ${slug}`);
    } catch (error) {
      console.error(`❌ Failed to process ${file}:`, error);
    }
  }

  // Sort by order number
  index.sort((a, b) => b.order - a.order);

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "experience-index.json"),
    JSON.stringify(index, null, 2)
  );

  console.log(`✅ Built experience index for ${index.length} items`);
  console.log(`📁 Output: ${path.join(PUBLIC_DIR, "experience-index.json")}`);
}

buildExperienceIndex();

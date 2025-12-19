import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  ServiceFrontmatterSchema,
  type ServiceFrontmatter,
} from "@/lib/content/service.schema";

const SERVICES_DIR = path.join(process.cwd(), "src/content/services");
const PUBLIC_DIR = path.join(process.cwd(), "public");

function parseFilename(filename: string): {order: number; slug: string} {
  const base = filename.replace(/\.md$/, "");
  const match = base.match(/^(\d+)-/);
  let order = 999;
  const slug = base;

  if (match) {
    order = parseInt(match[1], 10);
  }

  return {order, slug};
}

function buildServiceIndex() {
  if (!fs.existsSync(SERVICES_DIR)) {
    console.error(`Directory not found: ${SERVICES_DIR}`);
    return;
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, {recursive: true});
  }

  const files = fs.readdirSync(SERVICES_DIR).filter((f) => f.endsWith(".md"));
  const index: Array<
    ServiceFrontmatter & {
      slug: string;
      order: number;
    }
  > = [];

  console.log(`Found ${files.length} service files`);

  for (const file of files) {
    console.log(`Processing: ${file}`);
    try {
      const raw = fs.readFileSync(path.join(SERVICES_DIR, file), "utf-8");
      const {data} = matter(raw);

      const parsed = ServiceFrontmatterSchema.safeParse(data);
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

  index.sort((a, b) => a.order - b.order);

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "service-index.json"),
    JSON.stringify(index, null, 2)
  );

  console.log(`✅ Built service index for ${index.length} items`);
}

buildServiceIndex();

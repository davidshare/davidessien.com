import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {BlogPostSchema, BlogPost} from "@/lib/content/blog.schema";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");
const PUBLIC_DIR = path.join(process.cwd(), "public");

function buildBlogIndex() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, {recursive: true});
  }

  const searchIndex: Array<
    Pick<
      BlogPost,
      | "slug"
      | "title"
      | "excerpt"
      | "primaryCategory"
      | "categories"
      | "tags"
      | "date"
    >
  > = [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const {data} = matter(raw); // ignore content for indexing

    const parsed = BlogPostSchema.safeParse({
      ...data,
      content: "", // optional, just to satisfy schema if required
    });

    if (!parsed.success) {
      console.error(`❌ Invalid blog post: ${file}`);
      console.error(parsed.error.format());
      continue;
    }

    searchIndex.push({
      slug: parsed.data.slug,
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      primaryCategory: parsed.data.primaryCategory,
      categories: parsed.data.categories,
      tags: parsed.data.tags,
      date: parsed.data.date,
    });
  }

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "posts-search-index.json"),
    JSON.stringify(searchIndex, null, 2)
  );

  console.log(`✅ Built search index for ${searchIndex.length} blog posts`);
}

buildBlogIndex();

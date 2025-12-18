import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Constants for directories
const PROJECTS_DIR = path.join((process as any).cwd(), "src/content/projects");
const POSTS_DIR = path.join((process as any).cwd(), "src/content/posts");
const EXPERIENCE_DIR = path.join(
  (process as any).cwd(),
  "src/content/experiences"
);

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  content: string;
  link?: string;
  stats?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string;
  views?: number;
  shares?: number;
  readTime?: string;
}

export interface Post extends PostMeta {
  author: string;
  authorImage?: string;
  content: string;
}

export interface Experience {
  slug: string;
  title: string;
  company: string;
  period: string;
  type: "Experience" | "Education" | "Certification" | "Skills"; // Categorization
  description: string;
  location?: string;
  skills?: string[];
  content: string;
}

export async function getProjects(): Promise<Project[]> {
  const files = getFiles(PROJECTS_DIR);
  const projects = files.map((filename) => {
    const filePath = path.join(PROJECTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const {data, content} = matter(fileContent);
    return {
      slug: filename.replace(".md", ""),
      ...data,
      content,
    } as Project;
  });
  return projects;
}

export async function getExperience(): Promise<Experience[]> {
  const files = getFiles(EXPERIENCE_DIR);
  const experiences = files.map((filename) => {
    const filePath = path.join(EXPERIENCE_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const {data, content} = matter(fileContent);
    return {
      slug: filename.replace(".md", ""),
      ...data,
      content,
    } as Experience;
  });
  return experiences;
}

// Helper to get files
function getFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

export async function getPosts(): Promise<Post[]> {
  const files = getFiles(POSTS_DIR);

  const posts = files
    .map((filename) => {
      const filePath = path.join(POSTS_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const {data, content} = matter(fileContent);
      return {
        slug: filename.replace(".md", ""),
        title: data.title ?? "Untitled",
        excerpt: data.excerpt ?? "",
        date: data.date ?? "1970-01-01",
        author: data.author ?? "Unknown",
        authorImage: data.authorImage,
        coverImage: data.coverImage ?? "/placeholder.png",
        category: data.category ?? "General",
        tags: data.tags ?? [],
        draft: data.draft ?? false,
        content,
      } as Post;
    })
    .filter((post) => !(post.draft && process.env.NODE_ENV === "production")); // skip drafts

  // Sort by date descending
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    // Fallback to mock data check (optional)
    const mock = MOCK_POSTS.find((p) => p.slug === slug);
    return mock || null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const {data, content} = matter(fileContent);
  return {
    slug,
    ...data,
    content,
  } as Post;
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getPosts();
  const categories = new Set<string>();
  posts.forEach((post) => categories.add(post.category));
  return Array.from(categories).sort();
}

export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<Post[]> {
  const allPosts = await getPosts();
  const currentPost = allPosts.find((p) => p.slug === slug);
  if (!currentPost) return [];

  const related = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score:
        p.tags?.filter((tag) => currentPost.tags?.includes(tag)).length ?? 0,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return related;
}

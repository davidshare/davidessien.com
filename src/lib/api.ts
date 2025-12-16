import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Constants for directories
const PROJECTS_DIR = path.join((process as any).cwd(), "src/content/projects");
const POSTS_DIR = path.join((process as any).cwd(), "src/content/posts");
const EXPERIENCE_DIR = path.join(
  (process as any).cwd(),
  "src/content/experience"
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

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorImage?: string;
  coverImage: string;
  category: string;
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

// Helper to get files
function getFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
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

export async function getPosts(): Promise<Post[]> {
  const files = getFiles(POSTS_DIR);
  const posts = files.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const {data, content} = matter(fileContent);
    return {
      slug: filename.replace(".md", ""),
      ...data,
      content,
    } as Post;
  });
  // Sort by date desc
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
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

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

export const MOCK_POSTS: Post[] = [
  // Fallback mock data if files aren't found, but kept minimal as we prioritize files now
  { slug: "1", title: "Article title goes here", excerpt: "Lorem ipsum dolor sit amet consectetur.", date: "2023-02-19", author: "John Doe", coverImage: "https://picsum.photos/800/600?random=10", category: "Strategy", content: "" },
];

// Helper to get files
function getFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}



export async function getPosts(): Promise<Post[]> {
  const files = getFiles(POSTS_DIR);
  // If no files, return mock but prefer files if they exist
  if (files.length === 0) return MOCK_POSTS;

  const posts = files.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    return {
      slug: filename.replace(".md", ""),
      ...data,
      content,
    } as Post;
  });
  // Sort by date desc
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    // Fallback to mock data check (optional)
    const mock = MOCK_POSTS.find(p => p.slug === slug);
    return mock || null;
  }
  
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug,
    ...data,
    content,
  } as Post;
}
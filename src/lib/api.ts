import fs from "fs";
import path from "path";
import matter from "gray-matter";
import education from "@/content/education.json";
import certifications from "@/content/certifications.json";
import skills from "@/content/skills.json";

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
  primaryCategory: string;
  categories?: string[];
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
  authorImage?: string;
  author: string;
}

export interface Post extends PostMeta {
  content: string;
  draft: boolean;
  tags: string[];
}

export interface Experience {
  slug: string;
  title: string;
  company: string;
  period: string;
  duration?: {
    start: string; // "2018-12"
    end: string; // "2020-03"
    label: string; // "Dec 2018 – Mar 2020"
  };
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
      type: "Experience",
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

export async function getExperienceSectionData(): Promise<Experience[]> {
  const experience = await getExperience();

  const educationItems: Experience[] = education.education.map((e: any) => ({
    slug: `${e.institution}-${e.startYear}`,
    title: e.degree || e.program,
    company: e.institution,
    period: e.duration,
    type: "Education",
    description: e.description,
    location: e.location,
    skills: e.relevantCourses || e.skillsAcquired,
    content: "",
  }));

  const certificationItems: Experience[] = certifications.certifications.map(
    (c: any) => ({
      slug: c.certificateId,
      title: c.name,
      company: c.issuingOrganization,
      period: `${c.issueDate} – ${c.expirationDate}`,
      type: "Certification",
      description: `Certified in ${c.skills.join(", ")}`,
      skills: c.skills,
      content: "",
    })
  );

  const skillItems: Experience[] = Object.entries(skills.skills).map(
    ([category, values]: any) => ({
      slug: category.toLowerCase(),
      title: category,
      company: "Skill Set",
      period: "Current",
      type: "Skills",
      description: category,
      skills: values,
      content: "",
    })
  );

  return [
    ...experience,
    ...educationItems,
    ...certificationItems,
    ...skillItems,
  ];
}

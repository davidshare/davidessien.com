import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { ExperienceSection } from "@/components/experience";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getProjects, getPosts, getExperience, Project, Post, Experience } from "@/lib/api";

// --- Mock Data Fallback ---
// Since this is a generated demo, if no files exist, we use this data.
const MOCK_PROJECTS: Project[] = [
  { slug: "1", title: "AWS VPC and Autoscaling", category: "Devops", description: "Infra project", image: "https://picsum.photos/600/400?random=1", content: "", stats: "200% traffic increase" },
  { slug: "2", title: "E-Commerce Platform", category: "Web", description: "Shop project", image: "https://picsum.photos/600/400?random=2", content: "", stats: "15% conversion rate" },
  { slug: "3", title: "CI/CD Pipeline", category: "Devops", description: "Automation", image: "https://picsum.photos/600/400?random=3", content: "", stats: "50% faster deployment" },
  { slug: "4", title: "Mobile Banking App", category: "Software", description: "Finance", image: "https://picsum.photos/600/400?random=4", content: "", stats: "10k+ downloads" },
];

const MOCK_EXPERIENCE: Experience[] = [
  { slug: "1", title: "DevOps Engineer", company: "@Bitmama", period: "Jan 2021 - Present", type: "Experience", description: "We conduct thorough evaluations of your competitors and target audience to uncover industry best practices.", location: "Remote" },
  { slug: "2", title: "Customer Reliability Engineer", company: "@Cloudkite.io", period: "Jul 2020 - Jul 2022", type: "Experience", description: "Managing Kubernetes clusters and ensuring 99.9% uptime.", location: "Remote" },
  { slug: "3", title: "DevOps Engineer", company: "@Goodlight (Andela)", period: "Aug 2019 - Mar 2020", type: "Experience", description: "Implemented GitOps workflows.", location: "Remote" },
  { slug: "4", title: "Software Developer", company: "@Andela Talent Accelerator", period: "Dec 2018 - Mar 2020", type: "Experience", description: "Fullstack development with Node.js and React.", location: "Lagos, Nigeria" },
  { slug: "5", title: "React Certification", company: "Meta", period: "2023", type: "Certification", description: "Advanced React concepts.", location: "Online" },
  { slug: "6", title: "B.Sc Computer Science", company: "University of Lagos", period: "2014-2018", type: "Education", description: "Major in Systems Engineering.", location: "Lagos" },
  { slug: "7", title: "Kubernetes", company: "CNCF", period: "Expert", type: "Skills", description: "Orchestration", skills: ["K8s", "Docker", "Helm"], content: "" },
];

const MOCK_POSTS: Post[] = [
  { slug: "1", title: "Article title goes here", excerpt: "Lorem ipsum dolor sit amet consectetur. Fermentum blandit mattis tristique ut.", date: "2023-02-19", author: "John Doe", coverImage: "https://picsum.photos/800/600?random=10", category: "Strategy", content: "" },
  { slug: "2", title: "Optimizing Docker Builds", excerpt: "Learn how to reduce your image size by 40% with these simple tricks.", date: "2023-02-21", author: "John Doe", coverImage: "https://picsum.photos/800/600?random=11", category: "DevOps", content: "" },
  { slug: "3", title: "The Future of Serverless", excerpt: "Why serverless computing is becoming the standard for modern apps.", date: "2023-02-25", author: "John Doe", coverImage: "https://picsum.photos/800/600?random=12", category: "Cloud", content: "" },
];

export default async function Home() {
  // Try to fetch real data, fall back to mock if empty (for preview purposes)
  let projects = await getProjects().catch(() => []);
  let experience = await getExperience().catch(() => []);
  let posts = await getPosts().catch(() => []);

  if (projects.length === 0) projects = MOCK_PROJECTS;
  if (experience.length === 0) experience = MOCK_EXPERIENCE;
  if (posts.length === 0) posts = MOCK_POSTS;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects projects={projects} />
        <ExperienceSection items={experience} />
        <Blog posts={posts} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

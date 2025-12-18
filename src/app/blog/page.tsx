import { getPosts } from "@/lib/api";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog | David Essien",
  description: "Insights and articles from a DevOps Engineer",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-8">
          <BlogClient posts={posts} />
        </div>
      </main>
    </div>
  );
}

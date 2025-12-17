import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { getPosts } from "@/lib/api";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";

export const metadata = {
  title: "Blog | Knowhare",
  description: "Insights and articles from a DevOps Engineer",
};

const CATEGORIES = ["All", "Product", "Business", "Client interactions"];

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-8">

          {/* Header Section */}
          <div className="mb-12">
            <p className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              I AM DAVID ESSIEN
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
              Knowshare Blog
            </h1>
            <p className="max-w-2xl text-muted-foreground text-lg leading-relaxed">
              DevOps engineer with over 15 years of experience in the tech industry. He is also the
              co-founder of Psifon.org and Tersu(an organizations dedicated to the implementation
              and democratization of practical knowledge).
            </p>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {CATEGORIES.map((cat, i) => (
                <Button
                  key={cat}
                  variant={i === 0 ? "default" : "secondary"}
                  className={`rounded-full px-6 ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full h-10 rounded-full bg-muted border-none pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
            {/* Duplicate for demo if few posts */}
            {posts.length < 3 && posts.map(post => (
              <BlogCard key={`${post.slug}-dup`} post={{ ...post, slug: `${post.slug}-dup` }} />
            ))}
            {posts.length < 3 && posts.map(post => (
              <BlogCard key={`${post.slug}-dup2`} post={{ ...post, slug: `${post.slug}-dup2` }} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center items-center gap-4">
            <Button variant="outline" className="rounded-md">Back</Button>
            <span className="text-sm font-medium">1/14</span>
            <Button variant="default" className="rounded-md bg-black text-white dark:bg-white dark:text-black">Next</Button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
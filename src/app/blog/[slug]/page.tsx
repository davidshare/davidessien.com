import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart2, Share2, Clock, Facebook, Twitter, Instagram, Send, Linkedin } from "lucide-react";
import { marked } from "marked";
import { getPostBySlug, getPosts } from "@/lib/api";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { BlogCard } from "@/components/blog-card";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = await getPosts();

  if (!post) {
    notFound();
  }

  const contentHtml = marked.parse(post.content);

  // Suggested posts logic
  const suggestedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);

  // Sidebar mock data
  const recentPosts = allPosts.slice(0, 3);
  const recommendedPosts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-8 py-12 md:py-16">

          {/* Top Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider">
            <span className="text-foreground">{post.category}</span>
            <span className="w-px h-3 bg-muted-foreground/30"></span>
            <span className="flex items-center gap-2"><BarChart2 className="w-3 h-3" /> {post.views || 412}</span>
            <span className="flex items-center gap-2"><Share2 className="w-3 h-3" /> {post.shares || 827} shares</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {post.readTime || "3 minutes read"}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1] max-w-4xl">
            {post.title}
          </h1>

          {/* Author & Social Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b pb-8 border-border/40">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                {post.authorImage ? (
                  <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">{post.author.charAt(0)}</div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
                <span className="font-bold text-foreground">{post.author}</span>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <span className="text-muted-foreground">{formatDate(post.date)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-2 hover:text-foreground cursor-pointer transition-colors">
                <div className="bg-muted p-1.5 rounded-full"><Facebook className="w-3 h-3" /></div>
                <span>242</span>
              </div>
              <div className="flex items-center gap-2 hover:text-foreground cursor-pointer transition-colors">
                <div className="bg-muted p-1.5 rounded-full"><Twitter className="w-3 h-3" /></div>
                <span>768</span>
              </div>
              <div className="flex items-center gap-2 hover:text-foreground cursor-pointer transition-colors">
                <div className="bg-muted p-1.5 rounded-full"><Linkedin className="w-3 h-3" /></div>
                <span>323</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden mb-12 bg-muted shadow-sm">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Content */}
              <article
                className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-primary hover:prose-a:underline
                    prose-img:rounded-2xl
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic
                    prose-strong:text-foreground
                    prose-li:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Bottom Author Bio Card */}
              <div className="mt-16 bg-muted/30 rounded-2xl p-8 flex flex-col md:flex-row items-start gap-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-background shadow-sm">
                  {post.authorImage ? (
                    <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/20" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-foreground">{post.author}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] uppercase font-bold tracking-wide text-muted-foreground">DevOps Engineer</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Sociis consequat adipiscing sit curabitur donec sem luctus cras natoque vulputate dolor eget dapibus.
                    sem luctus cras natoqu vulputate dolor eget dapibus.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-12">
              {/* Share Widget */}
              <div className="bg-muted/30 rounded-2xl p-8 text-center">
                <h3 className="text-lg font-medium mb-6">Share</h3>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-muted-foreground/20 hover:border-primary hover:text-primary transition-colors bg-background">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-muted-foreground/20 hover:border-primary hover:text-primary transition-colors bg-background">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-muted-foreground/20 hover:border-primary hover:text-primary transition-colors bg-background">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Recent Posts */}
              <div>
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Top Post</p>
                  <h3 className="text-xl font-bold">Recent</h3>
                </div>
                <div className="space-y-6">
                  {recentPosts.map((p, i) => (
                    <Link href={`/blog/${p.slug}`} key={`recent-${i}`} className="flex gap-4 group cursor-pointer">
                      <div className="w-24 h-20 bg-muted rounded-lg shrink-0 overflow-hidden relative">
                        <Image src={p.coverImage} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="py-1">
                        <h4 className="font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {p.title}
                        </h4>
                        <div className="flex gap-3 text-[10px] font-medium text-muted-foreground uppercase">
                          <span className="flex items-center gap-1"><BarChart2 className="w-3 h-3" /> {p.views || 219}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime || "2 min"}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recommended Posts */}
              <div>
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Top Post</p>
                  <h3 className="text-xl font-bold">Recommended</h3>
                </div>
                <div className="space-y-6">
                  {recommendedPosts.map((p, i) => (
                    <Link href={`/blog/${p.slug}`} key={`rec-${i}`} className="flex gap-4 group cursor-pointer">
                      <div className="w-24 h-20 bg-muted rounded-lg shrink-0 overflow-hidden relative">
                        <Image src={p.coverImage} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="py-1">
                        <h4 className="font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {p.title}
                        </h4>
                        <div className="flex gap-3 text-[10px] font-medium text-muted-foreground uppercase">
                          <span className="flex items-center gap-1"><BarChart2 className="w-3 h-3" /> {p.views || 219}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime || "2 min"}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* You Might Like Section */}
          <div className="mt-24 pt-16 border-t border-border/40">
            <h2 className="text-3xl font-extrabold mb-12">You Might Like</h2>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
              {suggestedPosts.length > 0 ? (
                suggestedPosts.map(post => <BlogCard key={post.slug} post={post} />)
              ) : (
                // Fallback if no other posts exist
                <>
                  <BlogCard post={{ ...post, slug: 'dummy-1', title: 'Article title goes here' }} />
                  <BlogCard post={{ ...post, slug: 'dummy-2', title: 'Article title goes here' }} />
                  <BlogCard post={{ ...post, slug: 'dummy-3', title: 'Article title goes here' }} />
                </>
              )}
            </div>

            <div className="mt-16 flex justify-center items-center gap-4">
              <Button variant="outline" className="rounded-md px-6 h-11 border-muted-foreground/20 hover:bg-muted font-medium">Back</Button>
              <span className="text-sm font-bold mx-2">1/14</span>
              <Button variant="default" className="rounded-md bg-foreground text-background hover:bg-foreground/90 px-6 h-11 font-medium">Next</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
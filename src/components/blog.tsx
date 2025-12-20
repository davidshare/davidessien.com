import Image from "next/image";
import Link from 'next/link'
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/api";
import { formatDate } from "@/lib/utils";

interface BlogProps {
  posts: Post[];
}

export function Blog({ posts }: BlogProps) {
  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container px-4 md:px-8">
        <div className="mb-12">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Blog
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Learn More From Our Articles
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.slug}
              className="group flex flex-col rounded-2xl border bg-card overflow-hidden h-full"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                  {post.category}
                </p>
                <h3 className="mb-3 text-xl font-bold leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="mb-6 text-sm text-muted-foreground line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-muted">
                      {post.authorImage ? (
                        <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-primary/10" />
                      )}
                    </div>
                    <Link href={`/about`} className="block cursor-pointer">
                      <div className="text-xs">
                        <p className="font-medium text-foreground">{post.author}</p>
                        <p className="text-muted-foreground">{formatDate(post.date)}</p>
                      </div>
                    </Link>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 rounded-full hover:bg-primary hover:text-primary-foreground dark:hover:text-white group-hover:translate-x-1 transition-all cursor-pointer">
                    Read More <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="rounded-full px-8">
            <Link href='/blog'>View All →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

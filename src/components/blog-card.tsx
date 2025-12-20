"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PostMeta } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <div className="group flex flex-col rounded-2xl border bg-card overflow-hidden h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
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
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-[10px]">{post.author.charAt(0)}</div>
              )}
            </div>
            <Link href={`/about`} className="block cursor-pointer">
              <div className="text-xs">
                <p className="font-medium text-foreground">{post.author}</p>
                <p className="text-muted-foreground">{formatDate(post.date)}</p>
              </div>
            </Link>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-2 rounded-full hover:bg-primary hover:text-primary-foreground group-hover:translate-x-1 transition-all">
            <Link href={`/blog/${post.slug}`}>
              Read More <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
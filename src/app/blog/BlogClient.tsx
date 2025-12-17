'use client'

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";

const CATEGORIES = ["All", "Product", "Business", "Client interactions"];
const POSTS_PER_PAGE = 6;

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: string[];
}

interface BlogClientProps {
  posts: Post[];
}

const BlogClient: React.FC<BlogClientProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory =
        selectedCategory === 'All' || post.categories.includes(selectedCategory);
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    setCurrentPage(prev => {
      if (direction === 'prev') return Math.max(prev - 1, 1);
      else return Math.min(prev + 1, totalPages);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
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
          co-founder of Psifon.org and Tersu.
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {CATEGORIES.map(cat => (
            <Button
              key={cat}
              variant={cat === selectedCategory ? "default" : "secondary"}
              className={`rounded-full px-6 ${cat === selectedCategory ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
              onClick={() => handleCategoryClick(cat)}
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
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 rounded-full bg-muted border-none pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-4">
          <Button variant="outline" className="rounded-md" onClick={() => handlePageChange('prev')}>Back</Button>
          <span className="text-sm font-medium">{currentPage}/{totalPages}</span>
          <Button variant="default" className="rounded-md bg-black text-white dark:bg-white dark:text-black" onClick={() => handlePageChange('next')}>Next</Button>
        </div>
      )}
    </>
  );
};

export default BlogClient;

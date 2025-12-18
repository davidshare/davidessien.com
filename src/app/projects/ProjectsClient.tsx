'use client'

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import { Project } from "@/lib/projects";

const POSTS_PER_PAGE = 6;

interface ProjectsClientProps {
  projects: Project[];
}

const ProjectsClient: React.FC<ProjectsClientProps> = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique categories from projects
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>(['All']);
    projects.forEach(project => {
      project.categories.forEach(category => categoriesSet.add(category));
    });
    return Array.from(categoriesSet);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Filter by category
      const matchesCategory =
        selectedCategory === 'All' || project.categories.includes(selectedCategory);

      // Filter by search query
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projects, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProjects.length / POSTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
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
          PROJECT PORTFOLIO
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
          Technical Projects
        </h1>
        <p className="max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Explore my technical projects showcasing cloud infrastructure, DevOps practices,
          and full-stack development skills.
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {allCategories.map(cat => (
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
            placeholder="Search projects by title, tech, or keyword..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 rounded-full bg-muted border-none pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {projects.length} projects
        {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {paginatedProjects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* No Results */}
      {paginatedProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No projects found matching your criteria. Try a different search or category.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-4">
          <Button
            variant="outline"
            className="rounded-md"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          >
            Back
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="default"
            className="rounded-md bg-black text-white dark:bg-white dark:text-black"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default ProjectsClient;
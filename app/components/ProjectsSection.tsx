"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";
import {
  getCategoryIdFromSlug,
  getCategoryPath,
  projectCategories,
  type ProjectCategoryId,
} from "@/lib/categories";
import { clsx } from "clsx";

const ITEMS_PER_PAGE = 6;

function getCategoryIdFromPathname(pathname: string): ProjectCategoryId {
  if (pathname === "/") return "all";
  const slug = pathname.replace(/^\//, "");
  return getCategoryIdFromSlug(slug) ?? "all";
}

interface ProjectsSectionProps {
  initialCategoryId?: ProjectCategoryId;
}

export default function ProjectsSection({ initialCategoryId = "all" }: ProjectsSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState(initialCategoryId);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveFilter(getCategoryIdFromPathname(pathname));
  }, [pathname]);

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter));

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredProjects.length));
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredProjects.length, visibleCount]);

  const handleFilterClick = (categoryId: ProjectCategoryId) => {
    const nextPath = getCategoryPath(categoryId);
    if (nextPath !== pathname) {
      router.push(nextPath, { scroll: false });
    }
  };

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h2 className="text-3xl font-extrabold mb-3 text-neutral-900 dark:text-[#ffffff] drop-shadow-sm">Projects</h2>
          <p className="projects-description text-neutral-900 dark:text-[#ffffff] font-medium">A collection of my work in AI, ML and software engineering.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterClick(cat.id)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === cat.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {visibleCount < filteredProjects.length && (
          <div ref={loadMoreRef} className="h-20 w-full flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-neutral-500">No projects found in this category.</div>
        )}
      </div>
    </section>
  );
}

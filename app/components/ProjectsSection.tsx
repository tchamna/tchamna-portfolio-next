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
import { Search, X } from "lucide-react";

const ITEMS_PER_PAGE = 6;
const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

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
  const [query, setQuery] = useState("");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveFilter(getCategoryIdFromPathname(pathname));
  }, [pathname]);

  const terms = normalizeSearch(query).split(/[^\p{L}\p{N}+#.]+/u).filter(Boolean);
  const filteredProjects = projects.filter((project) => {
    if (activeFilter !== "all" && !project.category.includes(activeFilter)) return false;
    const categoryNames = projectCategories.filter(category => project.category.includes(category.id)).map(category => category.label);
    const searchable = normalizeSearch([project.title, project.description, ...project.tags, ...categoryNames].join(" "));
    const words = searchable.split(/[^\p{L}\p{N}+#.]+/u);
    return terms.every(term => words.some(word => word.startsWith(term)));
  });

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeFilter, query]);

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

        <div className="max-w-2xl mx-auto mb-6">
          <label htmlFor="project-search" className="sr-only">Search for a project</label>
          <div className="relative">
            <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={21} />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search for a project…"
              aria-describedby="project-search-help"
              className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 py-4 pl-12 pr-14 text-neutral-900 dark:text-white shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && <button type="button" onClick={() => { setQuery(""); document.getElementById("project-search")?.focus(); }} aria-label="Clear project search" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"><X size={18} /></button>}
          </div>
          <p id="project-search-help" className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 text-center">Search by name, technology, or topic—for example RAG, Python, or computer vision.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
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

        <p role="status" aria-live="polite" className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-8">{filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}{query.trim() ? ` matching “${query.trim()}”` : ""}{activeFilter !== "all" ? ` in ${projectCategories.find(category => category.id === activeFilter)?.label}` : ""}</p>
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
          <div className="text-center py-16 text-neutral-500 dark:text-neutral-400"><p className="font-semibold text-lg mb-2">No matching projects</p><p>Try a different name or technology, or choose another category.</p><button type="button" className="mt-5 text-blue-600 dark:text-blue-400 font-medium hover:underline" onClick={() => { setQuery(""); handleFilterClick("all"); }}>Clear search and show all projects</button></div>
        )}
      </div>
    </section>
  );
}

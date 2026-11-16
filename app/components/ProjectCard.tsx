"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-300 bg-white transition-colors hover:border-blue-500/50 dark:border-neutral-700 dark:bg-neutral-900 ${featured ? "sm:grid sm:grid-cols-2" : ""}`}
    >
      <div className={`relative aspect-video w-full overflow-hidden border-b border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 ${featured ? "sm:border-b-0 sm:border-r" : ""}`}>
        {project.demoUrl || project.repoUrl ? (
          <Link
            href={(project.demoUrl ?? project.repoUrl)!}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full cursor-pointer"
            tabIndex={-1}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              unoptimized
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        ) : (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            unoptimized
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {[...project.tags.filter((tag) => tag !== "MCP" || !project.tags.includes("FastMCP")).filter((tag) => tag !== "AI Agents" || !project.tags.includes("LangGraph")).slice(0, project.category.includes("resulam") ? 2 : 3), ...(project.category.includes("resulam") ? ["Resulam"] : [])].map((tag) => (
            <span
              key={tag}
              className="rounded px-1.5 py-0.5 text-xs text-neutral-600 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:text-white transition-colors">
          {project.caseStudyUrl ? <Link href={project.caseStudyUrl}>{project.title}</Link> : project.title}
        </h3>
        
        <p className="text-neutral-600 dark:text-white text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {project.caseStudyUrl && <Link href={project.caseStudyUrl} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-300 mb-3 hover:underline">Read case study <ArrowUpRight size={16} aria-hidden="true" /></Link>}

        <div className={`mt-auto flex gap-3 ${featured ? "self-start" : ""}`}>
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              Demo
            </Link>
          )}
          {project.repoUrl && (
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-lg transition-colors ${!project.demoUrl ? 'w-full' : ''}`}
            >
              <Github size={16} />
              Code
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

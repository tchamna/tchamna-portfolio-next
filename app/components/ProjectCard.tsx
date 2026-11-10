"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight, Check } from "lucide-react";
import { Project } from "@/lib/data";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
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
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        ) : (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {project.caseStudyUrl && <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-blue-600 dark:text-blue-300 mb-3">AI engineering case study</p>}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:text-white transition-colors">
          {project.caseStudyUrl ? <Link href={project.caseStudyUrl}>{project.title}</Link> : project.title}
        </h3>
        
        <p className={`text-neutral-600 dark:text-white text-sm mb-5 ${project.highlights ? "" : "flex-grow line-clamp-3"}`}>
          {project.description}
        </p>

        {project.highlights && <ul className="space-y-2 mb-5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">{project.highlights.map(point => <li key={point} className="flex gap-2"><Check aria-hidden="true" size={14} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" /><span>{point}</span></li>)}</ul>}
        {project.caseStudyUrl && <Link href={project.caseStudyUrl} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-300 mb-5 hover:underline">Architecture, stack & transferable skills <ArrowUpRight size={16} aria-hidden="true" /></Link>}

        <div className="flex gap-3 mt-auto">
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

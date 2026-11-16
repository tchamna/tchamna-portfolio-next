"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { projects, Project } from "@/lib/data";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_PLAY_MS = 3500;
const itemsToShow = projects.filter((project) => project.featured);

export default function Carousel() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  useEffect(() => {
    if (!paused && !reduceMotion) {
      autoplayRef.current = window.setInterval(() => {
        // cycle over the filtered list
        setIndex((i) => (i + 1) % (itemsToShow.length || 1));
      }, AUTO_PLAY_MS);
    }

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [paused, reduceMotion]);

  function goTo(i: number) {
    setIndex((i + (itemsToShow.length || 1)) % (itemsToShow.length || 1));
  }

  function handleClickProject(p: Project) {
    // Open demo if available, otherwise repo, otherwise do nothing
    const target = p.demoUrl || p.repoUrl;
    if (target) window.open(target, "_blank", "noopener,noreferrer");
  }

  // keyboard navigation (use the filtered set)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (itemsToShow.length === 0) return;
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + itemsToShow.length) % itemsToShow.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % itemsToShow.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [itemsToShow.length]);

  // touch swipe support
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  }

  function onTouchMove(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function onTouchEnd() {
    if (touchStartX.current == null) return;
    const threshold = 40; // px
      if (touchDeltaX.current > threshold) {
      // swiped right -> prev
      setIndex((i) => (i - 1 + itemsToShow.length) % (itemsToShow.length || 1));
    } else if (touchDeltaX.current < -threshold) {
      // swiped left -> next
      setIndex((i) => (i + 1) % (itemsToShow.length || 1));
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setPaused(false);
  }

  const project = itemsToShow[index];
  return (
    <section
      aria-label="Featured AI projects carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="portfolio-carousel relative w-full max-w-3xl mx-auto px-4 mt-4"
      ref={containerRef}
    >
      <div className="carousel-shell rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#263348] dark:text-slate-100 shadow-lg p-3">
        <div className="carousel-header flex items-start justify-between mb-2">
          <div>
            <h3 className="text-base font-semibold dark:text-white">AI Highlights</h3>
            <p className="text-xs text-neutral-500 dark:hidden">Click to view demo or code.</p>
          </div>
          <div className="carousel-controls flex items-center gap-2">
            <span className="carousel-counter hidden dark:inline">{index + 1} / {itemsToShow.length}</span>
            <button
              aria-label="Previous project"
              onClick={() => setIndex((i) => (i - 1 + (itemsToShow.length || 1)) % (itemsToShow.length || 1))}
              className="p-2 rounded-lg border border-neutral-200 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100 hover:bg-neutral-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              aria-label="Next project"
              onClick={() => setIndex((i) => (i + 1) % (itemsToShow.length || 1))}
              className="p-2 rounded-lg border border-neutral-200 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100 hover:bg-neutral-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative w-full dark:hidden">
          <div className="min-h-[180px] h-[220px] md:h-[320px] w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative cursor-pointer" onClick={() => handleClickProject(itemsToShow[index])}>
            <AnimatePresence mode="wait">
              <motion.div
                key={(itemsToShow[index] && itemsToShow[index].title) || 'slide'}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: reduceMotion ? 0 : 0.45 }}
                className="absolute inset-0"
              >
                <Image src={itemsToShow[index].imageUrl} alt={itemsToShow[index].title} fill unoptimized={typeof itemsToShow[index].imageUrl === 'string' && itemsToShow[index].imageUrl.startsWith('http')} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-2 left-2 right-2 md:left-4 md:right-4 text-white">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-sm font-bold drop-shadow">{itemsToShow[index].title}</h4>
                <div className="flex items-center gap-2 text-sm">
                  {itemsToShow[index].demoUrl ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 rounded text-white text-xs cursor-pointer">Live Demo <ExternalLink size={12} /></span>
                  ) : itemsToShow[index].repoUrl ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-800/60 rounded text-white text-xs cursor-pointer">Code <Github size={12} /></span>
                  ) : null}
                </div>
              </div>

              <p className="mt-1 text-xs text-white/90 line-clamp-2">{itemsToShow[index].description}</p>
              {/* Accessible status for screen readers */}
              <div className="sr-only" aria-live="polite">{itemsToShow[index].title} — {itemsToShow[index].description}</div>
            </div>
          </div>

          {/* The small project list has been removed — the carousel now displays only the big looping slide */}
        </div>

        <div className="dark-slide hidden" aria-live="polite">
          <div className="slide-browser">
            <div className="slide-browser-bar" aria-hidden="true">
              <span className="browser-dots"><i /><i /><i /></span>
              <span>{project.title}</span>
            </div>
            <Image src={project.imageUrl} alt={project.title} width={960} height={540} unoptimized sizes="(max-width: 899px) 100vw, 50vw" />
          </div>
          <div className="slide-copy">
            <p className="slide-category">{project.category.includes("ai-agents") ? "AI Agents" : "GenAI / RAG"}</p>
            <h4>{project.title}</h4>
            <p className="slide-description">{project.description}</p>
            <div className="slide-tech">
              {project.tags.slice(0, 3).map((tag) => <span className="tech-chip" data-tech={tag} key={tag}>{tag}</span>)}
            </div>
            <div className="slide-links">
              {project.demoUrl && <a className="dark-primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <ExternalLink size={14} aria-hidden="true" /></a>}
              {project.repoUrl && <a className="dark-secondary" href={project.repoUrl} target="_blank" rel="noopener noreferrer">Code</a>}
            </div>
          </div>
        </div>

        <div className="carousel-dots mt-4 flex items-center justify-center gap-2">
          {itemsToShow.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

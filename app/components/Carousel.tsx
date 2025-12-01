"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { projects, Project } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_PLAY_MS = 3500;

export default function Carousel() {
  const items: Project[] = projects;
  // Filtered list we will display in the carousel (prefer landscape images)
  const [itemsToShow, setItemsToShow] = useState<Project[]>(items);
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  useEffect(() => {
    if (!paused) {
      autoplayRef.current = window.setInterval(() => {
        // cycle over the filtered list
        setIndex((i) => (i + 1) % (itemsToShow.length || 1));
      }, AUTO_PLAY_MS);
    }

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [itemsToShow.length, paused]);

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

  // detect and prefer landscape images for the carousel
  useEffect(() => {
    let cancelled = false;
    async function detect() {
      const results = await Promise.all(
        items.map((p) =>
          new Promise<{ p: Project; w: number; h: number }>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve({ p, w: img.naturalWidth, h: img.naturalHeight });
            img.onerror = () => resolve({ p, w: 1, h: 1 });
            img.src = p.imageUrl;
          })
        )
      );

      if (cancelled) return;
      const landscapes = results.filter((r) => r.w >= r.h).map((r) => r.p);
      if (landscapes.length) setItemsToShow(landscapes);
      else setItemsToShow(items);
    }

    detect();
    return () => {
      cancelled = true;
    };
  }, [items]);

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

  return (
    <section
      aria-label="Featured projects carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative w-full max-w-6xl mx-auto px-4 mt-4"
      ref={containerRef}
    >
      <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-semibold dark:text-white">Highlights</h3>
            <p className="text-sm text-neutral-500 dark:text-white">Browse highlighted projects — clicking opens the demo (or code).</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous project"
              onClick={() => setIndex((i) => (i - 1 + (itemsToShow.length || 1)) % (itemsToShow.length || 1))}
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              aria-label="Next project"
              onClick={() => setIndex((i) => (i + 1) % (itemsToShow.length || 1))}
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative w-full">
          <div className="min-h-[320px] h-[360px] md:h-[520px] w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative cursor-pointer" onClick={() => handleClickProject(itemsToShow[index])}>
            <AnimatePresence mode="wait">
              <motion.div
                key={(itemsToShow[index] && itemsToShow[index].title) || 'slide'}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <Image src={itemsToShow[index].imageUrl} alt={itemsToShow[index].title} fill unoptimized={typeof itemsToShow[index].imageUrl === 'string' && itemsToShow[index].imageUrl.startsWith('http')} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-3 left-3 right-3 md:left-6 md:right-6 text-white">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-lg font-bold drop-shadow">{itemsToShow[index].title}</h4>
                <div className="flex items-center gap-2 text-sm">
                  {itemsToShow[index].demoUrl ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 rounded text-white text-xs cursor-pointer">Live Demo <ExternalLink size={12} /></span>
                  ) : itemsToShow[index].repoUrl ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-800/60 rounded text-white text-xs cursor-pointer">Code <Github size={12} /></span>
                  ) : null}
                </div>
              </div>

              <p className="mt-2 text-sm text-white/90 line-clamp-2">{itemsToShow[index].description}</p>
              {/* Accessible status for screen readers */}
              <div className="sr-only" aria-live="polite">{itemsToShow[index].title} — {itemsToShow[index].description}</div>
            </div>
          </div>

          {/* The small project list has been removed — the carousel now displays only the big looping slide */}
        </div>

          <div className="mt-4 flex items-center justify-center gap-2">
          {itemsToShow.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

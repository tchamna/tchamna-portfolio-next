import Link from "next/link";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="portfolio-hero mx-auto max-w-4xl px-4 pb-6 pt-24 text-center sm:pb-8 sm:pt-24">
      <div className="hero-status hidden dark:inline-flex">AI tools at NJ Sharing Network</div>
      <p className="hero-eyebrow mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
        AI Engineer &amp; Data Scientist
      </p>
      <h1 className="text-[clamp(1.5rem,8vw,2.25rem)] font-bold tracking-tight sm:text-5xl">{profile.hero.heading.replace(/PhD$/, "")}<span>PhD</span></h1>
      <p className="dark:hidden mt-2 text-[clamp(0.6875rem,3vw,0.875rem)] leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">LangGraph · MCP for under-resourced languages</p>
      <p className="hero-tagline hidden dark:block">I build <strong>LangGraph agents</strong>, <strong>MCP tools for under-resourced languages</strong>, and <strong>clinical workflow tools</strong>.</p>
      <div className="hero-actions mt-4 flex flex-wrap justify-center gap-3 text-sm font-semibold">
        <Link href="#projects" className="rounded-lg bg-blue-700 px-4 py-2.5 text-white hover:bg-blue-800">
          View projects
        </Link>
        <a href="/resume.pdf" download="Rodrigue-Tchamna-Resume.pdf" className="rounded-lg border border-neutral-300 px-4 py-2.5 hover:text-blue-700 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100 dark:hover:text-blue-300">
          Download résumé
        </a>
      </div>
    </section>
  );
}

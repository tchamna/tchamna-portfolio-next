import Link from "next/link";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-8 pt-28 text-center sm:pb-10 sm:pt-28">
      <p className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
        AI Engineer &amp; Data Scientist
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{profile.hero.heading}</h1>
      <p className="mt-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">
        AI tools at NJ Sharing Network
      </p>
      <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-neutral-700 dark:text-neutral-300">
        I build LangGraph agents, MCP tools for under-resourced languages, and clinical workflow tools.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
        <Link href="#projects" className="rounded-lg bg-blue-700 px-4 py-2.5 text-white hover:bg-blue-800">
          View projects
        </Link>
        <a href="/resume.pdf" download="Rodrigue-Tchamna-Resume.pdf" className="rounded-lg border border-neutral-300 px-4 py-2.5 hover:text-blue-700 dark:border-neutral-700 dark:hover:text-blue-300">
          Download résumé
        </a>
      </div>
    </section>
  );
}

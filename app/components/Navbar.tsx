"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/data";
import { isProjectCategoryPath } from "@/lib/categories";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Résumé", href: "/resume.pdf" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-x-3 px-4 py-2 sm:flex-nowrap">
        <Link href="/" className="font-bold tracking-tight">Tchamna<span className="text-blue-700 dark:text-blue-300">.</span></Link>
        <nav aria-label="Main navigation" className="order-last flex w-full justify-center gap-4 text-sm sm:order-none sm:w-auto">
          {links.map(({ label, href }) => {
            const active = pathname === href || (label === "Projects" && isProjectCategoryPath(pathname));
            const className = active ? "font-semibold text-blue-700 dark:text-blue-300" : "hover:underline";
            return href === "/resume.pdf"
              ? <a key={href} href={href} className={className}>{label}</a>
              : <Link key={href} href={href} className={className} aria-current={active ? "page" : undefined}>{label}</Link>;
          })}
        </nav>
        <div className="flex items-center gap-3">
          <a href={profile.socials.github} aria-label="GitHub" className="hover:text-blue-700 dark:hover:text-blue-300"><Github size={18} /></a>
          <a href={profile.socials.linkedin} aria-label="LinkedIn" className="hover:text-blue-700 dark:hover:text-blue-300"><Linkedin size={18} /></a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

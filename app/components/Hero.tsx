"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Youtube, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-4 sm:pb-12 md:pt-40 md:pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.socials.email}`}
              className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-white bg-blue-600/90 hover:bg-blue-700 rounded-full transition-colors gap-2"
              aria-label="Email Rodrigue Tchamna"
            >
              <Mail size={14} />
              Available for hire
            </a>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-3 text-neutral-900 dark:text-[#ffffff] drop-shadow-sm">
              {profile.hero.heading}
            </h1>

            <div className="mb-4 text-sm text-gray-500 dark:text-yellow-300">
              {/* <div className="font-semibold">{profile.heroMeta?.location}</div> */}
              <div className="mt-1 font-bold">{profile.heroMeta?.targetRoles}</div>
            </div>

            <p className="hero-subheading text-lg md:text-xl text-neutral-900 dark:text-[#ffffff] mb-6 leading-relaxed font-medium">
              {profile.hero.subheading}
            </p>
          </motion.div>

          {/* CTA Buttons - Hidden on mobile, shown on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-800 text-white font-medium rounded-full transition-all hover:bg-neutral-800 dark:hover:bg-neutral-700 hover:scale-105 whitespace-nowrap shadow-sm"
            >
              View Projects
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-800 text-white font-medium rounded-full transition-all hover:bg-neutral-800 dark:hover:bg-neutral-700 hover:scale-105 whitespace-nowrap shadow-sm"
            >
              Core Skills
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-800 text-white font-medium rounded-full transition-all hover:bg-neutral-800 dark:hover:bg-neutral-700 hover:scale-105 whitespace-nowrap shadow-sm"
            >
              About Me
              <ArrowRight size={18} />
            </Link>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-800 text-white font-medium rounded-full transition-all hover:bg-neutral-800 dark:hover:bg-neutral-700 hover:scale-105 whitespace-nowrap shadow-sm"
              download="resume_tchamna_data_scientist.pdf"
            >
              Download Resume
            </a>
            <div className="flex items-center gap-4 px-6">
              <a
                href={profile.socials.github}
                target="_blank"
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.socials.email}`}
                className="text-neutral-500 hover:text-red-600 transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="tel:+19172080512"
                className="text-neutral-500 hover:text-green-600 transition-colors"
                aria-label="Phone"
              >
                <Phone size={24} />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                className="text-neutral-500 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={profile.socials.youtube}
                target="_blank"
                className="text-neutral-500 hover:text-red-600 transition-colors"
              >
                <Youtube size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

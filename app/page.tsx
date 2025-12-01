import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import Carousel from "./components/Carousel";
import ProjectsSection from "./components/ProjectsSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { projects, profile } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProject = projects.find((p) => p.featured) || projects[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Carousel (projects) */}
        <Carousel />

        {/* Projects section (filters + grid) moved into home */}
        <ProjectsSection />

        {/* About / Summary Section moved to /about page (kept minimal CTA here) */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 dark:text-white">About Me</h2>
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <p className="text-lg text-neutral-600 dark:text-white mb-6 leading-relaxed">
                  {profile.hero.summary}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-semibold mb-4 text-neutral-900 dark:text-white">Key Expertise</h3>
                    <ul className="space-y-3">
                      {profile.hero.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-600 dark:text-white text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 text-neutral-900 dark:text-white">Connect</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                      I'm always open to discussing new opportunities, collaborations, or just chatting about AI and tech.
                    </p>
                    <a
                      href="/about"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Read more about me &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

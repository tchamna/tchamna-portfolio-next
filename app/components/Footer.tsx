import { Github, Linkedin, Youtube, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-12 mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-neutral-500 dark:text-white">
            &copy; {new Date().getFullYear()} Tchamna. Built with Next.js & Tailwind.
          </p>
        </div>
        
        <div className="flex gap-6">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-blue-600 transition-colors"
          >
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.socials.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-red-600 transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
          <a
            href={`tel:${profile.socials.phone}`}
            className="text-neutral-500 hover:text-green-600 transition-colors"
            aria-label="Phone"
          >
            <Phone size={20} />
            <span className="sr-only">Phone</span>
          </a>
          <a
            href={profile.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-red-600 transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={20} />
            <span className="sr-only">YouTube</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

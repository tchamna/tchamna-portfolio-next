import { profile } from "@/lib/data";

const experience = [
  { date: "2026–Present", title: "NJ Sharing Network", text: "AI and data science for clinical review and transplant workflows." },
  { date: "2022–2025", title: "EOS Energy Enterprises", text: "Battery performance models and automated field-data pipelines." },
  { date: "2014", title: "PhD, Mechanical Engineering", text: "Gyeongsang National University." },
];

const linkStyle = "font-medium text-blue-700 hover:underline dark:text-blue-300";

export default function PortfolioDetails() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 pb-8">
      <section aria-labelledby="experience-title">
        <h2 id="experience-title" className="mb-3 text-2xl font-bold">Experience</h2>
        <ol className="border-l border-neutral-200 pl-4 dark:border-neutral-800">
          {experience.map(({ date, title, text }) => (
            <li key={title} className="py-2">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">{date}</p>
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="writing-title">
        <h2 id="writing-title" className="mb-3 text-2xl font-bold">Writing &amp; videos</h2>
        <ul className="space-y-2 text-sm">
          <li><a className={linkStyle} href="https://www.linkedin.com/pulse/llm-education-pause-inspect-follow-ai-agents-every-tchamna-phd-hzepe">LLM Education: follow an AI agent step by step</a></li>
          <li><a className={linkStyle} href={profile.socials.youtube}>Resulam on YouTube</a></li>
        </ul>
      </section>
      <section aria-labelledby="contact-title" className="border-t border-neutral-200 pt-5 dark:border-neutral-800">
        <h2 id="contact-title" className="mb-3 text-2xl font-bold">Contact</h2>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a className={linkStyle} href={`mailto:${profile.socials.email}`}>Email</a>
          <a className={linkStyle} href={profile.socials.linkedin}>LinkedIn</a>
        </div>
      </section>
    </div>
  );
}

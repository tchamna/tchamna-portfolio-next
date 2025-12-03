import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { profile } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 dark:text-white">About Me</h1>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <article className="prose lg:prose-lg dark:prose-invert">
                <p className="text-lg mb-4">
                  I'm Shck (Rodrigue) Tchamna, PhD — a pragmatic Data Scientist and AI Engineer who builds production-ready machine learning systems, scalable ETL pipelines, and multilingual NLP solutions. I focus on reliability, reproducibility, and operational readiness when taking models into production.
                </p>

                <h3>Core Expertise</h3>
                <ul>
                  <li><strong>Production ML & MLOps:</strong> model deployment, monitoring, CI/CD, and robust inference pipelines.</li>
                  <li><strong>Natural Language Processing:</strong> multilingual modeling, TTS pipelines, tokenization, and evaluation.</li>
                  <li><strong>Computer Vision:</strong> end-to-end CV solutions and cloud deployments for real-time inference.</li>
                  <li><strong>Data Engineering:</strong> scalable ETL, feature engineering, partitioned storage, and data validation.</li>
                </ul>

                <p>
                  I bring a research-driven mindset to production problems and enjoy turning prototypes into maintainable systems. If you'd like to collaborate or discuss opportunities, reach out via email: <a href={`mailto:${profile.socials.email}`} className="text-blue-600 hover:underline">{profile.socials.email}</a>.
                </p>
              </article>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

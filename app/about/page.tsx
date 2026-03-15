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
                  I&apos;m Shck (Rodrigue) Tchamna, PhD, an interdisciplinary educator, AI engineer, and data scientist with a background in Mechanical and Aerospace Engineering and more than 10 years of experience building data-driven systems for real-world problems.
                </p>

                <p>
                  My work spans automated data pipelines, advanced analytics, predictive modeling, multilingual AI, and applied machine learning. I enjoy turning complex ideas into practical systems that are reliable, useful, and grounded in real user needs.
                </p>

                <p>
                  As an educator, I especially enjoy teaching mathematics, physics, and technology in a practical way, connecting theory to real problems, real tools, and real decisions rather than treating those subjects as abstract ideas alone.
                </p>

                <h3>Core Expertise</h3>
                <ul>
                  <li><strong>AI Engineering and Applied ML:</strong> predictive models, machine learning systems, and production-ready AI applications.</li>
                  <li><strong>Natural Language Processing:</strong> multilingual modeling, text-to-speech pipelines, tokenization, and evaluation for low-resource languages.</li>
                  <li><strong>Data Engineering and Analytics:</strong> automated pipelines, scalable ETL, validation, feature engineering, and decision-ready analytics.</li>
                  <li><strong>Computer Vision and Cloud Delivery:</strong> end-to-end CV systems, containerized deployments, and operational web apps.</li>
                </ul>

                <p>
                  Beyond technical development, I care deeply about mentoring students and professionals, helping them build products, conduct research, and develop confidence through authentic problem-solving. I am especially drawn to mission-driven work that improves people&apos;s lives, creates meaningful social impact, and brings compassion into the way technology is designed and applied. That commitment also shapes my work on under-resourced languages and more inclusive access to knowledge.
                </p>

                <p>
                  If you&apos;d like to collaborate or discuss opportunities, reach out via email: <a href={`mailto:${profile.socials.email}`} className="text-blue-600 hover:underline">{profile.socials.email}</a>.
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

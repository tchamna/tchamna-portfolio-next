import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { profile } from "@/lib/data";
import Link from "next/link";

export default function SkillsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <header className="mb-6">
              <h1 className="text-4xl font-extrabold dark:text-white"> Skills & Education</h1>
              {/* <p className="mt-2 text-neutral-600 dark:text-neutral-400">Quick reference: technical skills, platforms, and highlights.</p> */}
            </header>

            <section className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/25 p-6 mb-8" aria-labelledby="applied-skills-title">
              <p className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-300 mb-2">Skills in practice</p>
              <h2 id="applied-skills-title" className="text-xl font-bold mb-3">LLM Education — an end-to-end AI engineering case study</h2>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 mb-4">See how I connect agent orchestration, asynchronous APIs, interactive interfaces, access control, testing and cloud delivery in one deployed application.</p>
              <ul className="flex flex-wrap gap-2 mb-4">{["LangGraph", "MCP", "FastAPI", "Server-Sent Events", "Google OAuth / PKCE", "Azure", "GitHub Actions"].map(skill => <li key={skill} className="rounded-full px-3 py-1 text-xs font-medium bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">{skill}</li>)}</ul>
              <Link href="/projects/llm-education#skills-title" className="text-blue-600 dark:text-blue-300 font-semibold text-sm hover:underline">View the full stack, implementation evidence and transferable skills →</Link>
            </section>
            <div className="grid md:grid-cols-3 gap-6">
              <main className="md:col-span-2 space-y-6">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Core Technical Skills</h3>

                  <div className="overflow-x-auto">
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-4">
                      
                      <table className="min-w-full border-separate border-spacing-0 rounded-xl overflow-hidden">
  <thead>
    <tr className="bg-neutral-100 dark:bg-neutral-800/60">
      <th className="px-5 py-3 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-700">
        Category
      </th>
      <th className="px-5 py-3 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-700">
        Skills
      </th>
    </tr>
  </thead>

  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">

    {/* 1. AI / Machine Learning */}
    <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
      <td className="px-5 py-4 align-top text-sm font-medium text-neutral-800 dark:text-neutral-200">
        AI & Machine Learning
      </td>
      <td className="px-5 py-4 text-sm text-neutral-700 dark:text-neutral-200">
        <div className="flex flex-wrap gap-2">
        <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Agentic AI</span>
        <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">RAG</span>
        <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Vector Databases</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">LLMs (OpenAI)</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">LLM Fine-Tuning</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Hugging Face</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">LangChain</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Multimodal AI</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">FAISS</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Transformers</span>

          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">PyTorch</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">TensorFlow</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Scikit-learn</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Flan-T5</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Cross-Encoders</span>

        </div>
      </td>
    </tr>

    {/* 2. Data Engineering / Cloud */}
    <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
      <td className="px-5 py-4 align-top text-sm font-medium text-neutral-800 dark:text-neutral-200">
        Data Engineering & Cloud
      </td>
      <td className="px-5 py-4 text-sm text-neutral-700 dark:text-neutral-200">
        <div className="flex flex-wrap gap-2">
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">ETL</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Airflow</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">AWS S3</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Azure App Service</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Azure Blob Storage</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Snowflake</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Spark</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Docker</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">GitHub Actions</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Terraform</span>
        </div>
      </td>
    </tr>

    {/* 3. Software Development */}
    <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
      <td className="px-5 py-4 align-top text-sm font-medium text-neutral-800 dark:text-neutral-200">
        Software Development
      </td>
      <td className="px-5 py-4 text-sm text-neutral-700 dark:text-neutral-200">
        <div className="flex flex-wrap gap-2">
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Python (Advanced)</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">FastAPI</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Streamlit</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">React</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Flask</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">SQL</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Pandas</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">NumPy</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Git</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Bash</span>
        </div>
      </td>
    </tr>

    {/* 4. Tools / Visualization */}
    <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
      <td className="px-5 py-4 align-top text-sm font-medium text-neutral-800 dark:text-neutral-200">
        Data Visualization
      </td>
      <td className="px-5 py-4 text-sm text-neutral-700 dark:text-neutral-200">
        <div className="flex flex-wrap gap-2">
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Tableau</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Power BI</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Plotly</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Dash</span>
          <span className="m-1 px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-full text-neutral-700 dark:text-neutral-200">Matplotlib</span>
        </div>
      </td>
    </tr>

  </tbody>
</table>

                   
                   
                    </div>
                  </div>
                </div>

                
              </main>

              <aside className="md:col-span-1">
                <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg sticky top-28">
                  <h4 className="font-semibold mb-3 dark:text-white">Quick Facts</h4>
                 <ul className="space-y-3 text-sm text-neutral-700 dark:text-neutral-200">
  <li>
    <strong>Experience:</strong><br />
    10+ years in AI & Data Science
  </li>

  <li>
    <strong>Postdoc:</strong> Data Science
  </li>

  <li>
    <strong>PhD:</strong> Mechanical Engineering
  </li>

  <li>
    <strong>Master’s:</strong> Applied Physics
  </li>

  <li>
    <strong>Projects Deployed:</strong><br />
    100+ ML projects (Azure, AWS, GCP)
  </li>

  <li>
    <strong>AI Deployment:</strong><br />
    10+ Enterprise-Grade Agentic AI & RAG Systems
  </li>

  <li>
    <strong>Domains:</strong><br />
    Enterprise Automation, Energy, Education, Health Care, Language Tech
  </li>
</ul>


                  <a href={`mailto:${profile.socials.email}`} className="mt-4 inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Contact (Email)</a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

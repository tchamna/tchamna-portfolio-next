import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { profile } from "@/lib/data";

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
        <span className="skill-chip">Agentic AI</span>
        <span className="skill-chip">RAG</span>
        <span className="skill-chip">Vector Databases</span>
          <span className="skill-chip">LLMs (OpenAI)</span>
          <span className="skill-chip">LLM Fine-Tuning</span>
          <span className="skill-chip">Hugging Face</span>
          <span className="skill-chip">LangChain</span>
          <span className="skill-chip"> Multimodal AI</span>
          <span className="skill-chip">FAISS</span>
          <span className="skill-chip">Transformers</span>
          
          <span className="skill-chip">PyTorch</span>
          <span className="skill-chip">TensorFlow</span>
          <span className="skill-chip">Scikit-learn</span>
          <span className="skill-chip">Flan-T5</span>
          <span className="skill-chip">Cross-Encoders</span>
          
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
          <span className="skill-chip">ETL</span>
          <span className="skill-chip">Airflow</span>
          <span className="skill-chip">AWS S3</span>
          <span className="skill-chip">Azure App Service</span>
          <span className="skill-chip">Azure Blob Storage</span>
          <span className="skill-chip">Snowflake</span>
          <span className="skill-chip">Spark</span>
          <span className="skill-chip">Docker</span>
          <span className="skill-chip">GitHub Actions</span>
          <span className="skill-chip">Terraform</span>
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
          <span className="skill-chip">Python (Advanced)</span>
          <span className="skill-chip">FastAPI</span>
          <span className="skill-chip">Streamlit</span>
          <span className="skill-chip">React</span>
          <span className="skill-chip">Flask</span>
          <span className="skill-chip">SQL</span>
          <span className="skill-chip">Pandas</span>
          <span className="skill-chip">NumPy</span>
          <span className="skill-chip">Git</span>
          <span className="skill-chip">Bash</span>
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
          <span className="skill-chip">Tableau</span>
          <span className="skill-chip">Power BI</span>
          <span className="skill-chip">Plotly</span>
          <span className="skill-chip">Dash</span>
          <span className="skill-chip">Matplotlib</span>
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

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Check, Mail } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { profile } from "@/lib/data";
import { llmEducationCapabilities, llmEducationSkills, llmEducationDecisions } from "@/lib/llm-education";

export const metadata: Metadata = {
  title: "LLM Education | AI Engineering Case Study — Tchamna Shck",
  description: "A deployed AI learning platform and observable LangGraph agent: real tool calling, FastAPI, MCP, streamed state, Google authentication, usage accounting and Azure CI/CD. Explore the architecture, implementation and transferable skills.",
  alternates: { canonical: "https://portfolio.tchamna.com/projects/llm-education" },
  openGraph: { title: "LLM Education — From model concepts to observable AI agents", description: "An end-to-end AI engineering case study by Tchamna Shck: product experience, orchestration, APIs, security, testing and cloud delivery.", url: "https://portfolio.tchamna.com/projects/llm-education", type: "website" },
};

const demo = "https://llm-education-tchamna.azurewebsites.net/#agent";
const panel = "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900";

export default function LlmEducationCaseStudy() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Navbar />
      <main className="pt-28 sm:pt-32 pb-6">
        <div className="container max-w-6xl mx-auto px-5 sm:px-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-blue-600 mb-9"><ArrowLeft size={16} /> All projects</Link>
          <header className="max-w-4xl mb-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-300 mb-5">AI engineering · Full-stack product · Cloud delivery</p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-5">LLM Education</h1>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-700 dark:text-neutral-200 leading-tight mb-5">Learn the model. Follow the agent.<br className="hidden sm:block" /> See the engineering behind the answer.</p>
            <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">I built an interactive learning platform that makes language-model concepts tangible and real agent execution observable—from a request and structured tool calls to merged evidence, a final answer and estimated operating cost.</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700">Try the live Agent <ArrowUpRight size={18} /></a>
              <a href={`mailto:${profile.socials.email}?subject=Let%27s%20discuss%20your%20AI%20engineering%20work`} className="inline-flex items-center gap-2 px-3 py-3 text-blue-600 dark:text-blue-300 font-semibold"><Mail size={18} /> Discuss an opportunity</a>
            </div>
          </header>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[["4", "Interactive learning modules"], ["3 + MCP", "Built-in tools + owner integration"], ["103", "Automated checks at publication"], ["Live", "Publicly hosted application"]].map(([value, label]) => <div key={label} className={`${panel} p-5`}><p className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-1">{value}</p><p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">{label}</p></div>)}
          </div>
          <figure className={`${panel} overflow-hidden mb-16`}>
            <Image src="/images/llm-education.svg" alt="LLM Education architecture illustration showing a request, LLM planner, parallel tools, code-based state review and LLM synthesis" width={1600} height={900} unoptimized priority className="w-full h-auto" />
            <figcaption className="px-5 py-4 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">Architecture overview. One configured LLM serves planning and synthesis roles; review merges state in code. The live app animates real execution events, not private model reasoning.</figcaption>
          </figure>

          <section className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16" aria-labelledby="scope-title">
            <div><p className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-300 mb-3">The product</p><h2 id="scope-title" className="text-3xl font-bold tracking-tight">From concepts<br />to working systems.</h2></div>
            <div className="space-y-5 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <p>The problem was visibility: a chatbot answer hides the tools, data flow, failure modes and costs behind it. This platform lets a user inspect each stage while also learning the foundations of token prediction and instruction tuning.</p>
              <p>My implementation spans the browser experience, model integration, graph orchestration, backend APIs, access control, automated checks and Azure deployment. The public Agent needs no Python, Ollama or API key installation from visitors.</p>
              <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-950/30 p-5 text-sm"><strong className="text-neutral-900 dark:text-white">Clear learning scope.</strong> The training lessons use small executable browser models and a transformer concept view. The Agent module calls a real hosted LLM. The offline HTML supports the browser lessons; real Agent execution uses a hosted or local backend.</div>
            </div>
          </section>

          <section className="mb-16" aria-labelledby="capabilities-title">
            <div className="mb-7"><p className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-300 mb-3">Capabilities</p><h2 id="capabilities-title" className="text-3xl font-bold tracking-tight">What the application does</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{llmEducationCapabilities.map((item, index) => <article key={item.title} className={`${panel} p-6`}><span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-xs font-bold mb-5">0{index + 1}</span><h3 className="font-bold text-lg leading-snug mb-3">{item.title}</h3><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{item.detail}</p></article>)}</div>
          </section>

          <section className="mb-16" aria-labelledby="decisions-title">
            <p className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-300 mb-3">Engineering judgment</p><h2 id="decisions-title" className="text-3xl font-bold tracking-tight mb-7">Decisions that matter beyond the demo</h2>
            <div className="space-y-4">{llmEducationDecisions.map((item, index) => <article key={item.problem} className={`${panel} p-6 sm:p-7 grid md:grid-cols-[0.9fr_1.5fr] gap-5`}><div><p className="text-xs text-blue-600 dark:text-blue-300 font-bold mb-2">0{index + 1} / PROBLEM</p><h3 className="font-semibold text-lg leading-snug">{item.problem}</h3></div><div><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 mb-3">{item.decision}</p><p className="text-sm leading-relaxed font-medium flex gap-2"><Check size={17} aria-hidden="true" className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />{item.result}</p></div></article>)}</div>
          </section>

          <section className="mb-16" aria-labelledby="skills-title">
            <p className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-300 mb-3">Technical stack & transferable skills</p><h2 id="skills-title" className="text-3xl font-bold tracking-tight mb-3">Tools are the stack. Delivery is the skill.</h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed mb-7">Each area below connects a technology used in this project to a capability that transfers to other AI products, backend services and workflow automation systems.</p>
            <div className="grid md:grid-cols-2 gap-4">{llmEducationSkills.map(group => <article key={group.title} className={`${panel} p-6`}><h3 className="font-bold text-lg mb-4">{group.title}</h3><ul aria-label={`${group.title} technology stack`} className="flex flex-wrap gap-2 mb-5">{group.stack.map(name => <li key={name} className="rounded-md bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1.5 text-xs font-medium">{name}</li>)}</ul><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 mb-4">{group.skills}</p><p className="text-sm leading-relaxed border-t border-neutral-200 dark:border-neutral-800 pt-4"><span className="font-semibold text-emerald-700 dark:text-emerald-400">Transferable value: </span>{group.application}</p></article>)}</div>
          </section>

          <section className={`${panel} p-7 sm:p-10 flex flex-col md:flex-row gap-7 md:items-center md:justify-between`}>
            <div className="max-w-2xl"><p className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-300 mb-3">See the work</p><h2 className="text-2xl font-bold mb-3">Explore the product. Follow the agent.</h2><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">Relevant to AI engineering, applied GenAI, Python backend and full-stack AI roles. Try “Can I buy 6 solar kits for $2,400?” to see a database lookup feed a calculation. Language MCP tools require the verified owner account; public research, database and calculator tools remain available.</p></div>
            <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold whitespace-nowrap hover:bg-blue-700">Open live demo <ArrowUpRight size={18} /></a>
          </section>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-5">Implementation and automated-check count verified November 10, 2026. Estimates and educational visualizations are labelled in the application.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

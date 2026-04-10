export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  imageUrl: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "RAG AI Foundations Demo",
    description:
      "Implemented an end-to-end RAG system: data ingestion, chunking, embeddings, vector store, and evaluation (faithfulness/answer relevance) with prompt variants.",
    tags: ["LLM", "RAG", "Vector DB", "LangChain"],
    category: ["nlp"],
    repoUrl: "https://github.com/tchamna/rag_ai-foundations-demo",
    demoUrl: "https://rag.tchamna.com/",
    featured: true,
    imageUrl: "/images/demo_rag_20251215.png",
  },
  {
    title: "Document Intelligence Platform",
    description:
      "Document AI web app for extracting, searching, and managing structured information from documents, with an end-to-end pipeline and production UI.",
    tags: ["Document AI", "NLP", "RAG", "Web App"],
    category: ["fullstack", "mlops"],
    repoUrl: "https://github.com/tchamna/document-intelligence-platform",
    demoUrl: "http://idp.tchamna.com/ui",
    imageUrl: "/images/demo_document_intelligence_platform_20251216.png",
  },
  {
    title: "African Object Recognition",
    description:
      "A computer vision application deployed on Azure designed to recognize and classify distinct African objects, artifacts, and cultural items. Demonstrates end-to-end model deployment and real-time inference capabilities.",
    tags: ["Computer Vision", "Azure", "Deep Learning", "Web App"],
    category: ["cv", "fullstack"],
    repoUrl: null,
    demoUrl: "https://african-objects-recognition.tchamna.com/",
    imageUrl: "/images/demo_african_object_recognition2.png",
  },
  {
    title: "African Text-to-Speech",
    description:
      "Built a multilingual TTS pipeline for African languages: curated phoneme/tokenization, trained/fine-tuned neural TTS models, and evaluated naturalness/intelligibility.",
    tags: ["NLP", "Speech Synthesis", "Python", "Deep Learning"],
    category: ["nlp"],
    repoUrl: "https://github.com/tchamna/african-text-to-speech",
    demoUrl:
      "https://african-text-to-speech-v2-dacth3aedpeyfwbb.canadacentral-01.azurewebsites.net/",
    imageUrl: "/images/demo_africanvoice.png",
  },
  {
    title: "NuFi Conjugator",
    description:
      "Full-stack web app for searching and generating NuFi verb conjugations across multiple tenses, with automatic translations, downloadable Word output, and integrated linguistic reference content based on a published grammar resource.",
    tags: ["Full Stack", "Web App", "NLP", "Linguistics"],
    category: ["fullstack"],
    repoUrl: null,
    demoUrl: "https://nufi-conjugator.tchamna.com/",
    imageUrl: "/images/demo_nufi_conjugator.png",
  },
  {
    title: "Resulam Video Generator",
    description:
      "Designed a modular text-to-video pipeline: script generation, TTS, frame generation, shot assembly, and post-processing (ffmpeg), with reproducible configs.",
    tags: ["Generative AI", "Multimodal", "Video Processing", "Python"],
    category: ["cv", "fullstack"],
    repoUrl: "https://github.com/tchamna/resulam-video-generator-pipeline",
    demoUrl: null,
    imageUrl: "/images/demo_resulam_video_generation_pipeline.jpg",
  },
  {
    title: "Financial Trading ETL",
    description:
      "Built a production-ready ETL for market data: ingestion, validation, feature generation (lags/indicators), partitioned storage, and monitoring.",
    tags: ["Data Engineering", "ETL", "Time Series", "Python"],
    category: [],
    repoUrl: "https://github.com/tchamna/financial-trading-etl-pipeline",
    demoUrl: null,
    imageUrl: "/images/demo_etl_pipeline.png",
  },
  {
    title: "Organ Donor Analytics Dashboard",
    description:
      "End-to-end analytics platform for organ donation operations: synthetic data generation, medallion-architecture ETL pipeline, and interactive multi-page dashboards covering daily operations, hospital benchmarking, organ type mix, blood type analysis, rejection root cause, and data quality.",
    tags: ["Data Engineering", "Dash", "Plotly", "ETL", "Python"],
    category: ["dashboard"],
    repoUrl: null,
    demoUrl: "https://organ-donor-analytics.tchamna.com/",
    imageUrl: "/images/demo_organ_donor_analytics.png",
  },
  {
    title: "Document Processing Pipeline",
    description:
      "Web-based document processing platform for batch editing Word documents: drag-and-drop upload, CSV-driven find-and-replace dictionaries, auto-repair of corrupted .docx files, and configurable formatting fixes (punctuation, guillemets, capitalization, smart formatting). Originals are preserved.",
    tags: ["Document Processing", "NLP", "Python", "Web App"],
    category: ["fullstack"],
    repoUrl: null,
    demoUrl: "https://document-processing.tchamna.com/",
    imageUrl: "/images/demo_document_processing.png",
  },
  {
    title: "Self-Driving Taxi Dispatch Simulator",
    description:
      "Interactive dispatch simulator for an electric self-driving taxi fleet with best-slot routing, pre-scheduled trips, live timetable visualization, and algorithm comparisons for dispatch strategies.",
    tags: ["Web App", "Simulation", "Optimization", "Dispatch"],
    category: ["fullstack"],
    repoUrl: null,
    demoUrl: "https://self-driving-taxi-apbzbyh7h4g9aaf3.canadacentral-01.azurewebsites.net/",
    imageUrl: "/images/demo_self_driving_taxi.png",
  },
  {
    title: "Resulam Sales Analytics Platform",
    description:
      "Interactive multi-page dashboard for analyzing Amazon KDP book sales and royalties, with filtering, exports, and live exchange-rate integration.",
    tags: ["Python", "Dash", "Plotly", "Pandas"],
    category: ["dashboard"],
    repoUrl: "https://github.com/tchamna/resulam_royalties",
    demoUrl: "https://africanlanguagelibrary.tchamna.com/",
    imageUrl: "/images/demo_resulam_royalties.png",
  },
];

export const profile = {
  name: "Tchamna",
  title: "Data Scientist & AI Engineer",
  avatarUrl: "https://avatars.githubusercontent.com/u/6007035?v=4",
  socials: {
    github: "https://github.com/tchamna",
    linkedin: "https://www.linkedin.com/in/rodrigue-shck-tchamna-phd-b1742411/",
    youtube: "https://www.youtube.com/@Resulam",
    email: "tchamna@gmail.com",
    phone: "+19172080512",
  },
  bio:
    "Interdisciplinary educator, AI engineer, and data scientist with a PhD in Mechanical and Aerospace Engineering and 10+ years of experience building data-driven systems, predictive models, and AI solutions for real-world problems.",
  hero: {
    heading: "Shck Tchamna, PhD",
    subheading:
      "AI Engineer, Data Scientist, and interdisciplinary educator building production-ready ML systems, scalable data pipelines, and multilingual AI tools for real-world impact.",
    points: [
      "10+ years building automated data pipelines, advanced analytics, and predictive models across research and production settings",
      "Experienced across machine learning, NLP, computer vision, MLOps, and project-based STEM education",
      "Founder and mission-driven leader advancing low-resource language revitalization and inclusive access to knowledge",
    ],
    summary:
      "I am an interdisciplinary educator, AI engineer, and data scientist with a PhD in Mechanical and Aerospace Engineering and over a decade of experience building data-driven solutions. My work spans automated pipelines, advanced analytics, predictive modeling, multilingual AI, and mission-driven products that expand access to knowledge for under-resourced communities. I am especially motivated by work that improves people's lives, creates measurable social impact, and brings compassion into the design of technology.",
  },
  heroMeta: {
    location: "Based in New Jersey, USA - Open to physical, remote & hybrid roles",
    targetRoles:
      "Target roles: AI Engineer, ML Engineer, MLOps Engineer, Data Engineer, Math/Physics/Technology Teacher",
  },
};

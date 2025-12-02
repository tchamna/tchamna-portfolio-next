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
        title: "African Object Recognition",
        description: "A computer vision application deployed on Azure designed to recognize and classify distinct African objects, artifacts, and cultural items. Demonstrates end-to-end model deployment and real-time inference capabilities.",
        tags: ["Computer Vision", "Azure", "Deep Learning", "Web App"],
        category: ["cv", "mlops"],
        repoUrl: null, // Private repo
        demoUrl: "https://african-objects-recognition-app-f7ffeqatg8ecd5hf.canadacentral-01.azurewebsites.net/",
        imageUrl: "/images/demo_african_object_recognition2.png",
    },
    {
        title: "African Text-to-Speech",
        description: "Built a multilingual TTS pipeline for African languages: curated phoneme/tokenization, trained/fine-tuned neural TTS models, and evaluated naturalness/intelligibility.",
        tags: ["NLP", "Speech Synthesis", "Python", "Deep Learning"],
        category: ["nlp"],
        repoUrl: "https://github.com/tchamna/african-text-to-speech",
        demoUrl: "https://african-text-to-speech-ehajh7daazdfhzft.canadacentral-01.azurewebsites.net/",
        imageUrl: "/images/demo_africanvoice.png"
    },
    {
        title: "RAG AI Foundations Demo",
        description: "Implemented an end-to-end RAG system: data ingestion, chunking, embeddings, vector store, and evaluation (faithfulness/answer relevance) with prompt variants.",
        tags: ["LLM", "RAG", "Vector DB", "LangChain"],
        category: ["nlp"],
        repoUrl: "https://github.com/tchamna/rag_ai-foundations-demo",
        demoUrl: null,
        imageUrl: "/images/demo_rag.png"
    },
    {
        title: "Resulam Video Generator",
        description: "Designed a modular text-to-video pipeline: script generation, TTS, frame generation, shot assembly, and post-processing (ffmpeg), with reproducible configs.",
        tags: ["Generative AI", "Multimodal", "Video Processing", "Python"],
        category: ["cv", "nlp"],
        repoUrl: "https://github.com/tchamna/resulam-video-generator-pipeline",
        demoUrl: null,
        
        imageUrl: "/images/demo_resulam_video_generation_pipeline.jpg"
    },
    {
        title: "Financial Trading ETL",
        description: "Built a production-ready ETL for market data: ingestion, validation, feature generation (lags/indicators), partitioned storage, and monitoring.",
        tags: ["Data Engineering", "ETL", "Time Series", "Python"],
        category: ["mlops"],
        repoUrl: "https://github.com/tchamna/financial-trading-etl-pipeline",
        demoUrl: null,
        imageUrl: "/images/demo_etl_pipeline.png"
    },
    {
        title: "Bike Rental Prediction",
        description: "Delivered a clear ML case study: feature engineering, XGBoost tuning, cross-validation, error analysis, and SHAP-based interpretability for demand forecasting.",
        tags: ["Classical ML", "XGBoost", "Regression", "Data Analysis"],
        category: ["classical"],
        repoUrl: "https://github.com/tchamna/XGBOOST-Bike-Rental-Prediction",
        demoUrl: null,
        imageUrl: "/images/demo_bike.png"
    }
];

export const profile = {
  name: "Tchamna",
  title: "Data Scientist & AI Engineer",
  avatarUrl: "https://avatars.githubusercontent.com/u/6007035?v=4",
  socials: {
    github: "https://github.com/tchamna",
    linkedin: "https://www.linkedin.com/in/rodrigue-tchamna",
    youtube: "https://www.youtube.com/@Resulam",
    email: "tchamna@gmail.com",
    phone: "+19172080512"
  },
  bio: "Specializing in Machine Learning, NLP, Computer Vision, and MLOps. Building scalable AI solutions for real-world problems, with a focus on under-resourced languages and African context.",
  hero: {
    heading: "Shck Tchamna, PhD",
    subheading: "AI Engineer & Data Scientist — building cloud-first, production-ready ML systems, scalable ETL pipelines, and multilingual NLP solutions at scale.",
    points: [
      "10+ years building cloud-based data workflows, ETL, and ML systems for high-volume sensor data",
      "Expertise: Python, AWS, Kubernetes, microservices, distributed data processing",
      "PhD-level modeling for autonomous driving, ADAS analytics and real-time sensor environments"
    ],
    summary: "PhD-trained Data Scientist & Computational Linguist skilled in multilingual NLP, machine learning, and scalable data pipelines. Author of 80+ multilingual books and developer of an automated video content generation platform. Passionate about social justice and preserving endangered languages."
  },
  // Additional editable fields for the hero section
  heroMeta: {
    location: "Based in New Jersey, USA · Open to physical, remote & hybrid roles",
    targetRoles: "Target roles: AI Engineer, ML Engineer, MLOps Engineer, Data Engineer",
  }
};

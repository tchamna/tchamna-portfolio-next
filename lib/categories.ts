export type ProjectCategoryId =
  | "all"
  | "nlp"
  | "cv"
  | "fullstack"
  | "dashboard"
  | "ai-agents"
  | "fine-tuning"
  | "resulam";

export type ProjectCategorySlug =
  | "genai"
  | "computer-vision"
  | "full-stack"
  | "dashboards"
  | "ai-agents"
  | "fine-tuning"
  | "resulam";

export const projectCategories: ReadonlyArray<{
  id: ProjectCategoryId;
  label: string;
  slug: ProjectCategorySlug | null;
}> = [
  { id: "all", label: "All Projects", slug: null },
  { id: "nlp", label: "GenAI", slug: "genai" },
  { id: "cv", label: "Computer Vision", slug: "computer-vision" },
  { id: "fullstack", label: "Full Stack", slug: "full-stack" },
  { id: "dashboard", label: "Dashboards", slug: "dashboards" },
  { id: "ai-agents", label: "AI Agents", slug: "ai-agents" },
  { id: "fine-tuning", label: "Fine Tuning", slug: "fine-tuning" },
  { id: "resulam", label: "Resulam", slug: "resulam" },
];

export const projectCategorySlugs: ProjectCategorySlug[] = projectCategories
  .map((cat) => cat.slug)
  .filter((slug): slug is ProjectCategorySlug => slug !== null);

const slugToId = new Map<ProjectCategorySlug, ProjectCategoryId>(
  projectCategories
    .filter((cat) => cat.slug !== null)
    .map((cat) => [cat.slug!, cat.id])
);

const idToSlug = new Map<ProjectCategoryId, ProjectCategorySlug>(
  projectCategories
    .filter((cat) => cat.slug !== null)
    .map((cat) => [cat.id, cat.slug!])
);

export function getCategorySlug(categoryId: ProjectCategoryId): ProjectCategorySlug | null {
  if (categoryId === "all") return null;
  return idToSlug.get(categoryId) ?? null;
}

export function getCategoryIdFromSlug(slug: string): ProjectCategoryId | null {
  return slugToId.get(slug as ProjectCategorySlug) ?? null;
}

export function getCategoryPath(categoryId: ProjectCategoryId): string {
  const slug = getCategorySlug(categoryId);
  return slug ? `/${slug}` : "/";
}

export function isProjectCategoryPath(pathname: string): boolean {
  if (pathname === "/") return false;
  const slug = pathname.replace(/^\//, "");
  return slugToId.has(slug as ProjectCategorySlug);
}

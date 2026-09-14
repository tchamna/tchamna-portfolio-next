import { notFound } from "next/navigation";
import HomePage from "../components/HomePage";
import { getCategoryIdFromSlug, projectCategorySlugs } from "@/lib/categories";

export function generateStaticParams() {
  return projectCategorySlugs.map((category) => ({ category }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryId = getCategoryIdFromSlug(category);

  if (!categoryId) {
    notFound();
  }

  return <HomePage categoryId={categoryId} />;
}

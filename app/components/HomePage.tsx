import Hero from "./Hero";
import Carousel from "./Carousel";
import ProjectsSection from "./ProjectsSection";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PortfolioDetails from "./PortfolioDetails";
import type { ProjectCategoryId } from "@/lib/categories";

interface HomePageProps {
  categoryId?: ProjectCategoryId;
}

export default function HomePage({ categoryId = "all" }: HomePageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Carousel />
        <ProjectsSection initialCategoryId={categoryId} />
        <PortfolioDetails />
      </main>
      <Footer />
    </div>
  );
}

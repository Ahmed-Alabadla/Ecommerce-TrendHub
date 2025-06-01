import BrandsCarousel from "@/components/shared/BrandsCarousel";
import CategoriesSection from "@/components/shared/CategoriesSection";
import FeaturedProducts from "@/components/shared/FeaturedProducts";
import Hero from "@/components/shared/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <BrandsCarousel />
    </div>
  );
}

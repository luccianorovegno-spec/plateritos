import { AboutTeaser } from "@/components/about-teaser";
import { BrandsCarousel } from "@/components/brands-carousel";
import { CollectionsGrid } from "@/components/collections-grid";
import { FeaturesBar } from "@/components/features-bar";
import { GoogleReviewsSection } from "@/components/google-reviews";
import { HeroCarousel } from "@/components/hero-carousel";
import { NewArrivalsSection } from "@/components/new-arrivals-section";
import { TrendingSection } from "@/components/trending-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { ProductCard } from "@/components/product-card";
import { PromoSection } from "@/components/promo-section";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories, getProducts } from "@/lib/tiendanube";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(12),
    getCategories(20),
  ]);

  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader categories={categories} />

      <main className="flex-1">
        <HeroCarousel />
        <FeaturesBar />
        <NewArrivalsSection products={products} />
        <TrendingSection />
        <CollectionsGrid />
        <BrandsCarousel />

        <section className="section-padding bg-pastel-pink/40">
          <div className="content-max-width">
            <SectionHeading
              title="Productos Destacados"
              subtitle="Los mas elegidos por nuestros clientes"
            />
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <PromoSection />
        <AboutTeaser />
        <GoogleReviewsSection />
        <NewsletterSection />
      </main>

      <SiteFooter />
    </div>
  );
}

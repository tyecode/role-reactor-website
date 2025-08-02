import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FooterCTA } from "@/components/home/FooterCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900">
      <HeroSection />
      <FeaturesSection />
      <FooterCTA />
    </main>
  );
}

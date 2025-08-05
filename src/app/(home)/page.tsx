import { Hero } from "@/app/(home)/components/hero";
import { Features } from "@/app/(home)/components/features";
import { FooterCTA } from "@/app/(home)/components/footer-cta";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900">
      <Hero />
      <Features />
      <FooterCTA />
    </main>
  );
}

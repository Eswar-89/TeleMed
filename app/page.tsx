import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SymptomChecker } from "@/components/symptom-checker"
import { FeaturesSection } from "@/components/features-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <SymptomChecker />
      <FeaturesSection />
    </main>
  )
}

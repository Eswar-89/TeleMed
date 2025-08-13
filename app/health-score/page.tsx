import { Navigation } from "@/components/navigation"
import { HealthScoreHeader } from "@/components/health-score/health-score-header"
import { HealthAssessment } from "@/components/health-score/health-assessment"

export default function HealthScorePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HealthScoreHeader />
      <HealthAssessment />
    </main>
  )
}

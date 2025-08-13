"use client"

import { useState } from "react"
import { DiseasesHeader } from "@/components/diseases/diseases-header"
import { DiseaseCategories } from "@/components/diseases/disease-categories"
import { DiseasesGrid } from "@/components/diseases/diseases-grid"
import { Navigation } from "@/components/navigation"

export default function DiseasesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <DiseasesHeader />
      <DiseaseCategories selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
      <DiseasesGrid selectedCategory={selectedCategory} />
    </main>
  )
}

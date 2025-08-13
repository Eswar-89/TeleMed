"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { DoctorsHeader } from "@/components/doctors/doctors-header"
import { DoctorFilters } from "@/components/doctors/doctor-filters"
import { DoctorsGrid } from "@/components/doctors/doctors-grid"

export interface FilterState {
  searchQuery: string
  location: string
  specialties: string[]
  languages: string[]
  insurances: string[]
  distance: number[]
  rating: number[]
}

export default function DoctorsPage() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    location: "",
    specialties: [],
    languages: [],
    insurances: [],
    distance: [25],
    rating: [4],
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <DoctorsHeader filters={filters} onFiltersChange={updateFilters} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <DoctorFilters filters={filters} onFiltersChange={updateFilters} />
          </aside>
          <main className="lg:w-3/4">
            <DoctorsGrid filters={filters} />
          </main>
        </div>
      </div>
    </main>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { FilterState } from "@/app/doctors/page"

const specialties = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
]

const languages = ["Hindi", "English", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Malayalam", "Punjabi"]

const insurances = [
  "ICICI Lombard",
  "Star Health",
  "HDFC ERGO",
  "New India Assurance",
  "Oriental Insurance",
  "Bajaj Allianz",
]

interface DoctorFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: Partial<FilterState>) => void
}

export function DoctorFilters({ filters, onFiltersChange }: DoctorFiltersProps) {
  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    const newSpecialties = checked
      ? [...filters.specialties, specialty]
      : filters.specialties.filter((s) => s !== specialty)
    onFiltersChange({ specialties: newSpecialties })
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    const newLanguages = checked ? [...filters.languages, language] : filters.languages.filter((l) => l !== language)
    onFiltersChange({ languages: newLanguages })
  }

  const handleInsuranceChange = (insurance: string, checked: boolean) => {
    const newInsurances = checked
      ? [...filters.insurances, insurance]
      : filters.insurances.filter((i) => i !== insurance)
    onFiltersChange({ insurances: newInsurances })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Specialty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={filters.specialties.includes(specialty)}
                onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
              />
              <Label htmlFor={specialty} className="text-sm font-normal cursor-pointer">
                {specialty}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Distance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.distance}
              onValueChange={(value) => onFiltersChange({ distance: value })}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>1 mile</span>
              <span className="font-medium">{filters.distance[0]} miles</span>
              <span>50+ miles</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.rating}
              onValueChange={(value) => onFiltersChange({ rating: value })}
              max={5}
              min={1}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>1 star</span>
              <span className="font-medium">{filters.rating[0]}+ stars</span>
              <span>5 stars</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {languages.map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={language}
                checked={filters.languages.includes(language)}
                onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
              />
              <Label htmlFor={language} className="text-sm font-normal cursor-pointer">
                {language}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Insurance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insurances.map((insurance) => (
            <div key={insurance} className="flex items-center space-x-2">
              <Checkbox
                id={insurance}
                checked={filters.insurances.includes(insurance)}
                onCheckedChange={(checked) => handleInsuranceChange(insurance, checked as boolean)}
              />
              <Label htmlFor={insurance} className="text-sm font-normal cursor-pointer">
                {insurance}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

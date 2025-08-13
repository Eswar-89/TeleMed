"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    name: "Cardiovascular",
    count: 45,
    color: "bg-red-100 text-red-800 border-red-200",
    icon: "❤️",
  },
  {
    name: "Respiratory",
    count: 38,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "🫁",
  },
  {
    name: "Neurological",
    count: 52,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: "🧠",
  },
  {
    name: "Digestive",
    count: 41,
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: "🍽️",
  },
  {
    name: "Musculoskeletal",
    count: 33,
    color: "bg-green-100 text-green-800 border-green-200",
    icon: "🦴",
  },
  {
    name: "Dermatological",
    count: 29,
    color: "bg-pink-100 text-pink-800 border-pink-200",
    icon: "🧴",
  },
  {
    name: "Endocrine",
    count: 24,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "⚖️",
  },
  {
    name: "Infectious",
    count: 67,
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    icon: "🦠",
  },
]

interface DiseaseCategoriesProps {
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
}

export function DiseaseCategories({ selectedCategory, onCategorySelect }: DiseaseCategoriesProps) {
  const handleCategoryClick = (categoryName: string) => {
    onCategorySelect(selectedCategory === categoryName ? null : categoryName)
  }

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">Browse by Category</h2>
          <p className="text-gray-600">Select a medical category to explore related conditions</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                selectedCategory === category.name
                  ? "border-emerald-500 shadow-lg bg-emerald-50"
                  : "border-gray-200 hover:border-emerald-300"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <Badge variant="secondary" className={category.color}>
                  {category.count} conditions
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCategory && (
          <div className="text-center mt-6">
            <button
              onClick={() => onCategorySelect(null)}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Clear filter • Show all categories
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

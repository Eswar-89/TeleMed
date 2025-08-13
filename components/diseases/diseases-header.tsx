"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function DiseasesHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-purple-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-5xl text-gray-900 mb-4">Disease Encyclopedia</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive medical knowledge organized by categories. Search through thousands of conditions with
            detailed symptoms and information.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Input
              type="text"
              placeholder="Search diseases, symptoms, or conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
            <Button className="absolute inset-y-0 right-0 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-l-none">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

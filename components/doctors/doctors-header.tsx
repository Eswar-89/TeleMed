"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { FilterState } from "@/app/doctors/page"

interface DoctorsHeaderProps {
  filters: FilterState
  onFiltersChange: (filters: Partial<FilterState>) => void
}

const doctorSuggestions = [
  // Doctor Names
  "Dr. Rajesh Sharma",
  "Dr. Priya Patel",
  "Dr. Arjun Singh",
  "Dr. Kavya Reddy",
  "Dr. Amit Kumar",
  "Dr. Sneha Gupta",
  "Dr. Vikram Mehta",
  "Dr. Anita Joshi",
  "Dr. Rohit Agarwal",
  "Dr. Meera Nair",
  "Dr. Suresh Iyer",
  "Dr. Deepika Rao",
  "Dr. Kiran Desai",
  "Dr. Ravi Krishnan",
  "Dr. Pooja Malhotra",
  "Dr. Sanjay Verma",
  "Dr. Nisha Agarwal",
  "Dr. Manoj Tiwari",
  "Dr. Sunita Kapoor",
  "Dr. Ashok Pandey",
  "Dr. Rekha Sinha",
  "Dr. Vinod Jain",
  "Dr. Shweta Bansal",
  "Dr. Harish Chandra",
  "Dr. Neha Saxena",
  "Dr. Ramesh Gupta",
  "Dr. Anjali Mishra",
  "Dr. Sunil Yadav",
  "Dr. Geeta Sharma",
  "Dr. Prakash Joshi",
  // Medical Specialties
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Gastroenterology",
  "Gynecology",
  "Psychiatry",
  "Ophthalmology",
  "ENT Specialist",
  "Oncology",
  "Endocrinology",
  "Pulmonology",
  "Nephrology",
  "Urology",
  "Rheumatology",
  "Anesthesiology",
  "Radiology",
  "Pathology",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine",
  "Plastic Surgery",
  "Neurosurgery",
  "Cardiac Surgery",
  "General Surgery",
  "Dentistry",
  "Physiotherapy",
  "Nutrition",
  "Psychology",
]

const locationSuggestions = [
  // Major Indian Cities
  "Delhi, India",
  "Mumbai, India",
  "Bangalore, India",
  "Chennai, India",
  "Hyderabad, India",
  "Pune, India",
  "Kolkata, India",
  "Ahmedabad, India",
  "Jaipur, India",
  "Lucknow, India",
  "Kanpur, India",
  "Nagpur, India",
  "Indore, India",
  "Thane, India",
  "Bhopal, India",
  "Visakhapatnam, India",
  "Patna, India",
  "Vadodara, India",
  "Ghaziabad, India",
  "Ludhiana, India",
  "Agra, India",
  "Nashik, India",
  "Faridabad, India",
  "Meerut, India",
  "Rajkot, India",
  "Kalyan-Dombivali, India",
  "Vasai-Virar, India",
  "Varanasi, India",
  "Srinagar, India",
  "Aurangabad, India",
  "Dhanbad, India",
  "Amritsar, India",
  "Navi Mumbai, India",
  "Allahabad, India",
  "Ranchi, India",
  "Howrah, India",
  "Coimbatore, India",
  "Jabalpur, India",
  "Gwalior, India",
  "Vijayawada, India",
  "Jodhpur, India",
  "Madurai, India",
  "Raipur, India",
  "Kota, India",
  "Chandigarh, India",
  "Guwahati, India",
  "Solapur, India",
  "Hubli-Dharwad, India",
  "Tiruchirappalli, India",
  "Bareilly, India",
  // Postal Codes
  "110001", // Delhi
  "110002", // Delhi
  "110003", // Delhi
  "400001", // Mumbai
  "400002", // Mumbai
  "400003", // Mumbai
  "560001", // Bangalore
  "560002", // Bangalore
  "560003", // Bangalore
  "600001", // Chennai
  "600002", // Chennai
  "600003", // Chennai
  "500001", // Hyderabad
  "500002", // Hyderabad
  "500003", // Hyderabad
  "411001", // Pune
  "411002", // Pune
  "411003", // Pune
  "700001", // Kolkata
  "700002", // Kolkata
  "380001", // Ahmedabad
  "380002", // Ahmedabad
  "302001", // Jaipur
  "302002", // Jaipur
  "226001", // Lucknow
  "208001", // Kanpur
  "440001", // Nagpur
  "452001", // Indore
  "400601", // Thane
  "462001", // Bhopal
  "530001", // Visakhapatnam
  "800001", // Patna
  "390001", // Vadodara
  "201001", // Ghaziabad
  "141001", // Ludhiana
  "282001", // Agra
  "422001", // Nashik
  "121001", // Faridabad
  "250001", // Meerut
  "360001", // Rajkot
  "421001", // Kalyan
  "401201", // Vasai
  "221001", // Varanasi
  "190001", // Srinagar
  "431001", // Aurangabad
  "826001", // Dhanbad
  "143001", // Amritsar
  "400701", // Navi Mumbai
  "211001", // Allahabad
  "834001", // Ranchi
  "711101", // Howrah
  "641001", // Coimbatore
  "482001", // Jabalpur
  "474001", // Gwalior
  "520001", // Vijayawada
  "342001", // Jodhpur
  "625001", // Madurai
  "492001", // Raipur
  "324001", // Kota
  "160001", // Chandigarh
  "781001", // Guwahati
  "413001", // Solapur
  "580001", // Hubli
  "620001", // Tiruchirappalli
  "243001", // Bareilly
]

export function DoctorsHeader({ filters, onFiltersChange }: DoctorsHeaderProps) {
  const [showDoctorSuggestions, setShowDoctorSuggestions] = useState(false)
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const doctorInputRef = useRef<HTMLInputElement>(null)
  const locationInputRef = useRef<HTMLInputElement>(null)

  const filteredDoctorSuggestions = doctorSuggestions
    .filter((suggestion) => suggestion.toLowerCase().includes(filters.searchQuery.toLowerCase()))
    .slice(0, 5)

  const filteredLocationSuggestions = locationSuggestions
    .filter((suggestion) => suggestion.toLowerCase().includes(filters.location.toLowerCase()))
    .slice(0, 5)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (doctorInputRef.current && !doctorInputRef.current.contains(event.target as Node)) {
        setShowDoctorSuggestions(false)
      }
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-purple-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-5xl text-gray-900 mb-4">Find Your Doctor</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with qualified healthcare professionals in your area. Book appointments with specialists and get
            directions to their clinics.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative" ref={doctorInputRef}>
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
                placeholder="Doctor name or specialty..."
                value={filters.searchQuery}
                onChange={(e) => {
                  onFiltersChange({ searchQuery: e.target.value })
                  setShowDoctorSuggestions(true)
                }}
                onFocus={() => setShowDoctorSuggestions(true)}
                className="pl-10 py-3 text-base border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
              {showDoctorSuggestions && filters.searchQuery && filteredDoctorSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {filteredDoctorSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none"
                      onClick={() => {
                        onFiltersChange({ searchQuery: suggestion })
                        setShowDoctorSuggestions(false)
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={locationInputRef}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <Input
                type="text"
                placeholder="City or ZIP code..."
                value={filters.location}
                onChange={(e) => {
                  onFiltersChange({ location: e.target.value })
                  setShowLocationSuggestions(true)
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                className="pl-10 py-3 text-base border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
              {showLocationSuggestions && filters.location && filteredLocationSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {filteredLocationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none"
                      onClick={() => {
                        onFiltersChange({ location: suggestion })
                        setShowLocationSuggestions(false)
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3">Search Doctors</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

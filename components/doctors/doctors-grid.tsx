"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingModal } from "./booking-modal"
import type { FilterState } from "@/app/doctors/page"

const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 127,
    experience: "15 years",
    education: "All India Institute of Medical Sciences (AIIMS)",
    hospital: "Apollo Hospital",
    address: "Sarita Vihar, New Delhi, Delhi 110076",
    distance: "2.3 km",
    languages: ["Hindi", "English"],
    insurance: ["ICICI Lombard", "Star Health", "HDFC ERGO"],
    nextAvailable: "Today 3:00 PM",
    consultationFee: "₹800",
    image: "/placeholder-k7u5e.png",
  },
  {
    id: 2,
    name: "Dr. Priya Patel",
    specialty: "Dermatology",
    rating: 4.8,
    reviews: 89,
    experience: "12 years",
    education: "King Edward Memorial Hospital, Mumbai",
    hospital: "Fortis Hospital",
    address: "Mulund West, Mumbai, Maharashtra 400080",
    distance: "1.8 km",
    languages: ["Hindi", "English", "Gujarati"],
    insurance: ["New India Assurance", "Oriental Insurance", "Bajaj Allianz"],
    nextAvailable: "Tomorrow 10:00 AM",
    consultationFee: "₹600",
    image: "/professional-asian-doctor.png",
  },
  {
    id: 3,
    name: "Dr. Arjun Singh",
    specialty: "Pediatrics",
    rating: 4.9,
    reviews: 203,
    experience: "18 years",
    education: "Christian Medical College, Vellore",
    hospital: "Max Healthcare",
    address: "Sector 62, Noida, Uttar Pradesh 201309",
    distance: "3.1 km",
    languages: ["Hindi", "English", "Punjabi"],
    insurance: ["ICICI Lombard", "Star Health", "New India Assurance"],
    nextAvailable: "Today 4:30 PM",
    consultationFee: "₹700",
    image: "/placeholder-avslu.png",
  },
  {
    id: 4,
    name: "Dr. Meera Reddy",
    specialty: "Orthopedics",
    rating: 4.7,
    reviews: 156,
    experience: "20 years",
    education: "Nizam's Institute of Medical Sciences, Hyderabad",
    hospital: "Continental Hospitals",
    address: "Gachibowli, Hyderabad, Telangana 500032",
    distance: "4.2 km",
    languages: ["Telugu", "Hindi", "English"],
    insurance: ["HDFC ERGO", "Oriental Insurance", "Bajaj Allianz"],
    nextAvailable: "Monday 9:00 AM",
    consultationFee: "₹900",
    image: "/older-professional-doctor.png",
  },
  {
    id: 5,
    name: "Dr. Kavitha Nair",
    specialty: "Neurology",
    rating: 4.8,
    reviews: 94,
    experience: "14 years",
    education: "Manipal Academy of Higher Education",
    hospital: "Narayana Health",
    address: "Electronic City, Bangalore, Karnataka 560100",
    distance: "2.9 km",
    languages: ["Malayalam", "Hindi", "English"],
    insurance: ["Star Health", "New India Assurance", "ICICI Lombard"],
    nextAvailable: "Wednesday 2:00 PM",
    consultationFee: "₹1000",
    image: "/blonde-doctor-woman.png",
  },
  {
    id: 6,
    name: "Dr. Amit Gupta",
    specialty: "Gastroenterology",
    rating: 4.6,
    reviews: 78,
    experience: "11 years",
    education: "Postgraduate Institute of Medical Education, Chandigarh",
    hospital: "Medanta Hospital",
    address: "Sector 38, Gurgaon, Haryana 122001",
    distance: "3.7 km",
    languages: ["Hindi", "English"],
    insurance: ["HDFC ERGO", "Oriental Insurance", "Bajaj Allianz"],
    nextAvailable: "Friday 11:00 AM",
    consultationFee: "₹750",
    image: "/korean-doctor-man.png",
  },
  {
    id: 7,
    name: "Dr. Sunita Krishnan",
    specialty: "Gynecology",
    rating: 4.9,
    reviews: 245,
    experience: "22 years",
    education: "Madras Medical College, Chennai",
    hospital: "Apollo Hospitals",
    address: "Greams Road, Chennai, Tamil Nadu 600006",
    distance: "1.5 km",
    languages: ["Tamil", "Hindi", "English"],
    insurance: ["Star Health", "ICICI Lombard", "New India Assurance"],
    nextAvailable: "Today 5:00 PM",
    consultationFee: "₹850",
    image: "/professional-asian-doctor.png",
  },
  {
    id: 8,
    name: "Dr. Vikram Joshi",
    specialty: "Oncology",
    rating: 4.8,
    reviews: 167,
    experience: "19 years",
    education: "Tata Memorial Hospital, Mumbai",
    hospital: "Tata Memorial Centre",
    address: "Parel, Mumbai, Maharashtra 400012",
    distance: "2.8 km",
    languages: ["Hindi", "English", "Marathi"],
    insurance: ["HDFC ERGO", "Star Health", "Oriental Insurance"],
    nextAvailable: "Tuesday 10:30 AM",
    consultationFee: "₹1200",
    image: "/placeholder-k7u5e.png",
  },
  {
    id: 9,
    name: "Dr. Anita Desai",
    specialty: "Psychiatry",
    rating: 4.7,
    reviews: 134,
    experience: "16 years",
    education: "National Institute of Mental Health, Bangalore",
    hospital: "Nimhans Hospital",
    address: "Hosur Road, Bangalore, Karnataka 560029",
    distance: "3.4 km",
    languages: ["Kannada", "Hindi", "English"],
    insurance: ["Bajaj Allianz", "New India Assurance", "ICICI Lombard"],
    nextAvailable: "Thursday 3:30 PM",
    consultationFee: "₹900",
    image: "/blonde-doctor-woman.png",
  },
  {
    id: 10,
    name: "Dr. Ravi Kumar",
    specialty: "Ophthalmology",
    rating: 4.6,
    reviews: 98,
    experience: "13 years",
    education: "Sankara Nethralaya, Chennai",
    hospital: "L V Prasad Eye Institute",
    address: "Banjara Hills, Hyderabad, Telangana 500034",
    distance: "2.1 km",
    languages: ["Telugu", "Hindi", "English"],
    insurance: ["Star Health", "HDFC ERGO", "Oriental Insurance"],
    nextAvailable: "Monday 11:00 AM",
    consultationFee: "₹650",
    image: "/korean-doctor-man.png",
  },
  {
    id: 11,
    name: "Dr. Deepika Agarwal",
    specialty: "ENT",
    rating: 4.8,
    reviews: 112,
    experience: "14 years",
    education: "Maulana Azad Medical College, Delhi",
    hospital: "Sir Ganga Ram Hospital",
    address: "Rajinder Nagar, New Delhi, Delhi 110060",
    distance: "1.9 km",
    languages: ["Hindi", "English"],
    insurance: ["ICICI Lombard", "Bajaj Allianz", "New India Assurance"],
    nextAvailable: "Today 2:15 PM",
    consultationFee: "₹700",
    image: "/professional-asian-doctor.png",
  },
  {
    id: 12,
    name: "Dr. Suresh Menon",
    specialty: "Urology",
    rating: 4.7,
    reviews: 89,
    experience: "17 years",
    education: "Christian Medical College, Vellore",
    hospital: "Fortis Malar Hospital",
    address: "Adyar, Chennai, Tamil Nadu 600020",
    distance: "3.6 km",
    languages: ["Tamil", "Malayalam", "English"],
    insurance: ["Star Health", "HDFC ERGO", "Oriental Insurance"],
    nextAvailable: "Wednesday 9:30 AM",
    consultationFee: "₹800",
    image: "/older-professional-doctor.png",
  },
  {
    id: 13,
    name: "Dr. Pooja Sharma",
    specialty: "Endocrinology",
    rating: 4.9,
    reviews: 156,
    experience: "12 years",
    education: "All India Institute of Medical Sciences (AIIMS)",
    hospital: "Fortis Hospital",
    address: "Vasant Kunj, New Delhi, Delhi 110070",
    distance: "2.7 km",
    languages: ["Hindi", "English"],
    insurance: ["ICICI Lombard", "Star Health", "Bajaj Allianz"],
    nextAvailable: "Friday 4:00 PM",
    consultationFee: "₹750",
    image: "/blonde-doctor-woman.png",
  },
  {
    id: 14,
    name: "Dr. Ashok Pandey",
    specialty: "Pulmonology",
    rating: 4.6,
    reviews: 73,
    experience: "21 years",
    education: "King George's Medical University, Lucknow",
    hospital: "Medanta Hospital",
    address: "Sector 38, Gurgaon, Haryana 122001",
    distance: "4.1 km",
    languages: ["Hindi", "English"],
    insurance: ["New India Assurance", "Oriental Insurance", "HDFC ERGO"],
    nextAvailable: "Tuesday 1:00 PM",
    consultationFee: "₹850",
    image: "/placeholder-k7u5e.png",
  },
  {
    id: 15,
    name: "Dr. Lakshmi Iyer",
    specialty: "Rheumatology",
    rating: 4.8,
    reviews: 91,
    experience: "15 years",
    education: "Jawaharlal Institute of Postgraduate Medical Education",
    hospital: "Apollo Hospitals",
    address: "Jubilee Hills, Hyderabad, Telangana 500033",
    distance: "2.4 km",
    languages: ["Telugu", "Tamil", "English"],
    insurance: ["Star Health", "ICICI Lombard", "Bajaj Allianz"],
    nextAvailable: "Thursday 10:00 AM",
    consultationFee: "₹900",
    image: "/professional-asian-doctor.png",
  },
  {
    id: 16,
    name: "Dr. Manoj Singh",
    specialty: "General Surgery",
    rating: 4.7,
    reviews: 198,
    experience: "18 years",
    education: "Postgraduate Institute of Medical Education, Chandigarh",
    hospital: "Max Super Speciality Hospital",
    address: "Saket, New Delhi, Delhi 110017",
    distance: "3.2 km",
    languages: ["Hindi", "English", "Punjabi"],
    insurance: ["HDFC ERGO", "Star Health", "New India Assurance"],
    nextAvailable: "Monday 8:00 AM",
    consultationFee: "₹1000",
    image: "/korean-doctor-man.png",
  },
  {
    id: 17,
    name: "Dr. Nandini Rao",
    specialty: "Nephrology",
    rating: 4.8,
    reviews: 124,
    experience: "16 years",
    education: "Manipal Academy of Higher Education",
    hospital: "Narayana Health",
    address: "Bommasandra, Bangalore, Karnataka 560099",
    distance: "4.5 km",
    languages: ["Kannada", "Hindi", "English"],
    insurance: ["Bajaj Allianz", "ICICI Lombard", "Oriental Insurance"],
    nextAvailable: "Wednesday 11:30 AM",
    consultationFee: "₹950",
    image: "/blonde-doctor-woman.png",
  },
  {
    id: 18,
    name: "Dr. Rohit Khanna",
    specialty: "Plastic Surgery",
    rating: 4.9,
    reviews: 87,
    experience: "14 years",
    education: "Grant Medical College, Mumbai",
    hospital: "Kokilaben Dhirubhai Ambani Hospital",
    address: "Andheri West, Mumbai, Maharashtra 400053",
    distance: "2.6 km",
    languages: ["Hindi", "English", "Marathi"],
    insurance: ["Star Health", "HDFC ERGO", "New India Assurance"],
    nextAvailable: "Friday 2:30 PM",
    consultationFee: "₹1500",
    image: "/placeholder-avslu.png",
  },
  {
    id: 19,
    name: "Dr. Geeta Malhotra",
    specialty: "Hematology",
    rating: 4.7,
    reviews: 76,
    experience: "19 years",
    education: "All India Institute of Medical Sciences (AIIMS)",
    hospital: "Rajiv Gandhi Cancer Institute",
    address: "Sector 5, Rohini, New Delhi, Delhi 110085",
    distance: "5.1 km",
    languages: ["Hindi", "English"],
    insurance: ["ICICI Lombard", "Bajaj Allianz", "Star Health"],
    nextAvailable: "Tuesday 3:00 PM",
    consultationFee: "₹1100",
    image: "/professional-asian-doctor.png",
  },
  {
    id: 20,
    name: "Dr. Kiran Jain",
    specialty: "Infectious Diseases",
    rating: 4.6,
    reviews: 65,
    experience: "13 years",
    education: "Maulana Azad Medical College, Delhi",
    hospital: "Lok Nayak Hospital",
    address: "Delhi Gate, New Delhi, Delhi 110002",
    distance: "3.8 km",
    languages: ["Hindi", "English"],
    insurance: ["New India Assurance", "Oriental Insurance", "HDFC ERGO"],
    nextAvailable: "Thursday 9:00 AM",
    consultationFee: "₹600",
    image: "/older-professional-doctor.png",
  },
  {
    id: 21,
    name: "Dr. Sanjay Gupta",
    specialty: "Cardiology",
    rating: 4.8,
    reviews: 189,
    experience: "23 years",
    education: "Sanjay Gandhi Postgraduate Institute, Lucknow",
    hospital: "Fortis Escorts Heart Institute",
    address: "Okhla Road, New Delhi, Delhi 110025",
    distance: "2.2 km",
    languages: ["Hindi", "English"],
    insurance: ["Star Health", "ICICI Lombard", "Bajaj Allianz"],
    nextAvailable: "Monday 10:00 AM",
    consultationFee: "₹1200",
    image: "/korean-doctor-man.png",
  },
  {
    id: 22,
    name: "Dr. Rekha Pillai",
    specialty: "Dermatology",
    rating: 4.9,
    reviews: 143,
    experience: "17 years",
    education: "Kasturba Medical College, Manipal",
    hospital: "Aster CMI Hospital",
    address: "Hebbal, Bangalore, Karnataka 560024",
    distance: "1.7 km",
    languages: ["Malayalam", "Kannada", "English"],
    insurance: ["HDFC ERGO", "Star Health", "New India Assurance"],
    nextAvailable: "Today 6:00 PM",
    consultationFee: "₹700",
    image: "/blonde-doctor-woman.png",
  },
  {
    id: 23,
    name: "Dr. Arun Kumar",
    specialty: "Neurosurgery",
    rating: 4.8,
    reviews: 92,
    experience: "20 years",
    education: "National Institute of Mental Health, Bangalore",
    hospital: "Nimhans Hospital",
    address: "Hosur Road, Bangalore, Karnataka 560029",
    distance: "3.9 km",
    languages: ["Kannada", "Tamil", "English"],
    insurance: ["Bajaj Allianz", "ICICI Lombard", "Oriental Insurance"],
    nextAvailable: "Wednesday 8:30 AM",
    consultationFee: "₹1800",
    image: "/placeholder-k7u5e.png",
  },
  {
    id: 24,
    name: "Dr. Shilpa Mehta",
    specialty: "Pediatrics",
    rating: 4.7,
    reviews: 167,
    experience: "11 years",
    education: "B.J. Medical College, Pune",
    hospital: "Ruby Hall Clinic",
    address: "Pune Cantonment, Pune, Maharashtra 411001",
    distance: "2.3 km",
    languages: ["Hindi", "English", "Marathi"],
    insurance: ["Star Health", "HDFC ERGO", "New India Assurance"],
    nextAvailable: "Friday 3:30 PM",
    consultationFee: "₹650",
    image: "/professional-asian-doctor.png",
  },
  {
    id: 25,
    name: "Dr. Harish Chandra",
    specialty: "Orthopedics",
    rating: 4.6,
    reviews: 108,
    experience: "16 years",
    education: "Institute of Medical Sciences, BHU",
    hospital: "Fortis Hospital",
    address: "Noida Sector 62, Uttar Pradesh 201301",
    distance: "4.3 km",
    languages: ["Hindi", "English"],
    insurance: ["ICICI Lombard", "Bajaj Allianz", "Star Health"],
    nextAvailable: "Tuesday 11:00 AM",
    consultationFee: "₹800",
    image: "/older-professional-doctor.png",
  },
  {
    id: 26,
    name: "Dr. Priyanka Joshi",
    specialty: "Gynecology",
    rating: 4.9,
    reviews: 201,
    experience: "14 years",
    education: "Grant Medical College, Mumbai",
    hospital: "Lilavati Hospital",
    address: "Bandra West, Mumbai, Maharashtra 400050",
    distance: "1.4 km",
    languages: ["Hindi", "English", "Gujarati"],
    insurance: ["Star Health", "HDFC ERGO", "Oriental Insurance"],
    nextAvailable: "Today 4:00 PM",
    consultationFee: "₹900",
    image: "/blonde-doctor-woman.png",
  },
  {
    id: 27,
    name: "Dr. Ramesh Babu",
    specialty: "Gastroenterology",
    rating: 4.7,
    reviews: 85,
    experience: "18 years",
    education: "Sri Ramachandra Medical College, Chennai",
    hospital: "Global Hospitals",
    address: "Lakdi Ka Pul, Hyderabad, Telangana 500004",
    distance: "3.1 km",
    languages: ["Telugu", "Tamil", "English"],
    insurance: ["New India Assurance", "ICICI Lombard", "Bajaj Allianz"],
    nextAvailable: "Thursday 2:00 PM",
    consultationFee: "₹750",
    image: "/korean-doctor-man.png",
  },
  {
    id: 28,
    name: "Dr. Neha Agarwal",
    specialty: "Ophthalmology",
    rating: 4.8,
    reviews: 119,
    experience: "12 years",
    education: "Aravind Eye Care System, Madurai",
    hospital: "Centre for Sight",
    address: "Lajpat Nagar, New Delhi, Delhi 110024",
    distance: "2.8 km",
    languages: ["Hindi", "English"],
    insurance: ["Star Health", "HDFC ERGO", "New India Assurance"],
    nextAvailable: "Monday 1:30 PM",
    consultationFee: "₹600",
    image: "/professional-asian-doctor.png",
  },
  {
    id: 29,
    name: "Dr. Sunil Reddy",
    specialty: "Pulmonology",
    rating: 4.6,
    reviews: 94,
    experience: "15 years",
    education: "Osmania Medical College, Hyderabad",
    hospital: "KIMS Hospitals",
    address: "Secunderabad, Hyderabad, Telangana 500003",
    distance: "3.7 km",
    languages: ["Telugu", "Hindi", "English"],
    insurance: ["Bajaj Allianz", "Star Health", "Oriental Insurance"],
    nextAvailable: "Wednesday 10:30 AM",
    consultationFee: "₹700",
    image: "/placeholder-avslu.png",
  },
  {
    id: 30,
    name: "Dr. Kavya Krishnan",
    specialty: "ENT",
    rating: 4.9,
    reviews: 132,
    experience: "13 years",
    education: "Christian Medical College, Vellore",
    hospital: "Apollo Hospitals",
    address: "Greams Road, Chennai, Tamil Nadu 600006",
    distance: "2.0 km",
    languages: ["Tamil", "Malayalam", "English"],
    insurance: ["ICICI Lombard", "Star Health", "HDFC ERGO"],
    nextAvailable: "Friday 11:30 AM",
    consultationFee: "₹650",
    image: "/blonde-doctor-woman.png",
  },
]

interface DoctorsGridProps {
  filters: FilterState
}

export function DoctorsGrid({ filters }: DoctorsGridProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [profileDoctor, setProfileDoctor] = useState<(typeof doctors)[0] | null>(null)

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      // Search query filter (name or specialty)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesName = doctor.name.toLowerCase().includes(query)
        const matchesSpecialty = doctor.specialty.toLowerCase().includes(query)
        if (!matchesName && !matchesSpecialty) return false
      }

      // Location filter (basic implementation)
      if (filters.location) {
        const location = filters.location.toLowerCase()
        const matchesAddress = doctor.address.toLowerCase().includes(location)
        const matchesHospital = doctor.hospital.toLowerCase().includes(location)
        if (!matchesAddress && !matchesHospital) return false
      }

      // Specialty filter
      if (filters.specialties.length > 0) {
        if (!filters.specialties.includes(doctor.specialty)) return false
      }

      // Language filter
      if (filters.languages.length > 0) {
        const hasMatchingLanguage = filters.languages.some((lang) => doctor.languages.includes(lang))
        if (!hasMatchingLanguage) return false
      }

      // Insurance filter
      if (filters.insurances.length > 0) {
        const hasMatchingInsurance = filters.insurances.some((insurance) => doctor.insurance.includes(insurance))
        if (!hasMatchingInsurance) return false
      }

      // Distance filter (basic implementation using distance string)
      const doctorDistance = Number.parseFloat(doctor.distance.split(" ")[0])
      if (doctorDistance > filters.distance[0]) return false

      // Rating filter
      if (doctor.rating < filters.rating[0]) return false

      return true
    })
  }, [filters])

  const handleBookAppointment = (doctor: (typeof doctors)[0]) => {
    setSelectedDoctor(doctor)
    setShowBooking(true)
  }

  const handleViewProfile = (doctor: (typeof doctors)[0]) => {
    setProfileDoctor(doctor)
    setShowProfile(true)
  }

  const handleGetDirections = (doctor: (typeof doctors)[0]) => {
    const address = encodeURIComponent(doctor.address)
    const hospitalName = encodeURIComponent(doctor.hospital)

    // Try to open in Google Maps first, fallback to Apple Maps on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (isIOS) {
      // Apple Maps for iOS devices
      window.open(`http://maps.apple.com/?q=${hospitalName}, ${address}`, "_blank")
    } else {
      // Google Maps for other devices
      window.open(`https://www.google.com/maps/search/?api=1&query=${hospitalName}, ${address}`, "_blank")
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-2xl text-gray-900">Available Doctors</h2>
          <p className="text-gray-600">{filteredDoctors.length} doctors found</p>
        </div>

        {(filters.searchQuery ||
          filters.location ||
          filters.specialties.length > 0 ||
          filters.languages.length > 0 ||
          filters.insurances.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {filters.searchQuery && (
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                Search: {filters.searchQuery}
              </Badge>
            )}
            {filters.location && (
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                Location: {filters.location}
              </Badge>
            )}
            {filters.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="bg-emerald-100 text-emerald-800">
                {specialty}
              </Badge>
            ))}
            {filters.languages.map((language) => (
              <Badge key={language} variant="secondary" className="bg-purple-100 text-purple-800">
                {language}
              </Badge>
            ))}
            {filters.insurances.map((insurance) => (
              <Badge key={insurance} variant="secondary" className="bg-blue-100 text-blue-800">
                {insurance}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback className="text-lg font-semibold bg-emerald-100 text-emerald-700">
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-grow space-y-3">
                    <div>
                      <h3 className="font-display font-bold text-xl text-gray-900">{doctor.name}</h3>
                      <p className="text-emerald-600 font-medium">{doctor.specialty}</p>
                      <p className="text-gray-600 text-sm">{doctor.education}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {renderStars(doctor.rating)}
                        <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                        <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {doctor.experience} experience
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                            />
                          </svg>
                          <span>{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          <span>
                            {doctor.address} • {doctor.distance}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Next: {doctor.nextAvailable}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          <span>Consultation: {doctor.consultationFee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Languages:</span>
                        {doctor.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex flex-col gap-2">
                    <Button
                      onClick={() => handleBookAppointment(doctor)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="bg-transparent" onClick={() => handleViewProfile(doctor)}>
                      View Profile
                    </Button>
                    <Button variant="outline" className="bg-transparent" onClick={() => handleGetDirections(doctor)}>
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {showBooking && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          isOpen={showBooking}
          onClose={() => {
            setShowBooking(false)
            setSelectedDoctor(null)
          }}
        />
      )}

      {showProfile && profileDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-foreground">Doctor Profile</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfile(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profileDoctor.image || "/placeholder.svg"} alt={profileDoctor.name} />
                    <AvatarFallback className="text-lg font-semibold bg-emerald-100 text-emerald-700">
                      {profileDoctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{profileDoctor.name}</h3>
                    <p className="text-emerald-600 font-medium">{profileDoctor.specialty}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {renderStars(profileDoctor.rating)}
                      <span className="ml-1 text-sm font-medium">{profileDoctor.rating}</span>
                      <span className="text-sm text-muted-foreground">({profileDoctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Experience & Education</h4>
                      <p className="text-muted-foreground">{profileDoctor.experience} of experience</p>
                      <p className="text-muted-foreground">{profileDoctor.education}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Hospital & Location</h4>
                      <p className="text-muted-foreground">{profileDoctor.hospital}</p>
                      <p className="text-muted-foreground">{profileDoctor.address}</p>
                      <p className="text-muted-foreground">{profileDoctor.distance} away</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileDoctor.languages.map((lang) => (
                          <Badge key={lang} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Insurance Accepted</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileDoctor.insurance.map((ins) => (
                          <Badge key={ins} variant="outline">
                            {ins}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Consultation</h4>
                      <p className="text-muted-foreground">Fee: {profileDoctor.consultationFee}</p>
                      <p className="text-muted-foreground">Next Available: {profileDoctor.nextAvailable}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => {
                      setShowProfile(false)
                      handleBookAppointment(profileDoctor)
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
                  >
                    Book Appointment
                  </Button>
                  <Button variant="outline" onClick={() => handleGetDirections(profileDoctor)} className="flex-1">
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

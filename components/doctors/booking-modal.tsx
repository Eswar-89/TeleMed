"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Doctor {
  id: number
  name: string
  specialty: string
  hospital: string
  address: string
  consultationFee: string
  image: string
}

interface BookingModalProps {
  doctor: Doctor
  isOpen: boolean
  onClose: () => void
}

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export function BookingModal({ doctor, isOpen, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<"in-person" | "video">("in-person")
  const [reason, setReason] = useState("")
  const [step, setStep] = useState(1)

  if (!isOpen) return null

  const handleBooking = () => {
    // Here you would typically send the booking data to your backend
    setStep(3)
  }

  const resetBooking = () => {
    setStep(1)
    setSelectedDate(new Date())
    setSelectedTime("")
    setAppointmentType("in-person")
    setReason("")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                <AvatarFallback className="text-lg font-semibold bg-emerald-100 text-emerald-700">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-display text-xl text-gray-900">{doctor.name}</CardTitle>
                <CardDescription className="text-emerald-600 font-medium">{doctor.specialty}</CardDescription>
                <p className="text-sm text-gray-600">{doctor.hospital}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">Select Date & Time</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Choose Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Available Times</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={
                            selectedTime === time
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "hover:bg-emerald-50 hover:border-emerald-300"
                          }
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Appointment Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={appointmentType === "in-person" ? "default" : "outline"}
                    onClick={() => setAppointmentType("in-person")}
                    className={`h-auto p-4 flex flex-col items-center gap-2 ${
                      appointmentType === "in-person"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "hover:bg-emerald-50 hover:border-emerald-300"
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                      />
                    </svg>
                    <span className="font-medium">In-Person Visit</span>
                    <span className="text-xs opacity-75">Visit the clinic</span>
                  </Button>
                  <Button
                    variant={appointmentType === "video" ? "default" : "outline"}
                    onClick={() => setAppointmentType("video")}
                    className={`h-auto p-4 flex flex-col items-center gap-2 ${
                      appointmentType === "video"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "hover:bg-emerald-50 hover:border-emerald-300"
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">Video Call</span>
                    <span className="text-xs opacity-75">Online consultation</span>
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">Appointment Details</h3>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-emerald-900">Date:</span>
                      <span className="ml-2 text-emerald-800">
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-emerald-900">Time:</span>
                      <span className="ml-2 text-emerald-800">{selectedTime}</span>
                    </div>
                    <div>
                      <span className="font-medium text-emerald-900">Type:</span>
                      <span className="ml-2 text-emerald-800">
                        {appointmentType === "in-person" ? "In-Person Visit" : "Video Call"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-emerald-900">Fee:</span>
                      <span className="ml-2 text-emerald-800">{doctor.consultationFee}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="reason" className="text-sm font-medium text-gray-700 mb-2 block">
                  Reason for Visit (Optional)
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Please describe your symptoms or reason for the appointment..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {appointmentType === "in-person" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Clinic Location</h4>
                  <p className="text-blue-800 text-sm mb-2">{doctor.address}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-700 border-blue-300 hover:bg-blue-100 bg-transparent"
                  >
                    Get Directions
                  </Button>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button onClick={handleBooking} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Appointment Confirmed!</h3>
                <p className="text-gray-600">Your appointment with {doctor.name} has been successfully booked.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Appointment Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Doctor:</span> {doctor.name}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {selectedTime}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {appointmentType === "in-person" ? "In-Person Visit" : "Video Call"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetBooking()
                    onClose()
                  }}
                  className="flex-1 bg-transparent"
                >
                  Close
                </Button>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">Add to Calendar</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

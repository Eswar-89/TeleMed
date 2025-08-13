import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "Today",
    time: "3:00 PM",
    type: "In-person",
    avatar: "/placeholder-k7u5e.png",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Dermatology",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "Video call",
    avatar: "/professional-asian-doctor.png",
  },
  {
    id: 3,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    date: "Friday",
    time: "2:30 PM",
    type: "In-person",
    avatar: "/placeholder-avslu.png",
  },
]

export function UpcomingAppointments() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="font-display text-xl text-gray-900">Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled consultations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.doctor} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  {appointment.doctor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                <p className="text-sm text-gray-600">{appointment.specialty}</p>
                <p className="text-sm text-gray-500">
                  {appointment.date} at {appointment.time} • {appointment.type}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                Reschedule
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Join
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

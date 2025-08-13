import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function HealthInsights() {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="font-display text-xl text-gray-900">Health Goals</CardTitle>
          <CardDescription>Track your progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Weekly Exercise</span>
              <span className="font-medium">4/5 days</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Sleep Quality</span>
              <span className="font-medium">7.5/10</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Hydration</span>
              <span className="font-medium">6/8 glasses</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="font-display text-xl text-gray-900">Health Tips</CardTitle>
          <CardDescription>Personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <h4 className="font-semibold text-emerald-900 mb-2">Stay Active</h4>
            <p className="text-emerald-800 text-sm">
              You're doing great with exercise! Try adding 10 minutes of stretching to your routine.
            </p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Hydration Reminder</h4>
            <p className="text-blue-800 text-sm">Remember to drink more water throughout the day for optimal health.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="font-display text-xl text-gray-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Log Symptoms</Button>
          <Button variant="outline" className="w-full bg-transparent">
            Update Health Info
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            View Health Records
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

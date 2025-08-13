"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { HealthQuestionnaire } from "./health-questionnaire"
import { HealthResults } from "./health-results"

export function HealthAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [assessmentData, setAssessmentData] = useState<any>({})
  const [showResults, setShowResults] = useState(false)

  const steps = ["Basic Information", "Lifestyle Factors", "Current Symptoms", "Medical History", "Mental Health"]

  const handleStepComplete = (stepData: any) => {
    const newData = { ...assessmentData, ...stepData }
    setAssessmentData(newData)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAssessmentData({})
    setShowResults(false)
  }

  if (showResults) {
    return <HealthResults data={assessmentData} onRestart={handleRestart} />
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index <= currentStep ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-1 mx-2 ${index < currentStep ? "bg-emerald-600" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <CardTitle className="font-display text-2xl text-gray-900">{steps[currentStep]}</CardTitle>
            <CardDescription className="text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </CardDescription>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="mt-4" />
          </CardHeader>
          <CardContent>
            <HealthQuestionnaire step={currentStep} onComplete={handleStepComplete} existingData={assessmentData} />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

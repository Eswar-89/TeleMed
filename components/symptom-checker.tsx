"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Chest Pain",
  "Shortness of Breath",
  "Dizziness",
  "Stomach Pain",
  "Joint Pain",
]

const assessmentSteps = [
  {
    question: "How long have you been experiencing these symptoms?",
    options: ["Less than 24 hours", "1-3 days", "4-7 days", "More than a week"],
  },
  {
    question: "How would you rate the severity of your symptoms?",
    options: ["Mild", "Moderate", "Severe", "Very Severe"],
  },
  {
    question: "Are you currently taking any medications?",
    options: ["No medications", "Over-the-counter only", "Prescription medications", "Multiple medications"],
  },
]

export function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState(0)
  const [symptoms, setSymptoms] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleNextStep = () => {
    if (currentStep < assessmentSteps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowResults(true)
      }, 2000)
    }
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentStep - 1] = answer
    setAnswers(newAnswers)
  }

  const resetAssessment = () => {
    setCurrentStep(0)
    setSymptoms("")
    setSelectedSymptoms([])
    setAnswers([])
    setShowResults(false)
    setIsLoading(false)
  }

  const shouldRecommendDoctor = () => {
    const duration = answers[0]
    const severity = answers[1]
    const medications = answers[2]

    return (
      severity === "Severe" ||
      severity === "Very Severe" ||
      duration === "More than a week" ||
      (severity === "Moderate" && duration === "4-7 days") ||
      selectedSymptoms.some((symptom) => ["Chest Pain", "Shortness of Breath", "Severe Headache"].includes(symptom))
    )
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Analyzing Your Symptoms</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Our AI is processing your information...</p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  if (showResults) {
    const needsDoctor = shouldRecommendDoctor()
    const recommendationBg = needsDoctor
      ? "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
      : "bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800"
    const recommendationTextColor = needsDoctor
      ? "text-red-900 dark:text-red-100"
      : "text-emerald-900 dark:text-emerald-100"
    const recommendationBodyColor = needsDoctor
      ? "text-red-800 dark:text-red-200"
      : "text-emerald-800 dark:text-emerald-200"

    return (
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-700">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500 delay-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <CardTitle className="font-display text-3xl text-foreground animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
                Assessment Complete
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-400">
                Based on your symptoms, here's our AI-powered recommendation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`${recommendationBg} border rounded-lg p-6 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-500 transform hover:scale-105 transition-transform`}
              >
                <h3 className={`font-semibold ${recommendationTextColor} mb-2`}>Recommendation</h3>
                <p className={recommendationBodyColor}>
                  {needsDoctor
                    ? "Based on your symptoms and responses, we strongly recommend seeking immediate medical attention. Please consult with a healthcare provider as soon as possible or visit an urgent care facility."
                    : "Based on your symptoms and responses, we recommend scheduling a consultation with a healthcare provider within the next 2-3 days. Your symptoms may require professional evaluation."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-600">
                <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4 transform hover:scale-105 transition-all duration-200 hover:shadow-md">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Immediate Care</h4>
                  <p className="text-purple-800 dark:text-purple-200 text-sm">
                    {needsDoctor
                      ? "Seek immediate medical attention. Do not delay if symptoms worsen."
                      : "Monitor symptoms closely. Seek immediate care if symptoms worsen significantly."}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transform hover:scale-105 transition-all duration-200 hover:shadow-md">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Next Steps</h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    {needsDoctor
                      ? "Contact your doctor immediately or visit the nearest emergency room or urgent care."
                      : "Book an appointment with a general practitioner or specialist in your area."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-700">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg">
                  Find Doctors Near Me
                </Button>
                <Button
                  variant="outline"
                  onClick={resetAssessment}
                  className="flex-1 bg-transparent transform transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Start New Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            AI Symptom Checker
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Describe your symptoms and get personalized health guidance powered by AI
          </p>
        </div>

        <Card className="border-0 shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
          {currentStep === 0 ? (
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-400">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Describe your symptoms in detail
                  </label>
                  <Textarea
                    placeholder="Tell us what you're experiencing... (e.g., I have a persistent headache that started yesterday morning, along with mild nausea)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[120px] text-base transition-all duration-200 focus:scale-105"
                  />
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-500">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Or select from common symptoms
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonSymptoms.map((symptom, index) => (
                      <Badge
                        key={symptom}
                        variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 animate-in fade-in duration-300 ${
                          selectedSymptoms.includes(symptom)
                            ? "bg-emerald-600 hover:bg-emerald-700 shadow-md"
                            : "hover:bg-emerald-50 hover:border-emerald-300 dark:hover:bg-emerald-950"
                        }`}
                        style={{ animationDelay: `${600 + index * 50}ms` }}
                        onClick={() => handleSymptomToggle(symptom)}
                      >
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-800">
                  <Button
                    onClick={handleNextStep}
                    disabled={!symptoms.trim() && selectedSymptoms.length === 0}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Step {currentStep} of {assessmentSteps.length}
                  </span>
                  <div className="flex space-x-1">
                    {Array.from({ length: assessmentSteps.length }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i < currentStep ? "bg-emerald-600 scale-110" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
                  {assessmentSteps[currentStep - 1].question}
                </h3>

                <div className="space-y-3">
                  {assessmentSteps[currentStep - 1].options.map((option, index) => (
                    <Button
                      key={option}
                      variant={answers[currentStep - 1] === option ? "default" : "outline"}
                      className={`w-full justify-start text-left h-auto py-4 px-6 transition-all duration-200 hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-2 ${
                        answers[currentStep - 1] === option
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-md"
                          : "hover:bg-emerald-50 hover:border-emerald-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:hover:bg-emerald-950"
                      }`}
                      style={{ animationDelay: `${300 + index * 100}ms` }}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-600">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transform transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={!answers[currentStep - 1]}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                  >
                    {currentStep === assessmentSteps.length ? "Get Results" : "Next"}
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface HealthResultsProps {
  data: any
  onRestart: () => void
}

export function HealthResults({ data, onRestart }: HealthResultsProps) {
  const getMedicationRecommendations = (symptoms: string[] = []) => {
    const recommendations: { condition: string; medications: string[]; note: string }[] = []

    // Common symptom-based medication recommendations
    if (symptoms.includes("Headache")) {
      recommendations.push({
        condition: "Headache",
        medications: ["Paracetamol 500mg", "Ibuprofen 400mg", "Aspirin 325mg"],
        note: "Take as needed, not more than 3 times daily. Consult doctor if headaches persist.",
      })
    }

    if (symptoms.includes("Fever")) {
      recommendations.push({
        condition: "Fever",
        medications: ["Paracetamol 650mg", "Ibuprofen 400mg", "Crocin 500mg"],
        note: "Take every 6-8 hours. Drink plenty of fluids and rest.",
      })
    }

    if (symptoms.includes("Cough")) {
      recommendations.push({
        condition: "Cough",
        medications: ["Dextromethorphan syrup", "Honey with warm water", "Tulsi drops"],
        note: "For dry cough. If productive cough persists, consult a doctor.",
      })
    }

    if (symptoms.includes("Sore throat")) {
      recommendations.push({
        condition: "Sore Throat",
        medications: ["Betadine gargle", "Strepsils lozenges", "Warm salt water gargle"],
        note: "Gargle 3-4 times daily. Avoid cold drinks and foods.",
      })
    }

    if (symptoms.includes("Digestive issues") || symptoms.includes("Abdominal pain")) {
      recommendations.push({
        condition: "Digestive Issues",
        medications: ["Eno/ENO powder", "Digene tablets", "Pudin Hara capsules"],
        note: "Take after meals. Avoid spicy and oily foods. Eat light meals.",
      })
    }

    if (symptoms.includes("Constipation")) {
      recommendations.push({
        condition: "Constipation",
        medications: ["Isabgol (Psyllium husk)", "Cremaffin syrup", "Dulcolax tablets"],
        note: "Increase fiber intake and water consumption. Exercise regularly.",
      })
    }

    if (symptoms.includes("Diarrhea")) {
      recommendations.push({
        condition: "Diarrhea",
        medications: ["ORS packets", "Loperamide tablets", "Zinc supplements"],
        note: "Stay hydrated. Eat BRAT diet (Banana, Rice, Apple, Toast). Consult doctor if severe.",
      })
    }

    if (symptoms.includes("Nausea")) {
      recommendations.push({
        condition: "Nausea",
        medications: ["Domperidone tablets", "Ginger tea", "Lemon water"],
        note: "Take small frequent meals. Avoid strong odors and greasy foods.",
      })
    }

    if (symptoms.includes("Joint pain") || symptoms.includes("Back pain")) {
      recommendations.push({
        condition: "Joint/Back Pain",
        medications: ["Diclofenac gel", "Ibuprofen 400mg", "Hot/cold compress"],
        note: "Apply topical gel 2-3 times daily. Gentle stretching and rest recommended.",
      })
    }

    if (symptoms.includes("Skin rash") || symptoms.includes("Itching")) {
      recommendations.push({
        condition: "Skin Issues",
        medications: ["Calamine lotion", "Cetrizine 10mg", "Aloe vera gel"],
        note: "Keep skin clean and dry. Avoid scratching. Use mild soaps.",
      })
    }

    if (symptoms.includes("Anxiety") || symptoms.includes("Sleep problems")) {
      recommendations.push({
        condition: "Anxiety/Sleep Issues",
        medications: ["Chamomile tea", "Melatonin 3mg", "Ashwagandha capsules"],
        note: "Practice relaxation techniques. Maintain regular sleep schedule. Limit caffeine.",
      })
    }

    if (symptoms.includes("Heartburn")) {
      recommendations.push({
        condition: "Heartburn",
        medications: ["Omeprazole 20mg", "Ranitidine 150mg", "Antacid tablets"],
        note: "Take before meals. Avoid spicy, acidic foods. Don't lie down after eating.",
      })
    }

    return recommendations
  }

  // Calculate health score based on assessment data
  const calculateHealthScore = () => {
    let score = 100
    const factors = []

    // Age factor
    if (data.age > 65) {
      score -= 10
      factors.push("Age-related risk factors")
    } else if (data.age > 45) {
      score -= 5
    }

    // BMI calculation
    if (data.height && data.weight) {
      const bmi = data.weight / (data.height / 100) ** 2
      if (bmi > 30) {
        score -= 15
        factors.push("BMI indicates obesity")
      } else if (bmi > 25) {
        score -= 8
        factors.push("BMI indicates overweight")
      } else if (bmi < 18.5) {
        score -= 5
        factors.push("BMI indicates underweight")
      }
    }

    // Exercise factor
    if (data.exercise === "never") {
      score -= 20
      factors.push("Lack of physical activity")
    } else if (data.exercise === "occasional") {
      score -= 10
      factors.push("Insufficient physical activity")
    } else if (data.exercise === "daily") {
      score += 5
    }

    // Sleep factor
    if (data.sleep < 6) {
      score -= 15
      factors.push("Poor sleep quality")
    } else if (data.sleep < 7) {
      score -= 8
    }

    // Smoking factor
    if (data.smoking === "current") {
      score -= 25
      factors.push("Current smoking")
    } else if (data.smoking === "former") {
      score -= 5
    }

    // Alcohol factor
    if (data.alcohol === "heavy") {
      score -= 15
      factors.push("Heavy alcohol consumption")
    } else if (data.alcohol === "moderate") {
      score -= 5
    }

    // Symptoms factor
    const symptomCount = data.symptoms?.length || 0
    if (symptomCount > 5) {
      score -= 20
      factors.push("Multiple current symptoms")
    } else if (symptomCount > 2) {
      score -= 10
      factors.push("Several current symptoms")
    }

    // Energy level
    if (data.energy < 4) {
      score -= 15
      factors.push("Low energy levels")
    } else if (data.energy < 6) {
      score -= 8
    }

    // Chronic conditions
    const conditionCount = data.conditions?.length || 0
    if (conditionCount > 2) {
      score -= 25
      factors.push("Multiple chronic conditions")
    } else if (conditionCount > 0) {
      score -= 15
      factors.push("Chronic health conditions")
    }

    // Medications
    if (data.medications === "many") {
      score -= 15
      factors.push("Multiple medications")
    } else if (data.medications === "several") {
      score -= 8
    }

    // Last checkup
    if (data.lastCheckup === "very-old") {
      score -= 10
      factors.push("Overdue for medical checkup")
    } else if (data.lastCheckup === "old") {
      score -= 5
    }

    // Stress level
    if (data.stress > 8) {
      score -= 15
      factors.push("High stress levels")
    } else if (data.stress > 6) {
      score -= 8
    }

    // Mood
    if (data.mood === "poor") {
      score -= 20
      factors.push("Poor mental health")
    } else if (data.mood === "fair") {
      score -= 10
    }

    // Social support
    if (data.support === "none") {
      score -= 15
      factors.push("Lack of social support")
    } else if (data.support === "limited") {
      score -= 8
    }

    return { score: Math.max(0, Math.min(100, score)), factors }
  }

  const { score, factors } = calculateHealthScore()
  const medicationRecommendations = getMedicationRecommendations(data.symptoms)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Attention"
  }

  const getRecommendation = (score: number) => {
    if (score >= 80) {
      return {
        title: "Great Health Status!",
        message: "Your health assessment shows excellent results. Continue your healthy lifestyle habits.",
        action: "Schedule routine checkup",
        urgency: "low",
      }
    } else if (score >= 60) {
      return {
        title: "Good Health with Room for Improvement",
        message: "Your health is generally good, but there are areas where you can make positive changes.",
        action: "Consider lifestyle improvements",
        urgency: "low",
      }
    } else if (score >= 40) {
      return {
        title: "Health Concerns Identified",
        message: "Several factors may be affecting your health. Consider consulting with a healthcare provider.",
        action: "Schedule appointment within 2-4 weeks",
        urgency: "medium",
      }
    } else {
      return {
        title: "Immediate Attention Recommended",
        message: "Your assessment indicates significant health concerns that require professional medical attention.",
        action: "Schedule appointment within 1 week",
        urgency: "high",
      }
    }
  }

  const recommendation = getRecommendation(score)

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Health Score Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="font-display text-3xl text-gray-900 dark:text-white mb-2">
                Your Health Score
              </CardTitle>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke={score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : score >= 40 ? "#f97316" : "#ef4444"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(score / 100) * 314} 314`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">out of 100</div>
                    </div>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`text-lg px-4 py-2 ${
                  score >= 80
                    ? "border-green-300 text-green-700 bg-green-50 dark:border-green-600 dark:text-green-400 dark:bg-green-950"
                    : score >= 60
                      ? "border-yellow-300 text-yellow-700 bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:bg-yellow-950"
                      : score >= 40
                        ? "border-orange-300 text-orange-700 bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:bg-orange-950"
                        : "border-red-300 text-red-700 bg-red-50 dark:border-red-600 dark:text-red-400 dark:bg-red-950"
                }`}
              >
                {getScoreLabel(score)}
              </Badge>
            </CardHeader>
          </Card>

          {/* Recommendation Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="font-display text-xl text-gray-900 dark:text-white">
                {recommendation.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{recommendation.message}</p>
              <div
                className={`p-4 rounded-lg border ${
                  recommendation.urgency === "high"
                    ? "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                    : recommendation.urgency === "medium"
                      ? "bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800"
                      : "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">Recommended Action:</span>
                  <span>{recommendation.action}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {medicationRecommendations.length > 0 && (
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="font-display text-xl text-gray-900 dark:text-white">
                  Medication Recommendations
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Based on your reported symptoms. Always consult a healthcare provider before taking any medication.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {medicationRecommendations.map((rec, index) => (
                    <div key={index} className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{rec.condition}</h4>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {rec.medications.map((med, medIndex) => (
                            <Badge
                              key={medIndex}
                              variant="secondary"
                              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                            >
                              {med}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">{rec.note}</p>
                      </div>
                    </div>
                  ))}
                  <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-yellow-800 dark:text-yellow-200">Important Disclaimer</p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                          These are general recommendations for common symptoms. Always consult with a qualified
                          healthcare provider before starting any medication. If symptoms persist or worsen, seek
                          immediate medical attention.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Risk Factors Card */}
          {factors.length > 0 && (
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="font-display text-xl text-gray-900 dark:text-white">
                  Areas for Improvement
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Factors that may be affecting your health score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {factors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/doctors" className="flex-1">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3">Find a Doctor</Button>
            </Link>
            <Button variant="outline" onClick={onRestart} className="flex-1 py-3 bg-transparent">
              Retake Assessment
            </Button>
            <Button variant="outline" className="flex-1 py-3 bg-transparent">
              Download Report
            </Button>
          </div>

          {/* Health Tips */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="font-display text-xl text-gray-900 dark:text-white">
                Personalized Health Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Lifestyle Improvements</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                      <span>Aim for 150 minutes of moderate exercise per week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                      <span>Maintain 7-9 hours of quality sleep nightly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                      <span>Practice stress management techniques</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Preventive Care</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                      <span>Schedule regular health screenings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                      <span>Stay up to date with vaccinations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                      <span>Monitor key health metrics regularly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

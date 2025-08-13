"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface HealthQuestionnaireProps {
  step: number
  onComplete: (data: any) => void
  existingData: any
}

export function HealthQuestionnaire({ step, onComplete, existingData }: HealthQuestionnaireProps) {
  const [formData, setFormData] = useState<any>({})

  const handleSubmit = () => {
    onComplete(formData)
  }

  const updateFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  const renderStep = () => {
    switch (step) {
      case 0: // Basic Information
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  onChange={(e) => updateFormData("age", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  onChange={(e) => updateFormData("height", Number.parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  onChange={(e) => updateFormData("weight", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup onValueChange={(value) => updateFormData("gender", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 1: // Lifestyle Factors
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Exercise Frequency</Label>
              <RadioGroup onValueChange={(value) => updateFormData("exercise", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily (7 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="frequent" id="frequent" />
                  <Label htmlFor="frequent">Frequent (4-6 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate (2-3 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasional" id="occasional" />
                  <Label htmlFor="occasional">Occasional (1 day/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="never" />
                  <Label htmlFor="never">Never</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Sleep Quality (1-10)</Label>
              <Slider
                defaultValue={[7]}
                max={10}
                min={1}
                step={1}
                onValueChange={(value) => updateFormData("sleep", value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Poor (1)</span>
                <span>Excellent (10)</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Smoking Status</Label>
              <RadioGroup onValueChange={(value) => updateFormData("smoking", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="smoke-never" />
                  <Label htmlFor="smoke-never">Never smoked</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="former" id="smoke-former" />
                  <Label htmlFor="smoke-former">Former smoker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="smoke-current" />
                  <Label htmlFor="smoke-current">Current smoker</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Alcohol Consumption</Label>
              <RadioGroup onValueChange={(value) => updateFormData("alcohol", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="alcohol-none" />
                  <Label htmlFor="alcohol-none">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="alcohol-light" />
                  <Label htmlFor="alcohol-light">Light (1-3 drinks/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="alcohol-moderate" />
                  <Label htmlFor="alcohol-moderate">Moderate (4-7 drinks/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heavy" id="alcohol-heavy" />
                  <Label htmlFor="alcohol-heavy">Heavy (8+ drinks/week)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 2: // Current Symptoms
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Current Symptoms (Check all that apply)</Label>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Headache",
                  "Fatigue",
                  "Chest pain",
                  "Shortness of breath",
                  "Nausea",
                  "Dizziness",
                  "Joint pain",
                  "Back pain",
                  "Sleep problems",
                  "Anxiety",
                  "Depression",
                  "Digestive issues",
                  "Fever",
                  "Cough",
                  "Sore throat",
                  "Runny nose",
                  "Muscle aches",
                  "Abdominal pain",
                  "Constipation",
                  "Diarrhea",
                  "Heartburn",
                  "Loss of appetite",
                  "Weight loss",
                  "Weight gain",
                  "Frequent urination",
                  "Skin rash",
                  "Itching",
                  "Blurred vision",
                  "Eye pain",
                  "Ear pain",
                  "Hearing problems",
                  "Memory problems",
                  "Concentration issues",
                  "Mood swings",
                  "Irritability",
                  "Numbness/tingling",
                  "Swelling",
                  "Bruising",
                  "Hair loss",
                  "Night sweats",
                  "Cold hands/feet",
                  "Palpitations",
                  "High blood pressure",
                  "Low blood pressure",
                  "Allergic reactions",
                  "Snoring",
                  "Leg cramps",
                  "Varicose veins",
                  "Dry mouth",
                  "Bad breath",
                ].map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      onCheckedChange={(checked) => {
                        const symptoms = formData.symptoms || []
                        if (checked) {
                          updateFormData("symptoms", [...symptoms, symptom])
                        } else {
                          updateFormData(
                            "symptoms",
                            symptoms.filter((s: string) => s !== symptom),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={symptom}>{symptom}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Overall Energy Level (1-10)</Label>
              <Slider
                defaultValue={[5]}
                max={10}
                min={1}
                step={1}
                onValueChange={(value) => updateFormData("energy", value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Very Low (1)</span>
                <span>Very High (10)</span>
              </div>
            </div>

            <div>
              <Label htmlFor="symptom-details">Additional Symptom Details</Label>
              <Textarea
                id="symptom-details"
                placeholder="Describe any other symptoms or concerns..."
                onChange={(e) => updateFormData("symptomDetails", e.target.value)}
              />
            </div>
          </div>
        )

      case 3: // Medical History
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Chronic Conditions (Check all that apply)</Label>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Diabetes",
                  "Hypertension",
                  "Heart disease",
                  "Asthma",
                  "Arthritis",
                  "Depression",
                  "Anxiety",
                  "High cholesterol",
                  "Thyroid disorder",
                  "Kidney disease",
                ].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      onCheckedChange={(checked) => {
                        const conditions = formData.conditions || []
                        if (checked) {
                          updateFormData("conditions", [...conditions, condition])
                        } else {
                          updateFormData(
                            "conditions",
                            conditions.filter((c: string) => c !== condition),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={condition}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Current Medications</Label>
              <RadioGroup onValueChange={(value) => updateFormData("medications", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="med-none" />
                  <Label htmlFor="med-none">No medications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="few" id="med-few" />
                  <Label htmlFor="med-few">1-2 medications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="several" id="med-several" />
                  <Label htmlFor="med-several">3-5 medications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="many" id="med-many" />
                  <Label htmlFor="med-many">6+ medications</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Last Medical Checkup</Label>
              <RadioGroup onValueChange={(value) => updateFormData("lastCheckup", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recent" id="checkup-recent" />
                  <Label htmlFor="checkup-recent">Within 6 months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="year" id="checkup-year" />
                  <Label htmlFor="checkup-year">6 months - 1 year ago</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="old" id="checkup-old" />
                  <Label htmlFor="checkup-old">1-2 years ago</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-old" id="checkup-very-old" />
                  <Label htmlFor="checkup-very-old">More than 2 years ago</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 4: // Mental Health
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Stress Level (1-10)</Label>
              <Slider
                defaultValue={[5]}
                max={10}
                min={1}
                step={1}
                onValueChange={(value) => updateFormData("stress", value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Very Low (1)</span>
                <span>Very High (10)</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Mood in the Past 2 Weeks</Label>
              <RadioGroup onValueChange={(value) => updateFormData("mood", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="mood-excellent" />
                  <Label htmlFor="mood-excellent">Excellent - feeling great most days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="mood-good" />
                  <Label htmlFor="mood-good">Good - generally positive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fair" id="mood-fair" />
                  <Label htmlFor="mood-fair">Fair - ups and downs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="mood-poor" />
                  <Label htmlFor="mood-poor">Poor - often feeling down</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Social Support</Label>
              <RadioGroup onValueChange={(value) => updateFormData("support", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="strong" id="support-strong" />
                  <Label htmlFor="support-strong">Strong - good family/friend support</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="support-moderate" />
                  <Label htmlFor="support-moderate">Moderate - some support available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="limited" id="support-limited" />
                  <Label htmlFor="support-limited">Limited - minimal support</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="support-none" />
                  <Label htmlFor="support-none">None - feeling isolated</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="mental-health-notes">Additional Mental Health Notes</Label>
              <Textarea
                id="mental-health-notes"
                placeholder="Any other mental health concerns or information..."
                onChange={(e) => updateFormData("mentalHealthNotes", e.target.value)}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {renderStep()}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
          {step === 4 ? "Calculate Health Score" : "Continue"}
        </Button>
      </div>
    </div>
  )
}

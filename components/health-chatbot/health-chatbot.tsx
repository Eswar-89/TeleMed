"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function HealthChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI Health Assistant. I can help you with health-related questions, symptom information, and general medical guidance. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getHealthResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Symptom-related responses
    if (message.includes("headache") || message.includes("head pain")) {
      return "Headaches can have various causes including stress, dehydration, lack of sleep, or tension. For frequent or severe headaches, consider: staying hydrated, getting adequate rest, managing stress, and consulting a healthcare provider if symptoms persist or worsen."
    }

    if (message.includes("fever") || message.includes("temperature")) {
      return "Fever is often a sign that your body is fighting an infection. For mild fever: rest, stay hydrated, and monitor your temperature. Seek medical attention if fever exceeds 103°F (39.4°C), persists for more than 3 days, or is accompanied by severe symptoms."
    }

    if (message.includes("cough") || message.includes("cold")) {
      return "Coughs can be caused by viral infections, allergies, or irritants. For relief: stay hydrated, use honey for sore throat, rest, and avoid irritants. See a doctor if cough persists over 2 weeks, produces blood, or is accompanied by high fever."
    }

    if (message.includes("stomach") || message.includes("nausea") || message.includes("digestive")) {
      return "Digestive issues can result from diet, stress, or infections. General advice: eat bland foods (BRAT diet), stay hydrated, avoid dairy and fatty foods temporarily. Consult a healthcare provider for persistent symptoms or severe pain."
    }

    // General health topics
    if (message.includes("exercise") || message.includes("fitness")) {
      return "Regular exercise is crucial for health! Aim for 150 minutes of moderate aerobic activity weekly, plus strength training twice a week. Start slowly if you're new to exercise, and consult your doctor before beginning any new fitness program."
    }

    if (message.includes("diet") || message.includes("nutrition") || message.includes("food")) {
      return "A balanced diet includes fruits, vegetables, whole grains, lean proteins, and healthy fats. Stay hydrated, limit processed foods and added sugars. Consider consulting a nutritionist for personalized dietary advice."
    }

    if (message.includes("sleep") || message.includes("insomnia")) {
      return "Good sleep hygiene includes: maintaining a consistent sleep schedule, creating a comfortable sleep environment, avoiding screens before bed, and limiting caffeine. Adults need 7-9 hours of sleep nightly. Consult a doctor for persistent sleep issues."
    }

    if (message.includes("stress") || message.includes("anxiety") || message.includes("mental health")) {
      return "Managing stress is important for overall health. Try relaxation techniques, regular exercise, adequate sleep, and social support. For persistent anxiety or mental health concerns, consider speaking with a mental health professional."
    }

    // Medication-related
    if (message.includes("medication") || message.includes("medicine") || message.includes("drug")) {
      return "Always take medications as prescribed by your healthcare provider. Don't stop or change dosages without consulting your doctor. Keep a list of all medications and inform healthcare providers about all drugs and supplements you're taking."
    }

    // Emergency situations
    if (message.includes("emergency") || message.includes("urgent") || message.includes("severe pain")) {
      return "For medical emergencies, call emergency services immediately. Seek urgent care for: chest pain, difficulty breathing, severe injuries, signs of stroke, or any life-threatening symptoms. Don't delay emergency care."
    }

    // Default response
    return "I understand you're asking about a health concern. While I can provide general health information, it's important to consult with a qualified healthcare provider for personalized medical advice, diagnosis, or treatment. Is there a specific health topic you'd like general information about?"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getHealthResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === "user" ? "bg-emerald-600 text-white" : "bg-purple-600 text-white"
              }`}
            >
              {message.sender === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your health concerns..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </Card>
  )
}

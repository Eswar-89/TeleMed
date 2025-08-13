"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const getQuickResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! I'm here to help with your health questions. What would you like to know?"
    }

    if (message.includes("headache")) {
      return "For headaches, try rest, hydration, and stress management. See a doctor if severe or persistent."
    }

    if (message.includes("fever")) {
      return "Monitor your temperature, stay hydrated, and rest. Seek medical care if fever exceeds 103°F or persists."
    }

    return "I can help with general health information. For detailed assistance, visit our Health Chatbot page or consult a healthcare provider."
  }

  const handleSendMessage = () => {
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

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getQuickResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 h-96 flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300 border-0">
          <div className="flex items-center justify-between p-3 border-b bg-emerald-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot size={20} className="animate-pulse" />
              <span className="font-medium">Health Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-emerald-700 h-6 w-6 p-0 transition-all duration-200 hover:scale-110"
            >
              <X size={16} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105 ${
                    message.sender === "user"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
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
          </div>

          <div className="border-t p-2">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about health..."
                className="flex-1 text-sm transition-all duration-200 focus:scale-105"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50"
              >
                <Send size={14} />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 animate-pulse"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </Button>
      )}
    </div>
  )
}

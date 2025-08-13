import { Navigation } from "@/components/navigation"
import { HealthChatbot } from "@/components/health-chatbot/health-chatbot"

export default function HealthChatbotPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-sans">Health Chatbot</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant answers to your health questions from our AI-powered assistant. Ask about symptoms, medications,
            treatments, or general health advice.
          </p>
        </div>
        <HealthChatbot />
      </div>
    </main>
  )
}

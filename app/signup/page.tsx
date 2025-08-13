import { Navigation } from "@/components/navigation"
import { AuthForm } from "@/components/auth/auth-form"

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <section className="py-20 bg-gradient-to-br from-emerald-50/50 to-purple-50/50 dark:from-emerald-950/20 dark:to-purple-950/20">
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-4xl text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join thousands of users managing their health</p>
          </div>
          <AuthForm mode="signup" />
        </div>
      </section>
    </main>
  )
}

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Your AI Health
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              {" "}
              Assistant
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            One click, countless answers know your health before it knows you. Your first step to care is just one click
            away. Your pocket health advisor symptoms in, advice out.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Link href="/health-score">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Start Health Assessment
              </Button>
            </Link>
            <Link href="/doctors">
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 bg-transparent"
              >
                Find a Doctor
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem]">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-purple-50 dark:from-emerald-950 dark:to-purple-950 opacity-60 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] animate-pulse"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-bounce delay-3000"></div>
        </div>
      </div>
    </section>
  )
}

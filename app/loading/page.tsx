import { HeartPumpingLoader } from "@/components/heart-pumping-loader"

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <HeartPumpingLoader />
    </div>
  )
}

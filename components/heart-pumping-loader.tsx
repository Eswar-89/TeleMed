export function HeartPumpingLoader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 24 24" className="heart-pump text-red-500 drop-shadow-lg">
          <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="heart-pulse-ring-1 w-32 h-32 border-2 border-red-300 rounded-full opacity-30"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="heart-pulse-ring-2 w-40 h-40 border-2 border-red-200 rounded-full opacity-20"></div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground animate-pulse">Loading Your Health Data</h2>
        <p className="text-muted-foreground">Please wait while we prepare your personalized experience...</p>
      </div>

      <div className="flex space-x-2">
        <div className="heartbeat-dot w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="heartbeat-dot w-3 h-3 bg-red-400 rounded-full animation-delay-200"></div>
        <div className="heartbeat-dot w-3 h-3 bg-red-300 rounded-full animation-delay-400"></div>
      </div>
    </div>
  )
}

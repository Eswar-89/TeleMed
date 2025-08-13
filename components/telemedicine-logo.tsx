export function TelemedicineLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg viewBox="0 0 200 60" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Medical Cross with Pulse */}
        <g>
          {/* ECG Background Line */}
          <path d="M10 30 L190 30" stroke="url(#pulseGradient)" strokeWidth="1" fill="none" opacity="0.3" />

          {/* Animated ECG Pulse Line */}
          <path
            d="M10 30 L20 30 L25 20 L30 40 L35 15 L40 35 L45 25 L50 30 L60 30"
            stroke="url(#pulseGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ecg-pulse"
          />

          {/* Moving ECG Dot */}
          <circle cx="30" cy="30" r="3" fill="#10b981" className="ecg-dot">
            <animate attributeName="cx" values="10;60;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="30;30;20;40;15;35;25;30;30" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Medical Cross */}
          <rect x="65" y="20" width="20" height="6" rx="3" fill="url(#crossGradient)" />
          <rect x="71" y="14" width="8" height="18" rx="4" fill="url(#crossGradient)" />

          {/* Digital Elements with pulse */}
          <circle cx="90" cy="18" r="2" fill="#10b981" opacity="0.8" className="pulse-dot" />
          <circle
            cx="90"
            cy="30"
            r="2"
            fill="#8b5cf6"
            opacity="0.8"
            className="pulse-dot"
            style={{ animationDelay: "0.3s" }}
          />
          <circle
            cx="90"
            cy="42"
            r="2"
            fill="#10b981"
            opacity="0.8"
            className="pulse-dot"
            style={{ animationDelay: "0.6s" }}
          />
        </g>

        {/* Text */}
        <text x="105" y="25" className="fill-foreground font-display font-bold text-lg">
          TeleMed
        </text>
        <text x="105" y="42" className="fill-emerald-400 font-sans text-sm">
          AI Health
        </text>

        {/* Gradients */}
        <defs>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

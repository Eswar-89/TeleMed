"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { TelemedicineLogo } from "@/components/telemedicine-logo"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <TelemedicineLogo className="h-10 w-auto" />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/diseases"
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Diseases
              </Link>
              <Link
                href="/doctors"
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Doctors
              </Link>
              <Link
                href="/health-score"
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Health Score
              </Link>
              <Link
                href="/health-chatbot"
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Health Chatbot
              </Link>
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setIsAuthenticated(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border-gray-300 dark:border-gray-600 hover:border-emerald-600 dark:hover:border-emerald-400 bg-transparent"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/signin">
                    <Button
                      variant="ghost"
                      className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Home
              </Link>
              <Link
                href="/diseases"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Diseases
              </Link>
              <Link
                href="/doctors"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Doctors
              </Link>
              <Link
                href="/health-score"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Health Score
              </Link>
              <Link
                href="/health-chatbot"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Health Chatbot
              </Link>
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Dashboard
                </Link>
              )}
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center px-3 space-x-3">
                  {isAuthenticated ? (
                    <Button
                      variant="ghost"
                      onClick={() => setIsAuthenticated(false)}
                      className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <Link href="/signin">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

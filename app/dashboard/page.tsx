"use client";

import { Navigation } from "@/components/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments";
import { HealthInsights } from "@/components/dashboard/health-insights";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <DashboardHeader />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <DashboardStats />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <UpcomingAppointments />
              <RecentActivity />
            </div>
            <div>
              <HealthInsights />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

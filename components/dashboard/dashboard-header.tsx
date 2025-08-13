export function DashboardHeader() {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl text-gray-900">Welcome back, Sarah!</h1>
            <p className="text-gray-600 mt-1">Here's your health overview for today</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last health check</p>
              <p className="font-medium text-gray-900">2 weeks ago</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

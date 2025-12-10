import { Users, Home, TrendingUp, DollarSign } from 'lucide-react'

export default function AdminStats({ stats }) {
  const statsData = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Total Properties',
      value: stats?.totalProperties || 0,
      icon: Home,
      color: 'blue',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Active Listings',
      value: stats?.activeProperties || 0,
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Sold Properties',
      value: stats?.soldProperties || 0,
      icon: DollarSign,
      color: 'orange',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <Icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
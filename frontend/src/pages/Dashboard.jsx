import { useAuth } from '../hooks/useAuth'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Award, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()

  const getDashboardContent = () => {
    switch (user?.role) {
      case 'admin':
      case 'superadmin':
        return <AdminDashboard user={user} />
      case 'teacher':
        return <TeacherDashboard user={user} />
      case 'student':
        return <StudentDashboard user={user} />
      case 'parent':
        return <ParentDashboard user={user} />
      default:
        return <DefaultDashboard user={user} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-lg font-medium text-white">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-sm text-gray-500 capitalize">
                {user?.role} Dashboard
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role-specific Dashboard Content */}
      {getDashboardContent()}
    </div>
  )
}

const AdminDashboard = ({ user }) => {
  const stats = [
    { name: 'Total Students', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { name: 'Total Teachers', value: '89', icon: Users, color: 'bg-green-500' },
    { name: 'Active Courses', value: '45', icon: BookOpen, color: 'bg-purple-500' },
    { name: 'Attendance Rate', value: '94%', icon: TrendingUp, color: 'bg-yellow-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">New student John Doe registered</span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-600">Teacher Sarah Wilson submitted grades</span>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">New course "Advanced Mathematics" created</span>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TeacherDashboard = ({ user }) => {
  const stats = [
    { name: 'My Classes', value: '6', icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Total Students', value: '156', icon: Users, color: 'bg-green-500' },
    { name: 'Pending Assignments', value: '12', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Average Grade', value: 'B+', icon: Award, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Today's Schedule
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Mathematics - Grade 10A</p>
                <p className="text-sm text-gray-600">Room 201</p>
              </div>
              <span className="text-sm font-medium text-blue-600">9:00 - 10:00 AM</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Physics - Grade 11B</p>
                <p className="text-sm text-gray-600">Lab 1</p>
              </div>
              <span className="text-sm font-medium text-green-600">11:00 AM - 12:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StudentDashboard = ({ user }) => {
  const stats = [
    { name: 'Enrolled Courses', value: '8', icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Assignments Due', value: '3', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Current GPA', value: '3.8', icon: Award, color: 'bg-green-500' },
    { name: 'Attendance', value: '96%', icon: Calendar, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Upcoming Assignments */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Upcoming Assignments
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Mathematics Quiz</p>
                <p className="text-sm text-gray-600">Chapter 5: Calculus</p>
              </div>
              <span className="text-sm font-medium text-red-600">Due Tomorrow</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">History Essay</p>
                <p className="text-sm text-gray-600">World War II Analysis</p>
              </div>
              <span className="text-sm font-medium text-yellow-600">Due in 3 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ParentDashboard = ({ user }) => {
  const stats = [
    { name: 'Children', value: '2', icon: Users, color: 'bg-blue-500' },
    { name: 'Avg Attendance', value: '94%', icon: Calendar, color: 'bg-green-500' },
    { name: 'Avg Grade', value: 'A-', icon: Award, color: 'bg-purple-500' },
    { name: 'Notifications', value: '5', icon: AlertCircle, color: 'bg-yellow-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Children Overview */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Children Overview
          </h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Emma Johnson</h4>
                  <p className="text-sm text-gray-600">Grade 10A</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">GPA: 3.9</p>
                  <p className="text-xs text-gray-500">Attendance: 96%</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Michael Johnson</h4>
                  <p className="text-sm text-gray-600">Grade 8B</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">GPA: 3.7</p>
                  <p className="text-xs text-gray-500">Attendance: 92%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DefaultDashboard = ({ user }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
          Welcome to School Management System
        </h3>
        <p className="text-gray-600">
          Your dashboard is being prepared. Please contact your administrator for access.
        </p>
      </div>
    </div>
  )
}

export default Dashboard 
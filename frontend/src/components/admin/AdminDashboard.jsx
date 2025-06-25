import React from 'react';
import { useQuery } from 'react-query';
import { 
  Users, 
  Building, 
  Calendar, 
  TrendingUp,
  UserCheck,
  BookOpen
} from 'lucide-react';
import { adminService } from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';

const StatCard = ({ title, value, icon: Icon, color, loading }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg font-medium text-gray-900">
              {loading ? (
                <div className="animate-pulse h-6 bg-gray-200 rounded w-16"></div>
              ) : (
                value
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery(
    'adminStats',
    async () => {
      const response = await adminService.getDashboardStats();
      return response.data.data;
    },
    {
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const statsData = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Students',
      value: stats?.activeStudents || 0,
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      title: 'Teachers',
      value: stats?.totalTeachers || 0,
      icon: BookOpen,
      color: 'text-purple-600'
    },
    {
      title: 'Departments',
      value: stats?.totalDepartments || 0,
      icon: Building,
      color: 'text-orange-600'
    },
    {
      title: 'Academic Years',
      value: stats?.totalAcademicYears || 0,
      icon: Calendar,
      color: 'text-indigo-600'
    },
    {
      title: 'System Health',
      value: stats?.systemHealth || 'Good',
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your school management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            loading={isLoading}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {stats?.recentActivity?.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Users className="h-4 w-4 mr-2" />
              Add User
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <Building className="h-4 w-4 mr-2" />
              Add Department
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <Calendar className="h-4 w-4 mr-2" />
              New Academic Year
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 
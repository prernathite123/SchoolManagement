import React, { useState, useEffect } from 'react';
import { 
  DocumentChartBarIcon,
  UsersIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../LoadingSpinner';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('this-month');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const reportTypes = [
    {
      id: 'overview',
      name: 'System Overview',
      description: 'General statistics and metrics',
      icon: ChartBarIcon,
      color: 'blue'
    },
    {
      id: 'users',
      name: 'User Reports',
      description: 'User registration and activity reports',
      icon: UsersIcon,
      color: 'green'
    },
    {
      id: 'academic',
      name: 'Academic Reports',
      description: 'Academic performance and progress',
      icon: AcademicCapIcon,
      color: 'purple'
    },
    {
      id: 'departments',
      name: 'Department Reports',
      description: 'Department-wise analytics',
      icon: BuildingOfficeIcon,
      color: 'orange'
    },
    {
      id: 'attendance',
      name: 'Attendance Reports',
      description: 'Student and staff attendance tracking',
      icon: CalendarIcon,
      color: 'red'
    },
    {
      id: 'financial',
      name: 'Financial Reports',
      description: 'Fee collection and financial analytics',
      icon: DocumentTextIcon,
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200'
    };
    return colors[color] || colors.blue;
  };

  const mockOverviewData = {
    totalUsers: 1247,
    totalStudents: 980,
    totalTeachers: 65,
    totalDepartments: 8,
    activeClasses: 32,
    completedAssignments: 1580,
    pendingApplications: 23,
    recentActivities: [
      { action: 'New student registered', user: 'John Doe', time: '2 hours ago' },
      { action: 'Class scheduled', user: 'Dr. Smith', time: '4 hours ago' },
      { action: 'Report generated', user: 'Admin', time: '6 hours ago' },
      { action: 'Assignment submitted', user: 'Jane Smith', time: '1 day ago' }
    ]
  };

  const handleDownloadReport = (reportType) => {
    // Mock download functionality
    alert(`Downloading ${reportType} report...`);
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{mockOverviewData.totalUsers.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center">
            <AcademicCapIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{mockOverviewData.totalStudents.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{mockOverviewData.totalTeachers}</h3>
              <p className="text-sm text-gray-600">Teachers</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{mockOverviewData.totalDepartments}</h3>
              <p className="text-sm text-gray-600">Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <DocumentChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockOverviewData.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGenericReport = (reportType) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center py-12">
        <DocumentChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          {reportTypes.find(r => r.id === reportType)?.name} Coming Soon
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This report is currently under development and will be available soon.
        </p>
        <button
          onClick={() => handleDownloadReport(reportType)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Download Sample Report
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and view various reports for data-driven decisions</p>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Date Range:</label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <button
            onClick={() => handleDownloadReport(selectedReport)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {reportTypes.map((report) => {
          const IconComponent = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                selectedReport === report.id
                  ? `border-${report.color}-500 ${getColorClasses(report.color)}`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <IconComponent className={`h-6 w-6 ${
                  selectedReport === report.id ? '' : 'text-gray-600'
                }`} />
                <h3 className={`ml-2 font-semibold ${
                  selectedReport === report.id ? '' : 'text-gray-900'
                }`}>
                  {report.name}
                </h3>
              </div>
              <p className={`text-sm ${
                selectedReport === report.id ? '' : 'text-gray-600'
              }`}>
                {report.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Report Content */}
      <div className="report-content">
        {selectedReport === 'overview' ? renderOverviewReport() : renderGenericReport(selectedReport)}
      </div>
    </div>
  );
};

export default Reports; 
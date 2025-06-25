import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Departments', href: '/admin/departments', icon: Building },
    { name: 'Academic Years', href: '/admin/academic-years', icon: Calendar },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <AdminSidebarContent navigation={navigation} location={location} user={user} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <AdminSidebarContent navigation={navigation} location={location} user={user} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <Link 
                to="/dashboard" 
                className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Main
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Panel - {getPageTitle(location.pathname)}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</div>
                  <div className="text-xs text-red-600 capitalize font-medium">Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const AdminSidebarContent = ({ navigation, location, user }) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-red-600">
        <Settings className="h-8 w-8 text-white" />
        <span className="ml-2 text-white font-bold text-lg">Admin Panel</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || 
              (item.href === '/admin' && location.pathname === '/admin/');
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors duration-150`}
              >
                <Icon
                  className={`${
                    isActive ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs font-medium text-red-600">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getPageTitle = (pathname) => {
  const titles = {
    '/admin': 'Dashboard',
    '/admin/': 'Dashboard',
    '/admin/users': 'User Management',
    '/admin/departments': 'Departments',
    '/admin/academic-years': 'Academic Years',
    '/admin/reports': 'Reports',
    '/admin/settings': 'Settings',
  };
  return titles[pathname] || 'Admin';
};

export default AdminLayout; 
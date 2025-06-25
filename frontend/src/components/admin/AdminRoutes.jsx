import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import DepartmentManagement from './DepartmentManagement';
import AcademicYearManagement from './AcademicYearManagement';
import Reports from './Reports';

const AdminSettings = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-600">Settings page coming soon...</p>
    </div>
  </div>
);

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="departments" element={<DepartmentManagement />} />
        <Route path="academic-years" element={<AcademicYearManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 
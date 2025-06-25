import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  UsersIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../LoadingSpinner';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  // Mock data for now
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDepartments([
        {
          id: 1,
          name: 'Computer Science',
          code: 'CS',
          description: 'Department of Computer Science and Information Technology',
          head: 'Dr. John Smith',
          totalTeachers: 15,
          totalStudents: 320,
          totalClasses: 8,
          status: 'active',
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          name: 'Mathematics',
          code: 'MATH',
          description: 'Department of Mathematics and Statistics',
          head: 'Dr. Jane Doe',
          totalTeachers: 12,
          totalStudents: 280,
          totalClasses: 6,
          status: 'active',
          createdAt: '2024-01-10'
        },
        {
          id: 3,
          name: 'Physics',
          code: 'PHY',
          description: 'Department of Physics and Applied Sciences',
          head: 'Dr. Mike Johnson',
          totalTeachers: 10,
          totalStudents: 180,
          totalClasses: 5,
          status: 'active',
          createdAt: '2024-01-20'
        },
        {
          id: 4,
          name: 'English Literature',
          code: 'ENG',
          description: 'Department of English Language and Literature',
          head: 'Prof. Sarah Wilson',
          totalTeachers: 8,
          totalStudents: 150,
          totalClasses: 4,
          status: 'inactive',
          createdAt: '2024-01-05'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    setEditingDepartment(null);
    setShowAddModal(true);
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);
    setShowAddModal(true);
  };

  const handleDeleteDepartment = (deptId) => {
    if (window.confirm('Are you sure you want to delete this department? This action cannot be undone.')) {
      setDepartments(departments.filter(dept => dept.id !== deptId));
    }
  };

  const getTotalStats = () => {
    return departments.reduce((acc, dept) => ({
      teachers: acc.teachers + dept.totalTeachers,
      students: acc.students + dept.totalStudents,
      classes: acc.classes + dept.totalClasses
    }), { teachers: 0, students: 0, classes: 0 });
  };

  const stats = getTotalStats();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Department Management</h1>
        <p className="text-gray-600">Manage academic departments and their details</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{departments.length}</h3>
              <p className="text-sm text-gray-600">Total Departments</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <AcademicCapIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{stats.teachers}</h3>
              <p className="text-sm text-gray-600">Total Teachers</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{stats.students}</h3>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{stats.classes}</h3>
              <p className="text-sm text-gray-600">Total Classes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Add Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={handleAddDepartment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add Department
          </button>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                    <p className="text-sm text-gray-500">Code: {department.code}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  department.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {department.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {department.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Department Head:</span>
                  <span className="font-medium text-gray-900">{department.head}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Teachers:</span>
                  <span className="font-medium text-gray-900">{department.totalTeachers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium text-gray-900">{department.totalStudents}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Classes:</span>
                  <span className="font-medium text-gray-900">{department.totalClasses}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Created: {new Date(department.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditDepartment(department)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                    title="Edit department"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                    title="Delete department"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No departments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'Try adjusting your search criteria.' 
              : 'Get started by adding a new department.'}
          </p>
        </div>
      )}

      {/* Add/Edit Modal placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingDepartment ? 'Edit Department' : 'Add New Department'}
            </h3>
            <p className="text-gray-600 mb-4">
              Department form coming soon...
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingDepartment ? 'Update' : 'Add'} Department
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement; 
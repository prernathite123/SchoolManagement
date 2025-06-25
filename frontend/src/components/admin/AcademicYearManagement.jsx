import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { 
  Calendar, 
  Plus, 
  Edit,
  Trash2,
  Clock,
  CheckCircle
} from 'lucide-react';
import { adminService } from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';
import toast from 'react-hot-toast';

const AcademicYearCard = ({ academicYear, onEdit, onDelete, onSetCurrent }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-full ${
          academicYear.isCurrent ? 'bg-green-100' : 'bg-blue-100'
        }`}>
          <Calendar className={`h-6 w-6 ${
            academicYear.isCurrent ? 'text-green-600' : 'text-blue-600'
          }`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{academicYear.year}</h3>
          <p className="text-sm text-gray-600">
            {new Date(academicYear.startDate).toLocaleDateString()} - 
            {new Date(academicYear.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {!academicYear.isCurrent && (
          <button
            onClick={() => onSetCurrent(academicYear)}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full"
            title="Set as current"
          >
            <CheckCircle className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => onEdit(academicYear)}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(academicYear)}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
    
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>{academicYear.terms?.length || 0} Terms</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {academicYear.isCurrent && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Current
          </span>
        )}
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          academicYear.isActive 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {academicYear.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
    
    {academicYear.terms && academicYear.terms.length > 0 && (
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Terms</p>
        {academicYear.terms.map((term, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="text-sm font-medium text-gray-900">{term.name}</span>
            <span className="text-xs text-gray-600">
              {new Date(term.startDate).toLocaleDateString()} - 
              {new Date(term.endDate).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const AcademicYearModal = ({ isOpen, onClose, academicYear, onSuccess }) => {
  const [formData, setFormData] = useState({
    year: academicYear?.year || '',
    startDate: academicYear?.startDate 
      ? new Date(academicYear.startDate).toISOString().split('T')[0] 
      : '',
    endDate: academicYear?.endDate 
      ? new Date(academicYear.endDate).toISOString().split('T')[0] 
      : '',
    isCurrent: academicYear?.isCurrent || false,
    isActive: academicYear?.isActive ?? true,
    terms: academicYear?.terms || [
      { name: 'First Term', startDate: '', endDate: '', isActive: true },
      { name: 'Second Term', startDate: '', endDate: '', isActive: true },
      { name: 'Third Term', startDate: '', endDate: '', isActive: true }
    ]
  });

  const queryClient = useQueryClient();
  const isEdit = !!academicYear;

  const mutation = useMutation(
    isEdit 
      ? (data) => adminService.updateAcademicYear(academicYear._id, data)
      : adminService.createAcademicYear,
    {
      onSuccess: () => {
        toast.success(`Academic year ${isEdit ? 'updated' : 'created'} successfully`);
        queryClient.invalidateQueries('adminAcademicYears');
        onSuccess();
        onClose();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || `Error ${isEdit ? 'updating' : 'creating'} academic year`);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      terms: formData.terms.map(term => ({
        ...term,
        startDate: new Date(term.startDate),
        endDate: new Date(term.endDate)
      }))
    };
    mutation.mutate(submitData);
  };

  const updateTerm = (index, field, value) => {
    const newTerms = [...formData.terms];
    newTerms[index] = { ...newTerms[index], [field]: value };
    setFormData({ ...formData, terms: newTerms });
  };

  const addTerm = () => {
    setFormData({
      ...formData,
      terms: [...formData.terms, { name: '', startDate: '', endDate: '', isActive: true }]
    });
  };

  const removeTerm = (index) => {
    const newTerms = formData.terms.filter((_, i) => i !== index);
    setFormData({ ...formData, terms: newTerms });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {isEdit ? 'Edit Academic Year' : 'Create New Academic Year'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Academic Year
            </label>
            <input
              type="text"
              required
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
              placeholder="2024-2025"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isCurrent"
                checked={formData.isCurrent}
                onChange={(e) => setFormData({...formData, isCurrent: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isCurrent" className="ml-2 block text-sm text-gray-900">
                Set as Current Academic Year
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>
          </div>
          
          {/* Terms Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Terms</h3>
              <button
                type="button"
                onClick={addTerm}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Term
              </button>
            </div>
            
            {formData.terms.map((term, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Term {index + 1}</h4>
                  {formData.terms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTerm(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Term Name
                    </label>
                    <input
                      type="text"
                      required
                      value={term.name}
                      onChange={(e) => updateTerm(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={term.startDate}
                      onChange={(e) => updateTerm(index, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={term.endDate}
                      onChange={(e) => updateTerm(index, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {mutation.isLoading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AcademicYearManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);

  const queryClient = useQueryClient();

  const { data: academicYears, isLoading, error } = useQuery(
    'adminAcademicYears',
    adminService.getAcademicYears,
    {
      select: (response) => response.data.data,
    }
  );

  const deleteMutation = useMutation(adminService.deleteAcademicYear, {
    onSuccess: () => {
      toast.success('Academic year deleted successfully');
      queryClient.invalidateQueries('adminAcademicYears');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error deleting academic year');
    },
  });

  const handleEdit = (academicYear) => {
    setSelectedAcademicYear(academicYear);
    setShowModal(true);
  };

  const handleDelete = (academicYear) => {
    if (window.confirm(`Are you sure you want to delete ${academicYear.year}?`)) {
      deleteMutation.mutate(academicYear._id);
    }
  };

  const handleCreate = () => {
    setSelectedAcademicYear(null);
    setShowModal(true);
  };

  const handleSetCurrent = (academicYear) => {
    // TODO: Implement set current academic year
    console.log('Set current:', academicYear);
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading academic years</p>
        </div>
      </div>
    );
  }

  const currentAcademicYear = academicYears?.find(ay => ay.isCurrent);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Year Management</h1>
          <p className="text-gray-600">Manage academic years and terms</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Academic Year
        </button>
      </div>

      {/* Current Academic Year Highlight */}
      {currentAcademicYear && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-green-900">
                Current Academic Year: {currentAcademicYear.year}
              </h3>
              <p className="text-green-700">
                {new Date(currentAcademicYear.startDate).toLocaleDateString()} - 
                {new Date(currentAcademicYear.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Academic Years Grid */}
      {academicYears?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicYears.map((academicYear) => (
            <AcademicYearCard
              key={academicYear._id}
              academicYear={academicYear}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetCurrent={handleSetCurrent}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No academic years found</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first academic year</p>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Academic Year
          </button>
        </div>
      )}

      {/* Academic Year Modal */}
      <AcademicYearModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        academicYear={selectedAcademicYear}
        onSuccess={() => {}}
      />
    </div>
  );
};

export default AcademicYearManagement; 
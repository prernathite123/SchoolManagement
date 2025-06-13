import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Camera, Mail, Phone, MapPin, Calendar, User, Save, Edit } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const { user, updateProfile, loading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
      gender: user?.gender || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || '',
        country: user?.address?.country || ''
      }
    }
  })

  const onSubmit = async (data) => {
    const result = await updateProfile(data)
    if (result.success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'academic', name: 'Academic Info', icon: Calendar },
    { id: 'security', name: 'Security', icon: Mail },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-2xl font-medium text-white">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
            </div>
            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? 'Saving...' : 'Save'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <PersonalInfoTab
              user={user}
              isEditing={isEditing}
              register={register}
              errors={errors}
            />
          )}
          {activeTab === 'academic' && (
            <AcademicInfoTab user={user} />
          )}
          {activeTab === 'security' && (
            <SecurityTab user={user} />
          )}
        </div>
      </div>
    </div>
  )
}

const PersonalInfoTab = ({ user, isEditing, register, errors }) => {
  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <p className="mt-1 text-sm text-gray-900">{user?.firstName || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <p className="mt-1 text-sm text-gray-900">{user?.lastName || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-900">{user?.email}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <div className="mt-1 flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-900">{user?.phone || 'Not provided'}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <div className="mt-1 flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-900">
                {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <p className="mt-1 text-sm text-gray-900 capitalize">{user?.gender || 'Not provided'}</p>
          </div>
        </div>

        {user?.address && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="text-sm text-gray-900">
                {user.address.street && <p>{user.address.street}</p>}
                <p>
                  {[user.address.city, user.address.state, user.address.zipCode]
                    .filter(Boolean)
                    .join(', ')}
                </p>
                {user.address.country && <p>{user.address.country}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            className="input mt-1 w-full"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type="text"
            className="input mt-1 w-full"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className="input mt-1 w-full"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="input mt-1 w-full"
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            {...register('dateOfBirth')}
            type="date"
            className="input mt-1 w-full"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            {...register('gender')}
            className="input mt-1 w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Address Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Address</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              {...register('address.street')}
              type="text"
              className="input mt-1 w-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                {...register('address.city')}
                type="text"
                className="input mt-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                {...register('address.state')}
                type="text"
                className="input mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                {...register('address.zipCode')}
                type="text"
                className="input mt-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                {...register('address.country')}
                type="text"
                className="input mt-1 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

const AcademicInfoTab = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</p>
        </div>
        {user?.studentId && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <p className="mt-1 text-sm text-gray-900">{user.studentId}</p>
          </div>
        )}
        {user?.employeeId && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <p className="mt-1 text-sm text-gray-900">{user.employeeId}</p>
          </div>
        )}
        {user?.grade && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <p className="mt-1 text-sm text-gray-900">{user.grade}</p>
          </div>
        )}
        {user?.section && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <p className="mt-1 text-sm text-gray-900">{user.section}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const SecurityTab = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Email Verification</h4>
              <p className="text-sm text-gray-600">
                {user?.isEmailVerified ? 'Your email is verified' : 'Please verify your email'}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              user?.isEmailVerified 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user?.isEmailVerified ? 'Verified' : 'Pending'}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Password</h4>
              <p className="text-sm text-gray-600">Last updated 30 days ago</p>
            </div>
            <button className="btn btn-outline">
              Change Password
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <button className="btn btn-outline">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
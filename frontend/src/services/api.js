import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance
export const authAPI = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
authAPI.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
      toast.error('Session expired. Please login again.')
    }
    
    return Promise.reject(error)
  }
)

// Auth API endpoints
export const authService = {
  login: (credentials) => authAPI.post('/auth/login', credentials),
  register: (userData) => authAPI.post('/auth/register', userData),
  logout: () => authAPI.post('/auth/logout'),
  getMe: () => authAPI.get('/auth/me'),
  updateProfile: (profileData) => authAPI.put('/users/profile', profileData),
  forgotPassword: (email) => authAPI.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => authAPI.put('/auth/reset-password', { token, password }),
  verifyEmail: (token) => authAPI.post('/auth/verify-email', { token }),
}

// User API endpoints
export const userService = {
  getProfile: () => authAPI.get('/users/profile'),
  updateProfile: (profileData) => authAPI.put('/users/profile', profileData),
  getAllUsers: () => authAPI.get('/users'),
  getUserById: (id) => authAPI.get(`/users/${id}`),
  updateUser: (id, userData) => authAPI.put(`/users/${id}`, userData),
  deleteUser: (id) => authAPI.delete(`/users/${id}`),
}

export default authAPI 
const express = require('express');
const { body } = require('express-validator');
const {
  getDashboardStats,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getDepartments,
  createDepartment,
  getReports,
  getAcademicYears,
  createAcademicYear
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication and admin authorization to all routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

// Dashboard routes
router.get('/dashboard', getDashboardStats);

// User management routes
router.route('/users')
  .get(getUsers)
  .post([
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['student', 'teacher', 'parent', 'admin']).withMessage('Valid role is required')
  ], createUser);

router.route('/users/:id')
  .put(updateUser)
  .delete(deleteUser);

// Department management routes
router.route('/departments')
  .get(getDepartments)
  .post([
    body('name').notEmpty().withMessage('Department name is required'),
    body('code').notEmpty().withMessage('Department code is required')
  ], createDepartment);

// Reports routes
router.get('/reports', getReports);

// Academic year management routes
router.route('/academic-years')
  .get(getAcademicYears)
  .post([
    body('year').matches(/^\d{4}-\d{4}$/).withMessage('Year format should be YYYY-YYYY'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required')
  ], createAcademicYear);

module.exports = router; 
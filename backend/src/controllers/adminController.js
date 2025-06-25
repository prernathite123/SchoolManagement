const User = require('../models/User');
const Department = require('../models/Department');
const AcademicYear = require('../models/AcademicYear');
const Class = require('../models/Class');
const { validationResult } = require('express-validator');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    // Get user statistics
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalParents = await User.countDocuments({ role: 'parent' });
    const activeUsers = await User.countDocuments({ isActive: true });

    // Get department statistics
    const totalDepartments = await Department.countDocuments();
    const activeDepartments = await Department.countDocuments({ isActive: true });

    // Get class statistics
    const totalClasses = await Class.countDocuments();
    const activeClasses = await Class.countDocuments({ isActive: true });

    // Get academic year statistics
    const totalAcademicYears = await AcademicYear.countDocuments();
    const currentAcademicYear = await AcademicYear.findOne({ isCurrent: true });

    // Recent user registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRegistrations = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // User role distribution
    const userRoleDistribution = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students: totalStudents,
          teachers: totalTeachers,
          parents: totalParents,
          active: activeUsers,
          recentRegistrations
        },
        departments: {
          total: totalDepartments,
          active: activeDepartments
        },
        classes: {
          total: totalClasses,
          active: activeClasses
        },
        academicYears: {
          total: totalAcademicYears,
          current: currentAcademicYear
        },
        userRoleDistribution
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

// @desc    Get all users with pagination and filtering
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      role,
      isActive,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const users = await User.find(filter)
      .select('-password')
      .populate('parentId', 'firstName lastName email')
      .populate('children', 'firstName lastName email')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limitNum);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalUsers,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// @desc    Create new user
// @route   POST /api/admin/users
// @access  Private (Admin only)
const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userData = req.body;
    
    // Generate student/employee ID if not provided
    if (userData.role === 'student' && !userData.studentId) {
      const studentCount = await User.countDocuments({ role: 'student' });
      userData.studentId = `STU${String(studentCount + 1).padStart(6, '0')}`;
    }
    
    if ((userData.role === 'teacher' || userData.role === 'admin') && !userData.employeeId) {
      const employeeCount = await User.countDocuments({ 
        role: { $in: ['teacher', 'admin'] } 
      });
      userData.employeeId = `EMP${String(employeeCount + 1).padStart(6, '0')}`;
    }

    const user = new User(userData);
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin only)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove password from update data if present (should be handled separately)
    delete updateData.password;

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Soft delete by setting isActive to false
    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// @desc    Get all departments
// @route   GET /api/admin/departments
// @access  Private (Admin only)
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate('head', 'firstName lastName email')
      .populate('teachers', 'firstName lastName email')
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching departments',
      error: error.message
    });
  }
};

// @desc    Create new department
// @route   POST /api/admin/departments
// @access  Private (Admin only)
const createDepartment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const department = new Department(req.body);
    await department.save();

    const populatedDepartment = await Department.findById(department._id)
      .populate('head', 'firstName lastName email')
      .populate('teachers', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: populatedDepartment
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Department with this name or code already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating department',
      error: error.message
    });
  }
};

// @desc    Get reports data
// @route   GET /api/admin/reports
// @access  Private (Admin only)
const getReports = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;

    let reportData = {};

    switch (type) {
      case 'user-registration':
        reportData = await getUserRegistrationReport(startDate, endDate);
        break;
      case 'department-summary':
        reportData = await getDepartmentSummaryReport();
        break;
      case 'class-enrollment':
        reportData = await getClassEnrollmentReport();
        break;
      default:
        reportData = await getGeneralReport();
    }

    res.status(200).json({
      success: true,
      data: reportData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating reports',
      error: error.message
    });
  }
};

// @desc    Get academic years
// @route   GET /api/admin/academic-years
// @access  Private (Admin only)
const getAcademicYears = async (req, res) => {
  try {
    const academicYears = await AcademicYear.find()
      .sort({ year: -1 });

    res.status(200).json({
      success: true,
      data: academicYears
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching academic years',
      error: error.message
    });
  }
};

// @desc    Create new academic year
// @route   POST /api/admin/academic-years
// @access  Private (Admin only)
const createAcademicYear = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const academicYear = new AcademicYear(req.body);
    await academicYear.save();

    res.status(201).json({
      success: true,
      message: 'Academic year created successfully',
      data: academicYear
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Academic year already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating academic year',
      error: error.message
    });
  }
};

// Helper functions for reports
const getUserRegistrationReport = async (startDate, endDate) => {
  const matchCondition = {};
  if (startDate && endDate) {
    matchCondition.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const pipeline = [
    { $match: matchCondition },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          role: '$role'
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ];

  return await User.aggregate(pipeline);
};

const getDepartmentSummaryReport = async () => {
  return await Department.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'teachers',
        foreignField: '_id',
        as: 'teacherDetails'
      }
    },
    {
      $project: {
        name: 1,
        code: 1,
        teacherCount: { $size: '$teachers' },
        isActive: 1,
        createdAt: 1
      }
    },
    { $sort: { name: 1 } }
  ]);
};

const getClassEnrollmentReport = async () => {
  return await Class.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'students',
        foreignField: '_id',
        as: 'studentDetails'
      }
    },
    {
      $lookup: {
        from: 'academicyears',
        localField: 'academicYear',
        foreignField: '_id',
        as: 'academicYearDetails'
      }
    },
    {
      $project: {
        name: 1,
        grade: 1,
        section: 1,
        studentCount: { $size: '$students' },
        maxStudents: 1,
        academicYear: { $arrayElemAt: ['$academicYearDetails.year', 0] },
        isActive: 1
      }
    },
    { $sort: { grade: 1, section: 1 } }
  ]);
};

const getGeneralReport = async () => {
  const userStats = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } }
  ]);

  const departmentStats = await Department.aggregate([
    { $group: { _id: '$isActive', count: { $sum: 1 } } }
  ]);

  return {
    userStats,
    departmentStats,
    totalUsers: await User.countDocuments(),
    totalDepartments: await Department.countDocuments(),
    totalClasses: await Class.countDocuments()
  };
};

module.exports = {
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
}; 
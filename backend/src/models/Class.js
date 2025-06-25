const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    trim: true
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    trim: true,
    uppercase: true
  },
  academicYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicYear',
    required: true
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  subjects: [{
    name: String,
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    }
  }],
  maxStudents: {
    type: Number,
    default: 40
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for current student count
classSchema.virtual('currentStudentCount').get(function() {
  return this.students.length;
});

// Compound index for unique class per academic year
classSchema.index({ grade: 1, section: 1, academicYear: 1 }, { unique: true });
classSchema.index({ academicYear: 1 });
classSchema.index({ classTeacher: 1 });

module.exports = mongoose.model('Class', classSchema); 
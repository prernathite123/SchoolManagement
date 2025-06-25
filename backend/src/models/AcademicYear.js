const mongoose = require('mongoose');

const academicYearSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, 'Academic year is required'],
    unique: true,
    match: [/^\d{4}-\d{4}$/, 'Academic year format should be YYYY-YYYY (e.g., 2024-2025)']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  terms: [{
    name: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }]
}, {
  timestamps: true
});

// Ensure only one academic year is marked as current
academicYearSchema.pre('save', async function(next) {
  if (this.isCurrent) {
    await this.constructor.updateMany(
      { _id: { $ne: this._id } },
      { $set: { isCurrent: false } }
    );
  }
  next();
});

// Indexes
academicYearSchema.index({ year: 1 });
academicYearSchema.index({ isCurrent: 1 });
academicYearSchema.index({ isActive: 1 });

module.exports = mongoose.model('AcademicYear', academicYearSchema); 
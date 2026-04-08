const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['language', 'web', 'ml'],
      required: [true, 'Category is required'],
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      required: [true, 'Proficiency is required'],
    },
    icon: String,
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);

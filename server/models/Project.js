const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    longDescription: {
      type: String,
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
    },
    category: {
      type: String,
      enum: ['fullstack', 'ml', 'other'],
      default: 'fullstack',
    },
    githubUrl: String,
    liveUrl: String,
    imageUrl: String,
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);

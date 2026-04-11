const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    default: 'image',
  },
  image: {
    type: String, // Path to uploaded image
  },
  video: {
    type: String, // Path to uploaded video file
  },
  videoLink: {
    type: String, // External video URL (YouTube, etc.)
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Gallery', gallerySchema);

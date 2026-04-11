const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['news', 'video', 'event', 'award', 'social'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // fields common to multiple types or specific
  image: {
    type: String, // Also 'thumbnail' for videos
  },
  date: {
    type: String,
  },
  
  // News fields
  excerpt: String,
  publication: String,
  link: String,

  // Video fields
  duration: String,
  views: String,
  videoId: String,
  video: String, // Path to stored video file

  // Event fields
  location: String,
  attendees: String,
  description: String,

  // Award fields
  organization: String,
  year: String,

  // Social fields
  platform: {
    type: String,
    enum: ['instagram', 'facebook', 'youtube'],
  },
  engagement: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Media', mediaSchema);

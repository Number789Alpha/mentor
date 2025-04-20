const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  mentorName: {
    type: String,
    required: true
  },
  mentorEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  menteeName: {
    type: String,
    required: true
  },
  menteeEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  topic: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 30
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'upcoming'],
    default: 'pending',
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  isFollowUp: {
    type: Boolean,
    default: false
  },
  meetLink: {
    type: String,
    default: process.env.GOOGLE_MEET_LINK,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Session', sessionSchema);
const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  shortCode: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userAgent: { type: String },
  ipAddress: { type: String },
  referrer: { type: String },
  deviceType: { type: String, enum: ['desktop', 'mobile', 'tablet'] },
}, { timestamps: true });

module.exports = mongoose.model('Visit', VisitSchema);

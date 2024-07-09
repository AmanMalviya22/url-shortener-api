const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  expirationDate: {
    type: Date,
    default: null,
  },
  visitCount: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  visitsByDevice: {
    desktop: {
      type: Number,
      default: 0,
    },
    mobile: {
      type: Number,
      default: 0,
    },
    tablet: {
      type: Number,
      default: 0,
    },
  },
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;

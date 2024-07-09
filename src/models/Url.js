let nanoid;
(async () => {
  const module = await import('nanoid');
  nanoid = module.nanoid;
})();

const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: {
    type: String,
    default: async () => (await import('nanoid')).nanoid(8),
    unique: true,
  },
  customCode: { type: String, unique: true, sparse: true },
  expirationDate: { type: Date },
  visitCount: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  deviceType: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model('Url', UrlSchema);

const Visit = require('../models/Visit');

exports.trackVisit = async (shortCode, req) => {
  const visit = new Visit({
    shortCode,
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
    referrer: req.headers['referrer'] || req.headers['referer'],
    deviceType: getDeviceType(req.headers['user-agent']),
  });

  await visit.save();
};

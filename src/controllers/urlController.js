const Url = require('../models/Url');
const Visit = require('../models/Visit');
const { queueBackgroundJob } = require('../utils/backgroundJobs');
const { createShortUrl } = require('../services/urlService');

exports.shortenUrl = async (req, res) => {
  const { originalUrl, customCode, expirationDate } = req.body;
  try {
    const shortUrl = await createShortUrl(originalUrl, customCode, expirationDate);
    res.status(201).json({ originalUrl: shortUrl.originalUrl, shortCode: shortUrl.shortCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.redirectUrl = async (req, res) => {
  const shortCode = req.params.shortCode;
  try {
    const url = await Url.findOne({ shortCode });
    if (url) {
      // Create a new Visit record
      console.log("IP address: "+ req.ip);
      await Visit.create({
        shortCode,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        referrer: req.get('referrer') || 'direct',
        deviceType: 'desktop', // You should determine the device type based on user-agent
      });

      // Queue background job for further processing (if needed)
      queueBackgroundJob(shortCode, req);

      // Redirect user to the original URL
      res.redirect(302, url.originalUrl);
    } else {
      res.status(404).json({ message: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

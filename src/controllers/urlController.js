const Url = require('../models/Url');
const Visit = require('../models/Visit');
const redisClient = require('../config/redis');
const { nanoid } = require('nanoid');
const { queueBackgroundJob } = require('../utils/backgroundJobs');
const { getDeviceType } = require('../utils/deviceType');







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
      queueBackgroundJob(shortCode, req);
      res.redirect(302, url.originalUrl);
    } else {
      res.status(404).json({ message: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




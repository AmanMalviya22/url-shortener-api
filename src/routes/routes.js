const express = require('express');
const { shortenUrl, redirectUrl } = require('../controllers/urlController');
const { getAnalytics } = require('../controllers/analyticsController');
const { apiLimiter } = require('../utils/rateLimiter');

const router = express.Router();

router.post('/shorten', apiLimiter, shortenUrl);
router.get('/:shortCode', redirectUrl);
router.get('/analytics/:shortCode', getAnalytics);

module.exports = router;

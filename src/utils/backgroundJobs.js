const Queue = require('bull');
const { trackVisit } = require('../services/analyticsService');

const visitQueue = new Queue('visitQueue');

visitQueue.process(async (job, done) => {
  try {
    const { shortCode, visitData } = job.data;
    await trackVisit(shortCode, visitData);
    done();
  } catch (error) {
    console.error(`Error processing job: ${error.message}`);
    done(error);
  }
});

const queueBackgroundJob = (shortCode, req) => {
  const visitData = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    timestamp: new Date(),
    referrer: req.get('referrer') || 'direct',
  };

  visitQueue.add({ shortCode, visitData }, { attempts: 3 });
};

module.exports = { queueBackgroundJob };

const Queue = require('bull');
const { trackVisit } = require('../services/analyticsService');

const visitQueue = new Queue('visitQueue');

visitQueue.process(async (job, done) => {
  try {
    const { shortCode, visitData } = job.data;
    console.log(`Processing job for shortCode: ${shortCode}`);
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

  console.log(`Queuing job for shortCode: ${shortCode}`);
  visitQueue.add({ shortCode, visitData }, { attempts: 3 });
};

module.exports = { queueBackgroundJob };

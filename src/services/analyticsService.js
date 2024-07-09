const Url = require('../models/Url');

exports.trackVisit = async (shortCode, visitData) => {
  console.log(`Tracking visit for shortCode: ${shortCode}`);
  
  const url = await Url.findOne({ shortCode });
  
  if (!url) {
    throw new Error('URL not found');
  }
  
  console.log(`Current visit count for ${shortCode}: ${url.visitCount}`);
  
  url.visitCount += 1;
  
  // Determine the device type
  const userAgent = visitData.userAgent.toLowerCase();
  let deviceType = 'desktop';
  
  if (userAgent.includes('mobi')) {
    deviceType = 'mobile';
  } else if (userAgent.includes('tablet')) {
    deviceType = 'tablet';
  }
  
  url.visitsByDevice[deviceType] += 1;
  
  // Update unique visitors count (implement a mechanism to track unique visitors)
  
  await url.save();
  
  console.log(`Updated visit count for ${shortCode}: ${url.visitCount}`);
  console.log(`Updated ${deviceType} visit count for ${shortCode}: ${url.visitsByDevice[deviceType]}`);
};

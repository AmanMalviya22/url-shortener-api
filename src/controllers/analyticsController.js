const Url = require('../models/Url');
const Visit = require('../models/Visit');

exports.getAnalytics = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const totalVisits = await Visit.countDocuments({ shortCode });
    const uniqueVisitors = await Visit.distinct('ipAddress', { shortCode }).countDocuments();
    const visitsByDevice = await Visit.aggregate([
      { $match: { shortCode } },
      { $group: { _id: '$deviceType', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      originalUrl: url.originalUrl,
      totalVisits,
      uniqueVisitors,
      visitsByDevice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const Url = require('../models/Url');
const Visit = require('../models/Visit');

exports.getAnalytics = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const totalVisits = await Url.countDocuments({ shortCode });
    const uniqueVisitors = await Url.distinct('ipAddress', { shortCode }).countDocuments();
    const visitsByDevice = await Url.aggregate([
      { $match: { shortCode } },
      { $group: { _id: '$deviceType', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      originalUrl: url.originalUrl,
      totalVisits:url.visitCount,
      uniqueVisitors:url.uniqueVisitors,
      visitsByDevice:url.visitsByDevice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

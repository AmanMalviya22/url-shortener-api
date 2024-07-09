const useragent = require('express-useragent');

function getDeviceType(req) {
  const source = req.headers['user-agent'];
  const ua = useragent.parse(source);

  if (ua.isMobile) {
    return 'Mobile';
  } else if (ua.isTablet) {
    return 'Tablet';
  } else if (ua.isDesktop) {
    return 'Desktop';
  } else {
    return 'Unknown';
  }
}

module.exports = getDeviceType;

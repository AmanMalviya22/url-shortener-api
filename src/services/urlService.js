let nanoid;
(async () => {
  const module = await import('nanoid');
  nanoid = module.nanoid;
})();

const Url = require('../models/Url');

exports.createShortUrl = async (originalUrl, customCode, expirationDate) => {
  const shortCode = customCode || (await (await import('nanoid')).nanoid(8));

  if (customCode) {
    const existingUrl = await Url.findOne({ customCode });
    if (existingUrl) {
      throw new Error('Custom code already in use');
    }
  }

  const url = new Url({ originalUrl, shortCode, customCode, expirationDate });
  await url.save();

  return url;
};

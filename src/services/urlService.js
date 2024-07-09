let nanoid;
(async () => {
  const module = await import('nanoid');
  nanoid = module.nanoid;
})();



const Url = require('../models/Url');

exports.createShortUrl = async (originalUrl, customCode, expirationDate) => {
  let shortCode;

  if (customCode) {
    shortCode = customCode;
    const existingUrl = await Url.findOne({ shortCode });
    if (existingUrl) {
      throw new Error('Custom code already in use');
    }
  } else {
    shortCode = (await import('nanoid')).nanoid(8);
  }

  const newUrl = new Url({
    originalUrl,
    shortCode,
    expirationDate,
  });

  await newUrl.save();
  return newUrl;
};

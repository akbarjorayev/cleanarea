const { bot } = require('../bot')

async function getPhotoLink(photoId) {
  const link = await bot.getFileLink(photoId)
  return link
}

module.exports = { getPhotoLink }

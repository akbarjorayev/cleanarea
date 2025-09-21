const { bot } = require('../bot')
const dotenv = require('dotenv')
dotenv.config()

async function getPhotoLink(fileId) {
  try {
    const file = await bot.getFile(fileId)
    const link = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`

    return link
  } catch (err) {
    return null
  }
}

module.exports = { getPhotoLink }

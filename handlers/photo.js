const { bot } = require('../bot')
const Rubbish = require('../models/Rubbish')
const {
  setRubbishDataPhotoId,
  getRubbishData,
  deleteRubbishData,
} = require('../state/rubbish')

async function setRubbishPhotoId(msg) {
  const chatId = msg.chat.id

  setRubbishDataPhotoId(msg)
  const { location, photoId, caption } = getRubbishData(msg) || {}
  const rubbish = new Rubbish(location, photoId, caption)
  deleteRubbishData(msg)

  try {
    await rubbish.create()
    bot.sendMessage(chatId, '✅ Rubbish report created successfully!')
  } catch (err) {
    bot.sendMessage(
      chatId,
      `❌ Failed to create rubbish report. \n ${err.message}`
    )
  }
}

module.exports = { setRubbishPhotoId }

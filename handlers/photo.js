const { bot } = require('../bot')
const Rubbish = require('../models/Rubbish')
const { rubbishDetector } = require('../ai/rubbishDetector')
const {
  setRubbishDataPhotoId,
  getRubbishData,
  deleteRubbishData,
} = require('../state/rubbish')

async function setRubbishPhotoId(msg) {
  const chatId = msg.chat.id

  const thereIsRubbish = await rubbishDetector(
    msg.photo[msg.photo.length - 1].file_id
  )
  if (thereIsRubbish === 'no') {
    bot.sendMessage(chatId, 'Your photo does not contain rubbish.')
    return
  }

  setRubbishDataPhotoId(msg)
  const { location, photoId, userId, caption } = getRubbishData(msg) || {}
  const rubbish = new Rubbish(location, photoId, userId, caption)
  deleteRubbishData(msg)

  try {
    await rubbish.create()
    bot.sendMessage(chatId, '✅ Rubbish report created successfully!')
  } catch (err) {
    bot.sendMessage(chatId, '❌ Failed to create rubbish report.')
  }
}

module.exports = { setRubbishPhotoId }

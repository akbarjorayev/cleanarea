const { bot } = require('../bot')
const { setRubbishDataLocation } = require('../state/rubbish')

async function setRubbishLocation(msg) {
  const chatId = msg.chat.id

  setRubbishDataLocation(msg)
  bot.sendMessage(chatId, '📷 Now send me a photo of the rubbish.')
}

module.exports = { setRubbishLocation }

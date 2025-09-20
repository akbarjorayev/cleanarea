const { bot } = require('../bot')
const startText = 'Hello! Send /new to report about new rubbish 🗑️'

function startCommand(msg) {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, startText)
}

module.exports = { startCommand }

const { bot } = require('../bot')
const { initRubbishData } = require('../state/rubbish')
const newPostText =
  'Create a new post! 📝 Please send location of rubbish.'

function newCommand(msg) {
  const chatId = msg.chat.id

  initRubbishData(msg)

  bot.sendMessage(chatId, newPostText, {
    reply_markup: {
      keyboard: [[{ text: '📍 Share location', request_location: true }]],
      resize_keyboard: true,
    },
  })
}

module.exports = { newCommand }

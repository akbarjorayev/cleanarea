const { bot } = require('../bot')

const spinnerFrames = ['⌛️']

async function sendPendingMessage(chatId, text) {
  const msg = await bot.sendMessage(
    chatId,
    text ? `${spinnerFrames[0]} ${text}` : spinnerFrames[0]
  )

  return {
    edit: async (newText) => {
      await bot.editMessageText(`${newText}`, {
        chat_id: chatId,
        message_id: msg.message_id,
      })
    },
  }
}

module.exports = { sendPendingMessage }

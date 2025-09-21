const { bot } = require('../bot')
const Rubbish = require('../models/Rubbish')

async function doneCallback(query) {
  const chatId = query.message.chat.id
  const messageId = query.message.message_id
  const rubbish = new Rubbish(
    null,
    null,
    chatId,
    null,
    query.data.split('/')[1]
  )

  try {
    await rubbish.setStatusDone()

    bot.editMessageCaption('Marked as done ✅', {
      chat_id: chatId,
      message_id: messageId,
    })
  } catch (err) {
    bot.editMessageCaption('You cannot set status done ❌', {
      chat_id: chatId,
      message_id: messageId,
    })
  }
}

module.exports = { doneCallback }

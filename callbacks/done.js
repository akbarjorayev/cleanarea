const { bot } = require('../bot')
const Rubbish = require('../models/Rubbish')
const { getCollectionSize } = require('../database/get')
const {
  getPrevNextButtons,
} = require('../utils/inlineKeyboard/prevNextButtons')

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
  const totalSize = await getCollectionSize('rubbish')

  try {
    await rubbish.setStatusDone()

    bot.editMessageCaption('Marked as done ✅', {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: getPrevNextButtons(
          query.data.split('/')[2],
          totalSize
        ),
      },
    })
  } catch (err) {
    bot.editMessageCaption('You cannot set status done ❌', {
      chat_id: chatId,
      message_id: messageId,
    })
  }
}

module.exports = { doneCallback }

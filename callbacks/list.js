const { bot } = require('../bot')
const Rubbish = require('../models/Rubbish')
const { getCollectionSize } = require('../database/get')
const { getListCallbackCaption } = require('../utils/list')
const {
  getPrevNextButtons,
} = require('../utils/inlineKeyboard/prevNextButtons')

async function getListCallback(query) {
  const chatId = query.message.chat.id
  const messageId = query.message.message_id
  const rubbish = new Rubbish(null, null, chatId, +query.data.split('/')[1])
  const data = (await rubbish.getData(rubbish.currentI))[0]
  const totalSize = await getCollectionSize('rubbish')

  bot.editMessageMedia(
    {
      type: 'photo',
      media: data.photoId,
      caption: getListCallbackCaption(data),
      parse_mode: 'Markdown',
    },
    {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: getPrevNextButtons(rubbish.currentI, totalSize),
      },
    }
  )
}

module.exports = { getListCallback }

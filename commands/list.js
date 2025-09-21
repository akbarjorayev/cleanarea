const { bot } = require('../bot')
const Rubbish = require('../models/Rubbish')
const { getCollectionSize } = require('../database/get')
const { getListCallbackCaption } = require('../utils/list')
const {
  getPrevNextButtons,
} = require('../utils/inlineKeyboard/prevNextButtons')

async function listCommand(msg) {
  const chatId = msg.chat.id
  const rubbish = new Rubbish(null, null, chatId, 0)
  const data = (await rubbish.getData(rubbish.currentI))[0]
  const totalSize = await getCollectionSize('rubbish')

  bot.sendPhoto(chatId, data?.photoId, {
    caption: getListCallbackCaption(data),
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: getPrevNextButtons(rubbish.currentI, totalSize),
    },
  })
}

module.exports = { listCommand }

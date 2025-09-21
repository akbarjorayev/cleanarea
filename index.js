const { bot } = require('./bot')
const { startCommand } = require('./commands/start')
const { newCommand } = require('./commands/new')
const { listCommand } = require('./commands/list')
const { setRubbishLocation } = require('./handlers/location')
const { setRubbishPhotoId } = require('./handlers/photo')
const { getListCallback } = require('./callbacks/list')
const { doneCallback } = require('./callbacks/done')

bot.onText(/\/start/, startCommand)
bot.onText(/\/new/, newCommand)
bot.onText(/\/list/, listCommand)

bot.on('location', setRubbishLocation)
bot.on('photo', setRubbishPhotoId)

bot.on('callback_query', (query) => {
  if (query.data.startsWith('prev_page') || query.data.startsWith('next_page'))
    getListCallback(query)
  if (query.data.startsWith('done')) doneCallback(query)

  bot.answerCallbackQuery(query.id)
})

const { bot } = require('./bot')
const { startCommand } = require('./commands/start')
const { newCommand } = require('./commands/new')
const { setRubbishLocation } = require('./handlers/location')
const { setRubbishPhotoId } = require('./handlers/photo')

bot.onText(/\/start/, startCommand)
bot.onText(/\/new/, newCommand)

bot.on('location', setRubbishLocation)
bot.on('photo', setRubbishPhotoId)

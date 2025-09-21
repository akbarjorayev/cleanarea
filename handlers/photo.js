const Rubbish = require('../models/Rubbish')
const { rubbishDetector } = require('../ai/rubbishDetector')
const { sendPendingMessage } = require('../utils/pendingMessage')
const {
  setRubbishDataPhotoId,
  getRubbishData,
  deleteRubbishData,
} = require('../state/rubbish')

async function setRubbishPhotoId(msg) {
  const chatId = msg.chat.id
  const pending = await sendPendingMessage(chatId)

  const thereIsRubbish = await rubbishDetector(
    msg.photo[msg.photo.length - 1].file_id
  )

  if (thereIsRubbish === 'no') {
    await pending.edit('❌ Your photo does not contain rubbish.')
    return
  }

  setRubbishDataPhotoId(msg)
  const { location, photoId, userId, caption } = getRubbishData(msg) || {}
  const rubbish = new Rubbish(location, photoId, userId, caption)
  deleteRubbishData(msg)

  try {
    await rubbish.create()
    await pending.edit('✅ Rubbish report created successfully!')
  } catch (err) {
    await pending.edit('❌ Failed to create rubbish report.')
  }
}

module.exports = { setRubbishPhotoId }

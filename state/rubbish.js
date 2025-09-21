const rubbishData = new Map()

function initRubbishData(msg) {
  const chatId = msg.chat.id
  const userId = msg.from.id
  
  rubbishData.set(chatId, { userId })
}

function setRubbishDataLocation(msg) {
  const chatId = msg.chat.id
  const data = rubbishData.get(chatId) || {}

  data.location = {
    latitude: msg.location.latitude,
    longitude: msg.location.longitude,
  }

  rubbishData.set(chatId, data)
}

function setRubbishDataPhotoId(msg) {
  const chatId = msg.chat.id
  const data = rubbishData.get(chatId) || {}

  data.photoId = msg.photo[msg.photo.length - 1].file_id
  data.caption = msg.caption || ''

  rubbishData.set(chatId, data)
}

function getRubbishData(msg) {
  const chatId = msg.chat.id
  return rubbishData.get(chatId) || null
}

function deleteRubbishData(msg) {
  const chatId = msg.chat.id
  rubbishData.delete(chatId)
}

module.exports = {
  initRubbishData,
  setRubbishDataLocation,
  setRubbishDataPhotoId,
  getRubbishData,
  deleteRubbishData,
}

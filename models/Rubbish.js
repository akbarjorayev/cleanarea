const { createRecord } = require('../database/create')
const { getRecordsFromSize } = require('../database/get')

class Rubbish {
  constructor(location, photoId, userId, currentI, caption = '') {
    this.location = location
    this.photoId = photoId
    this.userId = userId
    this.currentI = currentI
    this.caption = caption
    this.createdAt = new Date().toISOString()
    this.status = 'active'
  }

  async create() {
    try {
      await createRecord(this, 'rubbish')
    } catch (err) {
      throw new Error(err)
    }
  }

  async getData(currentI) {
    try {
      const records = await getRecordsFromSize(currentI, 1, 'rubbish')
      return records
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = Rubbish

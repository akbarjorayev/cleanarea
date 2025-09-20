const { createRecord } = require('../database/create')

class Rubbish {
  constructor(location, photoId, caption = '') {
    this.location = location
    this.photoId = photoId
    this.caption = caption
  }

  async create() {
    try {
      await createRecord(this, 'rubbish')
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = Rubbish

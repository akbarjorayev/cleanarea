const admin = require('./init')
const db = admin.firestore()

async function createRecord(data, collectionName) {
  const docRef = db.collection(collectionName).doc()
  await docRef.set({ ...data })

  await docRef.update({ id: docRef.id })
  return { id: docRef.id, ...data }
}

module.exports = { createRecord }

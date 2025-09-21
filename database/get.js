const admin = require('./init')
const db = admin.firestore()

async function getRecordsFromSize(from = 0, size = 5, collectionName) {
  const snapshot = await db
    .collection(collectionName)
    .where('status', '==', 'active')
    .orderBy('createdAt', 'desc')
    .offset(from)
    .limit(size)
    .get()

  const records = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return records
}

async function getCollectionSize(collectionName) {
  const snapshot = await db
    .collection(collectionName)
    .where('status', '==', 'active')
    .orderBy('createdAt', 'desc')
    .get()

  return snapshot.size
}

module.exports = { getRecordsFromSize, getCollectionSize }

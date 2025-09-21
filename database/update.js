const admin = require('./init')
const db = admin.firestore()

async function updateRecord(collectionName, where, newData) {
  const querySnapshot = await db
    .collection(collectionName)
    .where(...where)
    .get()

  if (querySnapshot.empty) return null

  const updates = []
  querySnapshot.forEach((doc) => {
    updates.push(doc.ref.update(newData))
  })

  await Promise.all(updates)

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...newData }))
}

module.exports = {
  updateRecord,
}

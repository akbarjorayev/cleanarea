const admin = require('firebase-admin')
const dotenv = require('dotenv')
dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_INIT)),
})

module.exports = admin

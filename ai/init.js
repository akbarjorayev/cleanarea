const { GoogleGenerativeAI } = require('@google/generative-ai')
const dotenv = require('dotenv')

dotenv.config()

const ai = new GoogleGenerativeAI(process.env.GEMINI_API)
module.exports = ai

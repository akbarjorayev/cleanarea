const { GoogleGenAI } = require('@google/genai')
const axios = require('axios')
const { getPhotoLink } = require('../utils/photo.js')

const ai = new GoogleGenAI({})

async function detectRubbish(photoId) {
  try {
    const fileUrl = await getPhotoLink(photoId)

    const imageResponse = await axios.get(fileUrl, {
      responseType: 'arraybuffer',
    })
    const base64Image = Buffer.from(imageResponse.data, 'binary').toString(
      'base64'
    )

    const contents = [
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image,
        },
      },
      {
        text: "Does this image contain rubbish? Reply with 'Yes' or 'No' only.",
      },
    ]

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    })

    const text = response.text.trim().toLowerCase()
    const isRubbish = text.includes('yes')

    return { rubbish: isRubbish }
  } catch (err) {
    console.error('Rubbish detection failed:', err)
    return { rubbish: false, error: err.message }
  }
}

module.exports = { detectRubbish }

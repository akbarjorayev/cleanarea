const ai = require('./init')
const { getPhotoLink } = require('../utils/getPhotoLink')

async function rubbishDetector(photoId) {
  try {
    const photoUrl = await getPhotoLink(photoId)
    const model = ai.getGenerativeModel({
      model: 'gemini-2.5-flash',
    })

    const imageResp = await fetch(photoUrl)
    if (!imageResp.ok)
      throw new Error(`Failed to fetch image: ${imageResp.statusText}`)
    const arrayBuffer = await imageResp.arrayBuffer()

    const prompt = `
      Analyze this image and tell me if it contains rubbish or trash.
      Respond strictly with "yes" or "no", nothing else.
    `

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(arrayBuffer).toString('base64'),
          mimeType: 'image/jpeg',
        },
      },
      prompt,
    ])

    const { response } = result

    if (!response) return 'no'
    const answer = response.text().toLowerCase().includes('yes') ? 'yes' : 'no'
    return answer
  } catch (err) {
    return 'no'
  }
}

module.exports = { rubbishDetector }

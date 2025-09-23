function getListCallbackCaption(data) {
  const caption = data?.caption || ''
  const googleMaps = `[Google Maps](https://www.google.com/maps?q=${data?.location.latitude},${data?.location.longitude})`
  const yandexMaps = `[Yandex Maps](https://yandex.com/maps/?pt=${data?.location.longitude},${data?.location.latitude}&z=18&l=map)`
  const createdAt = `*Created at:* ${new Date(
    data?.createdAt
  ).toLocaleString()}`

  return `*${caption}*\n\n${googleMaps} | ${yandexMaps}\n\n${createdAt}`
}

module.exports = { getListCallbackCaption }

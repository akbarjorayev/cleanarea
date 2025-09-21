function getRubbishCreateData(rubbish) {
  return {
    location: rubbish.location,
    photoId: rubbish.photoId,
    userId: rubbish.userId,
    caption: rubbish.caption,
    createdAt: rubbish.createdAt,
    status: rubbish.status,
  }
}

module.exports = { getRubbishCreateData }

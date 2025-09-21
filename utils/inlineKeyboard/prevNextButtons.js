function getPrevNextButtons(currentI, total, currentId) {
  const buttons = []

  if (currentI > 0)
    buttons.push({
      text: '⬅️ Prev',
      callback_data: `prev_page/${currentI - 1}`,
    })

  buttons.push({
    text: '✅ Done',
    callback_data: `done/${currentId}/${currentI}`,
  })

  if (currentI < total - 1) {
    buttons.push({
      text: 'Next ➡️',
      callback_data: `next_page/${currentI + 1}`,
    })
  }

  return [buttons]
}

module.exports = { getPrevNextButtons }

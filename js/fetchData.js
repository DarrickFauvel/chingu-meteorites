async function fetchData(state, url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      state.error.isError = true
      state.error.message =
        "Sorry. There was a problem getting data from the server."
      throw new Error(state.error.message)
    }
    const data = await response.json()
    return data
  } catch (err) {
    console.error(state.error.message)
  }
}

export default fetchData

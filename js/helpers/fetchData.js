import { tableState } from "../state.js"

export default async function fetchData(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      tableState.error.isError = true
      tableState.error.message =
        "Sorry. There was a problem getting data from the server."
      throw new Error(tableState.error.message)
    }
    const data = await response.json()
    return data
  } catch (err) {
    console.error(tableState.error.message)
  }
}

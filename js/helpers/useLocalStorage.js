import { API_URL } from "../config.js"
import { tableState } from "../state.js"
import fetchData from "./fetchData.js"

export default async function useLocalStorage() {
  tableState.isLoading = true

  if (localStorage.getItem("allMeteorites")) {
    tableState.apiData = JSON.parse(localStorage.getItem("allMeteorites"))
  } else {
    tableState.apiData = await fetchData(API_URL)
    localStorage.setItem("allMeteorites", JSON.stringify(tableState.apiData))
  }

  tableState.isLoading = false
}

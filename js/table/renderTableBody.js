import useLocalStorage from "../helpers/useLocalStorage.js"
import { tableState } from "../state.js"
import { headers } from "./tableConfig.js"

export default async function renderTableBody() {
  const table = document.querySelector("table")
  const tbody = table.querySelector("tbody")

  if (tableState.error.isError) {
    tbody.innerHTML = `<tr><td class="error" colspan=${
      Object.keys(headers).length
    }>${tableState.error.message}</td></tr>`
    return
  }

  if (tableState.isLoading) {
    tbody.innerHTML = "<tr><td>Loading...</td></tr>"
  }

  // tableState.apiData = await fetchData(tableState, API_URL)
  useLocalStorage()

  let data = tableState.apiData
  if (tableState.filteredResults.length > 0) {
    data = tableState.filteredResults
  }

  tbody.innerHTML = ""

  // Loop over data array of meteorite objects
  for (const meteorite of data) {
    const tr = document.createElement("tr")
    // Loop over header properties in the headers object
    for (const headerProperty in headers) {
      // Loop over meteorite properties in the meteorite object
      for (const meteoriteProperty in meteorite) {
        // Check if both header property and meteorite property are a match
        if (headerProperty === meteoriteProperty) {
          const td = document.createElement("td")
          if (headerProperty === "mass") {
            td.textContent = new Intl.NumberFormat().format(meteorite.mass)
          } else if (headerProperty === "year") {
            td.textContent = new Date(meteorite.year).getFullYear()
          } else if (headerProperty === "geolocation") {
            // Check for geolocation propeerty
            // Insert geolocation cell data
            td.textContent = `
                  Latitude: ${meteorite.geolocation.latitude}\n
                  Longitude: ${meteorite.geolocation.longitude}`
          } else {
            // Insert meteorite cell data
            td.textContent = `${meteorite[meteoriteProperty]}`
          }
          tr.appendChild(td)
        }
      }
    }
    tbody.appendChild(tr)
  }
}

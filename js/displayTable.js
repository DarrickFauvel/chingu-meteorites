/* These headers can be reordered or individually omitted, 
  and the table will dynamically display accordingly */
const headers = {
  name: "Name",
  id: "ID",
  nametype: "NameType",
  recclass: "recClass",
  mass: "Mass",
  fall: "Fall",
  year: "Year",
  reclat: "recLat",
  reclong: "recLong",
  geolocation: "Geolocation",
}

function renderTableHeader(table) {
  const thead = table.querySelector("thead")
  thead.innerHTML = "<tr></tr>"

  // Loop over header properties in the headers object
  for (const headerProperty in headers) {
    const th = document.createElement("th")
    th.textContent = headers[headerProperty]
    thead.querySelector("tr").appendChild(th)
  }
}

async function renderTableBody(state, table) {
  const tbody = table.querySelector("tbody")

  if (state.error.isError) {
    tbody.innerHTML = `<tr><td class="error" colspan=${
      Object.keys(headers).length
    }>${state.error.message}</td></tr>`
    return
  }

  tbody.innerHTML = "<tr><td>Loading...</td></tr>"

  console.log(state.type)
  let data
  if (state.type === undefined) {
    data = state.allData
  } else {
    data = state.searchResults
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
          // Check for geolocation propeerty
          if (headerProperty === "geolocation") {
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

function displayTable(state, table) {
  renderTableHeader(table)
  renderTableBody(state, table)
}

export default displayTable

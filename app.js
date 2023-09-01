import { searchState, tableState } from "./js/state.js"
import renderTable from "./js/table/renderTable.js"
import renderTableBody from "./js/table/renderTableBody.js"

// Target DOM elements
const searchTypeSelect = document.querySelector("#search-type")
const nameInput = document.querySelector("#name-input")
const yearInput = document.querySelector("#year-input")
const compositionInput = document.querySelector("#composition-input")
const massInputLow = document.querySelector("#mass-input-low")
const massInputHigh = document.querySelector("#mass-input-high")
const searchBtn = document.querySelector("#search-btn")
const inputControls = document.querySelectorAll(".input-control")
const nameInputControl = document.querySelector("#name-input-control")
const yearInputControl = document.querySelector("#year-input-control")
const compositionInputControl = document.querySelector(
  "#composition-input-control"
)
const massInputControl = document.querySelector("#mass-input-control")

async function app() {
  document
    .querySelector("form")
    .addEventListener("submit", (e) => e.preventDefault())

  function hideAllControls() {
    inputControls.forEach((control) => (control.style.display = "none"))
    searchBtn.style.display = "none"
  }

  searchTypeSelect.addEventListener("change", (e) => {
    searchState.type = e.target.value

    switch (searchState.type) {
      case "name":
        hideAllControls()
        nameInputControl.style.display = "block"
        nameInput.focus()
        searchBtn.style.display = "block"
        break
      case "year":
        hideAllControls()
        yearInputControl.style.display = "block"
        yearInput.focus()
        searchBtn.style.display = "block"
        break
      case "composition":
        hideAllControls()
        compositionInputControl.style.display = "block"
        compositionInput.focus()
        searchBtn.style.display = "block"
        break
      case "mass":
        hideAllControls()
        massInputControl.style.display = "block"
        massInputLow.focus()
        searchBtn.style.display = "block"
        break
      default:
        hideAllControls()
        searchBtn.style.display = "none"
        tableState.filteredResults = []
        renderTableBody()
    }
  })

  nameInput.addEventListener("change", (e) => {
    searchState.name = e.target.value
  })

  searchBtn.addEventListener("click", () => {
    if (searchState.type === "name") {
      searchState.name = nameInput.value
      tableState.filteredResults = tableState.apiData.filter((meteorite) =>
        meteorite.name.toLowerCase().includes(searchState.name.toLowerCase())
      )
      renderTableBody()
    }
    if (searchState.type === "year") {
      searchState.year = yearInput.value
      tableState.filteredResults = tableState.apiData.filter((meteorite) => {
        const formattedYear = new Date(meteorite.year).getFullYear()
        return formattedYear === +searchState.year
      })
      renderTableBody()
    }
    if (searchState.type === "composition") {
      searchState.composition = compositionInput.value
      tableState.filteredResults = tableState.apiData.filter((meteorite) =>
        meteorite.recclass
          .toLowerCase()
          .includes(searchState.composition.toLowerCase())
      )
      renderTableBody()
    }
    if (searchState.type === "mass") {
      searchState.mass.low = +massInputLow.value
      searchState.mass.high = +massInputHigh.value
      console.log(searchState.mass.low, searchState.mass.high)
      tableState.filteredResults = tableState.apiData.filter((meteorite) => {
        return (
          +meteorite.mass >= searchState.mass.low &&
          +meteorite.mass <= searchState.mass.high
        )
      })
      renderTableBody()
    }
  })

  renderTable()
}

app()

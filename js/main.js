import fetchData from "./fetchData.js"
import displayTable from "./displayTable.js"

const API_URL = "https://data.nasa.gov/resource/gh4g-9sfh.json"

const searchTypeSelect = document.querySelector("#search-type")

// Text input elements
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

// Application state
const state = {
  allData: [],
  searchResults: [],
  loading: false,
  error: {
    isError: false,
    message: "",
  },
}

async function main() {
  // Select element

  state.allData = await fetchData(state, API_URL)

  const inputs = {
    type: "",
    name: "",
    year: 0,
    composition: "",
    mass: {
      low: 0,
      high: 0,
    },
  }

  function hideAllControls() {
    inputControls.forEach((control) => (control.style.display = "none"))
    searchBtn.style.display = "none"
  }

  searchTypeSelect.addEventListener("change", (e) => {
    inputs.type = e.target.value

    switch (inputs.type) {
      case "name":
        hideAllControls()
        nameInputControl.style.display = "block"
        searchBtn.style.display = "block"
        break
      case "year":
        hideAllControls()
        yearInputControl.style.display = "block"
        searchBtn.style.display = "block"
        break
      case "composition":
        hideAllControls()
        compositionInputControl.style.display = "block"
        searchBtn.style.display = "block"
        break
      case "mass":
        hideAllControls()
        massInputControl.style.display = "block"
        searchBtn.style.display = "block"
        break
      default:
        hideAllControls()
        searchBtn.style.display = "none"
        console.log("No selection made.")
    }
  })

  nameInput.addEventListener("change", (e) => {
    inputs.name = e.target.value
  })

  searchBtn.addEventListener("click", () => {
    if (inputs.type === "name") {
      inputs.name = nameInput.value
      console.log(`filter meteorites by: ${inputs.name}`)
    }
    if (inputs.type === "year") {
      inputs.year = yearInput.value
      console.log(`filter meteorites by: ${inputs.year}`)
    }
    if (inputs.type === "composition") {
      inputs.composition = compositionInput.value
      console.log(`filter meteorites by: ${inputs.composition}`)
    }
    if (inputs.type === "mass") {
      inputs.mass.low = massInputLow.value
      inputs.mass.high = massInputHigh.value
      console.log(
        `filter meteorites: between ${inputs.mass.low} and ${inputs.mass.high}`
      )
    }
  })

  displayTable(state, document.querySelector("table"))
}

main()

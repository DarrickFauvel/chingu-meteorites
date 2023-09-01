// Application state
export const tableState = {
  apiData: [],
  filteredResults: [],
  isLoading: false,
  error: {
    isError: false,
    message: "",
  },
}

export const searchState = {
  type: "",
  name: "",
  year: 0,
  composition: "",
  mass: {
    low: 0,
    high: 0,
  },
}

import { headers } from "./tableConfig.js"

export default function renderTableHeader() {
  const table = document.querySelector("table")
  const thead = table.querySelector("thead")
  thead.innerHTML = "<tr></tr>"

  // Loop over header properties in the headers object
  for (const headerProperty in headers) {
    const th = document.createElement("th")
    th.textContent = headers[headerProperty]
    thead.querySelector("tr").appendChild(th)
  }
}

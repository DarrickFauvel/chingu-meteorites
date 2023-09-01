import { tableState } from "../state.js"
import renderTableBody from "./renderTableBody.js"
import renderTableHeader from "./renderTableHeader.js"

export default function renderTable() {
  renderTableHeader()
  renderTableBody()
}

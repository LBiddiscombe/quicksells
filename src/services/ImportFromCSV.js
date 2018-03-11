/*
  Importer for QuickSellButtons.csv
  Expects CCS with columns
    Action,Page,Menu Group,Menu Option,Description,Image,ItemID,Top,Left
  Updates image path
  Remaps column names
  Filters on specific groups and pages
*/
import csvJSON from './csvJSON'
import settings from '../settings'

function ImportFromCSV(csvFile) {
  return new Promise((resolve, reject) => {
    if (csvFile) {
      resolve(loadCSV(csvFile))
    } else {
      resolve({
        groups: [],
        pages: [],
        allRows: []
      })
    }
  })
}

function loadCSV(response) {
  const groups = settings.importGroups
  const pages = settings.importPages
  const results = csvJSON(response)
  const filteredResults = getFilteredResults(groups, pages, results)
  const allRows = getAllRows(filteredResults)

  return {
    groups,
    pages,
    allRows
  }
}

function getFilteredResults(groups, pages, results) {
  return results
    .filter(p => {
      return (
        groups.map(r => r.id).includes(p.group) &&
        pages.map(r => r.id).includes(p.page) &&
        p.Action === 'ADD'
      )
    })
    .sort((a, b) => a.group - b.group || a.label.localeCompare(b.label) || a.page - b.page)
    .map(p => {
      return {
        item: p.item,
        label: p.label,
        image: p.image && p.image !== 'NULL' ? p.image : false,
        group: p.group,
        page: p.page,
        seq: p.seq,
        top: p.top,
        left: p.left
      }
    })
}

function getAllRows(filteredResults) {
  const groups = settings.importGroups
  const pages = settings.importPages
  let allRows = []
  groups.forEach(group => {
    pages.forEach(page => {
      allRows.push(...getProductsByGroupByPage(group, page, filteredResults))
    })
  })

  return allRows
}

function getProductsByGroupByPage(group, page, filteredResults) {
  var products = []
  const gridLength = settings.grid.import.rows * settings.grid.import.columns

  for (let i = 0; i < gridLength; i++) {
    const row = Math.floor(i / settings.grid.import.columns)
    const col = i % settings.grid.import.columns
    const top = settings.grid.import.offsetTop + row * settings.grid.import.height
    const left = settings.grid.import.offsetLeft + col * settings.grid.import.width

    products.push({
      page: page.id,
      group: group.id,
      seq: i + 1,
      empty: true,
      top,
      left
    })
  }

  filteredResults.filter(r => r.group === group.id && r.page === page.id).forEach((p, index) => {
    const pos = getGridPosition(p.top, p.left)
    p.seq = pos !== -1 ? pos + 1 : index + 1
    products[p.seq - 1] = p
  })

  return products
}

function getGridPosition(top, left) {
  const height = settings.grid.import.height
  const width = settings.grid.import.width
  const offsetLeft = settings.grid.import.offsetLeft
  const offsetTop = settings.grid.import.offsetTop
  const cols = settings.grid.import.columns

  if (!top || !left || isNaN(top) || isNaN(left)) {
    return -1
  }

  let row = (top - offsetTop) / height
  let col = (left - offsetLeft) / width
  let pos = row * cols + col

  return pos
}

export default ImportFromCSV

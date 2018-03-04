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
        products: [],
        layout: {}
      })
      /*
      fetch('./data/QuickSellButtons.csv')
        .then(response => response.text())
        .then(response => {
          resolve(loadCSV(response))
        })
      */
    }
  })
}

function loadCSV(response) {
  const groups = settings.importGroups
  const pages = settings.importPages
  const results = csvJSON(response)
  const filteredResults = getFilteredResults(groups, pages, results)
  const products = getUniqueProducts(filteredResults)
  const layout = { groups: getLayoutGroups(groups, pages, filteredResults) }

  return {
    groups,
    pages,
    products,
    layout
  }
}

function getUniqueProducts(products) {
  return products.reduce(
    (uniqueProducts, product) =>
      uniqueProducts.findIndex(p => p.item === product.item) < 0
        ? [...uniqueProducts, product]
        : uniqueProducts,
    []
  )
}

function getFilteredResults(groups, pages, results) {
  return results
    .filter(p => {
      return groups.map(r => r.id).includes(p.group) && pages.map(r => r.id).includes(p.page)
    })
    .map(p => {
      return {
        item: p.item,
        label: p.label,
        image: p.image !== 'NULL' ? p.image : false,
        group: p.group,
        page: p.page,
        seq: p.seq,
        top: p.top,
        left: p.left
      }
    })
}

function getLayoutGroups(groups, pages, filteredResults) {
  return groups.map(group => {
    return {
      id: group.id,
      name: group.name,
      pages: getLayoutPages(group, pages, filteredResults)
    }
  })
}

function getLayoutPages(group, pages, filteredResults) {
  return pages.map(page => {
    return {
      id: page.id,
      name: page.name,
      products: getLayoutProducts(group, page, filteredResults)
    }
  })
}

function getLayoutProducts(group, page, filteredResults) {
  var layoutProducts = []
  const gridLength = settings.grid.import.rows * settings.grid.import.columns

  for (let i = 0; i < gridLength; i++) {
    const row = Math.floor(i / settings.grid.import.columns)
    const col = i % settings.grid.import.columns
    const top = settings.grid.import.offsetTop + row * settings.grid.import.height
    const left = settings.grid.import.offsetLeft + col * settings.grid.import.width

    layoutProducts.push({
      page: page.id,
      group: group.id,
      seq: i + 1,
      empty: true,
      top,
      left
    })
  }

  filteredResults.filter(r => r.group === group.id && r.page === page.id).forEach(p => {
    const pos = getGridPosition(p.top, p.left)
    p.seq = pos + 1
    layoutProducts[pos] = p
  })

  return layoutProducts
}

function getGridPosition(top, left) {
  const height = settings.grid.import.height
  const width = settings.grid.import.width
  const offsetLeft = settings.grid.import.offsetLeft
  const offsetTop = settings.grid.import.offsetTop
  const cols = settings.grid.import.columns

  let row = (top - offsetTop) / height
  let col = (left - offsetLeft) / width
  let pos = row * cols + col

  return pos
}

export default ImportFromCSV

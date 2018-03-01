/*
  Importer for QuickSellButtons.csv
  Expects CCS with columns
    Action,Page,Menu Group,Menu Option,Description,Image,ItemID,Top,Left
  Updates image path
  Remaps column names
  Filters on specific groups and pages
*/
import csvJSON from './csvJSON'

function ImportFromCSV() {
  return new Promise((resolve, reject) => {
    const groups = [
      { id: '2', name: 'Produce' },
      { id: '3', name: 'Bakery' },
      { id: '56', name: 'Services' }
    ]

    const pages = [
      { id: '1', name: 'Popular' },
      { id: '2', name: 'A-E' },
      { id: '3', name: 'F-J' },
      { id: '4', name: 'K-O' },
      { id: '5', name: 'P-T' },
      { id: '6', name: 'U-Z' }
    ]

    fetch('./data/QuickSellButtons.csv')
      .then(response => response.text())
      .then(response => {
        const results = csvJSON(response)
        const filteredResults = getFilteredResults(groups, pages, results)
        const products = getUniqueProducts(filteredResults)
        const layout = { groups: getLayoutGroups(groups, pages, filteredResults) }

        resolve({
          groups,
          pages,
          products,
          layout
        })
      })
  })
}

function getUniqueProducts(products) {
  return products.reduce(
    (uniqueProducts, product) =>
      uniqueProducts.findIndex(p => p.item === product.item) < 0 ? [...uniqueProducts, product] : uniqueProducts, []
  )
}

function getFilteredResults(groups, pages, results) {
  return results
    .filter(p => {
      return (
        groups.map(r => r.id).includes(p.MenuGroup) && pages.map(r => r.id).includes(p.Page)
      )
    })
    .map(p => {
      return {
        item: p.ItemID,
        label: p.Description,
        image: p.Image !== 'NULL' ? '/images/' + p.Image : false,
        group: p.MenuGroup,
        page: p.Page,
        seq: p.MenuOption,
        top: p.Top,
        left: p.Left
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
  const gridLength = 28 // TODO: set as grid size

  for (let i = 0; i < gridLength; i++) {
    layoutProducts.push({
      page: page.id,
      group: group.id,
      seq: i + 1,
      empty: true
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
  const height = 107
  const width = 100
  const offsetLeft = 90
  const offsetTop = 52
  const cols = 7

  let row = (top - offsetTop) / height
  let col = (left - offsetLeft) / width
  let pos = row * cols + col

  return pos
}

export default ImportFromCSV
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

    var products = []
    var layout = {}

    fetch('./data/QuickSellButtons.csv')
      .then(response => response.text())
      .then(response => {
        const results = csvJSON(response)

        products = results
          .filter(p => {
            return (
              groups.map(r => r.id).includes(p.MenuGroup) &&
              pages.map(r => r.id).includes(p.Page)
            )
          })
          .map(p => {
            const product = {
              item: p.ItemID,
              label: p.Description,
              image: p.Image !== 'NULL' ? '/images/' + p.Image : false,
              group: p.MenuGroup,
              page: p.Page,
              seq: p.MenuOption
            }
            return product
          })

        const qsGroups = groups.map(group => {
          const productPages = pages.map(p => {
            var gridItems = []
            const gridLength = 28 // TODO: set as grid size

            for (let i = 0; i < gridLength; i++) {
              gridItems.push({
                page: p.id,
                group: group.id,
                seq: i + 1,
                empty: true
              })
            }

            products
              .filter(r => r.group === group.id && r.page === p.id)
              .map(p => {
                gridItems[p.seq - 1] = p
                return true
              })

            return {
              id: p.id,
              name: p.name,
              products: gridItems
            }
          })

          return {
            id: group.id,
            name: group.name,
            pages: productPages
          }
        })

        layout.groups = qsGroups

        resolve({
          groups,
          pages,
          products,
          layout
        })
      })
  })
}

export default ImportFromCSV

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
        products = csvJSON(response)

        const qsGroups = groups.map(group => {
          const productPages = pages.map(p => {
            var gridItems = []
            const gridLength = 28 // TODO: set as grid size

            for (let i = 0; i < gridLength; i++) {
              gridItems.push({
                Page: p.id,
                MenuGroup: group.id,
                MenuOption: i + 1,
                Empty: true
              })
            }

            products
              .filter(r => r.MenuGroup === group.id && r.Page === p.id)
              .map(p => {
                gridItems[p.MenuOption - 1] = p
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

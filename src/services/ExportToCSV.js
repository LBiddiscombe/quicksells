import JSONcsv from './JSONcsv'

function ExportToCSV(layout) {
  //flatten layout
  let flattenedLayout = []
  layout.groups.forEach(group => {
    group.pages.forEach(page => {
      page.products.forEach(product => {
        if (!product.empty) flattenedLayout.push(product)
      })
    })
  })

  const csv = JSONcsv(flattenedLayout)

  download(csv, 'quicksell.csv', 'text/plain')
}

function download(text, name, type) {
  var a = document.createElement('a')
  var file = new Blob([text], { type: type })
  a.href = URL.createObjectURL(file)
  a.download = name
  a.click()
}

export default ExportToCSV

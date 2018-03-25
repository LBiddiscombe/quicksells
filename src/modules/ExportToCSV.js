import JSONcsv from './JSONcsv'

function ExportToCSV(products, ignored) {
  const allRows = products.concat(ignored)

  const csv = JSONcsv(allRows.filter(r => !r.empty)).replace(/\\\\/g, '\\') //replace multi \ with single

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

import JSONcsv from './JSONcsv'

function ExportToCSV(allRows) {
  const csv = JSONcsv(allRows.filter(r => !r.empty))

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

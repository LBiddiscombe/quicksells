function csvJSON(csv) {
  const lines = csv.split('\n')
  var result = []
  const headers = lines[0].replace(/ /g, '').split(',')

  for (let i = 1; i < lines.length; i++) {
    var obj = {}
    var currentline = lines[i].split(',')

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return result
}

export default csvJSON

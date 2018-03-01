import fieldMap from './fieldMap'

function csvJSON(csv) {
  const lines = csv.split('\n')
  var result = []
  const headers = lines[0].replace(/(\r\n|\n|\r)/g, '').split(',')

  for (let i = 1; i < lines.length; i++) {
    var obj = {}
    var currentline = lines[i].replace(/(\r\n|\n|\r|")/g, '').split(',')

    for (let j = 0; j < headers.length; j++) {
      const mappedField = fieldMap.find(f => f.csvField === headers[j])
      const property = mappedField ? mappedField.appField : headers[j]

      if (mappedField && mappedField.pad && mappedField.length) {
        const str = new Array(mappedField.length + 1).join(mappedField.pad)
        obj[property] = (str + currentline[j]).slice(-mappedField.length)
      } else {
        currentline[j] == Number(currentline[j])
          ? (obj[property] = Number(currentline[j]))
          : (obj[property] = currentline[j])
      }

      if (mappedField && mappedField.prefix && currentline[j] != 'NULL') {
        obj[property] = mappedField.prefix + currentline[j]
      }
    }

    result.push(obj)
  }

  return result
}

export default csvJSON

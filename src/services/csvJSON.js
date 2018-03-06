import settings from '../settings'

function csvJSON(csv) {
  const lines = csv.split('\n')
  var result = []
  const headers = lines[0].replace(/(\r\n|\n|\r)/g, '').split(',')

  for (let i = 1; i < lines.length; i++) {
    var obj = {}
    var currentline = lines[i].replace(/(\r\n|\n|\r|")/g, '').split(',')

    for (let j = 0; j < headers.length; j++) {
      const { mappedField, property } = getMappedField(headers, j)

      if (mappedField && mappedField.pad && mappedField.length) {
        // numeric field with padding
        const str = new Array(mappedField.length + 1).join(mappedField.pad)
        obj[property] = (str + currentline[j]).slice(-mappedField.length)
      } else if (mappedField && mappedField.prefix && currentline[j] && currentline[j] !== 'NULL') {
        // field with a prefix string, e.g. image path
        obj[property] = mappedField.prefix + currentline[j]
        //
      } else {
        !isNaN(currentline[j])
          ? (obj[property] = Number(currentline[j]))
          : (obj[property] = currentline[j])
      }
    }

    result.push(obj)
  }
  return result
}

function getMappedField(headers, j) {
  const mappedField = settings.importMapping.find(f => f.from === headers[j])
  const property = mappedField ? mappedField.to : headers[j]
  return { mappedField, property }
}

export default csvJSON

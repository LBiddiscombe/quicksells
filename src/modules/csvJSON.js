import settings from '../settings'

function csvJSON(csv) {
  const lines = csv.split('\n')
  var result = []
  const headers = lines[0].replace(/(\r\n|\n|\r)/g, '').split(',')

  for (let i = 1; i < lines.length; i++) {
    var obj = {}
    var currentline = lines[i].replace(/(\r\n|\n|\r|")/g, '').split(',')
    if (currentline[0] === '\u001a') continue // skip the empty last line

    for (let j = 0; j < headers.length; j++) {
      const { mappedField, property } = getMappedField(headers, j)

      if (mappedField) {
        switch (mappedField.typeof) {
        case 'number':
          obj[property] = !isNaN(currentline[j]) ? Number(currentline[j]) : 0
          break
          //string is default
        default:
          if (
            mappedField &&
              mappedField.prefix &&
              currentline[j] &&
              currentline[j] !== 'NULL' &&
              currentline[j] !== '\u0000'
          ) {
            // field with a prefix string, e.g. image path
            obj[property] = mappedField.prefix + currentline[j]
          } else {
            obj[property] = currentline[j] === '\u0000' ? '' : currentline[j]
          }
        }
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

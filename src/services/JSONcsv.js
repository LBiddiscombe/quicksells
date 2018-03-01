import fieldMap from './fieldMap'

function JSONcsv(json) {
  const fields = Object.keys(json[0])
  fields.unshift('Action')
  const replacer = function(key, value) {
    return value === null ? '' : value
  }
  const csv = json.map(row => {
    row = {
      Action: 'ADD',
      ...row
    }
    return fields
      .map(fieldName => {
        const mappedField = fieldMap.find(f => f.appField === fieldName)
        if (mappedField && mappedField.prefix) {
          row[fieldName] = row[fieldName]
            ? row[fieldName].toString().replace(mappedField.prefix, '')
            : 'NULL'
        }
        return JSON.stringify(row[fieldName], replacer)
      })
      .join(',')
  })

  const mappedFields = fields.map(field => {
    const mappedField = fieldMap.find(f => f.appField === field)
    return mappedField ? mappedField.csvField : field
  })

  csv.unshift(mappedFields.join(',')) // add header column at start

  return csv.join('\r\n')
}

export default JSONcsv

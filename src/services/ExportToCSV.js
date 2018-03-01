import JSONcsv from './JSONcsv'

function ExportToCSV(layout) {

  const fieldMap = [
    {appField: "item", csvField: "ItemID"},
    {appField: "label", csvField: "Description"},
    {appField: "image", csvField: "Image"},
    {appField: "group", csvField: "Menu Group"},
    {appField: "page", csvField: "Page"},
    {appField: "seq", csvField: "Menu Option"},
    {appField: "top", csvField: "Top"},
    {appField: "left", csvField: "Left"}
  ]

  //flatten layout
  let flattenedLayout = []
  layout.groups.forEach(group => {
    group.pages.forEach(page => {
      page.products.forEach(product => {
        if(!product.empty) flattenedLayout.push(product)
      })
    })
  })

  const csv = JSONcsv(flattenedLayout, fieldMap)

  download(csv, 'quicksell.csv', 'text/plain')

}

function download(text, name, type) {
  var a = document.createElement("a")
  var file = new Blob([text], {type: type})
  a.href = URL.createObjectURL(file)
  a.download = name
  a.click()
}



export default ExportToCSV
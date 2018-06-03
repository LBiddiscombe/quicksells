const settings = {
  importGroups: [
    { id: 2, name: 'Produce' },
    { id: 3, name: 'Bakery' },
    { id: 56, name: 'Services' }
  ],
  importPages: [
    { id: 1, name: 'Popular' },
    { id: 2, name: 'A-E', match: '^[a-eA-E]*$' },
    { id: 3, name: 'F-J', match: '^[f-jF-J]*$' },
    { id: 4, name: 'K-O', match: '^[k-oK-O]*$' },
    { id: 5, name: 'P-T', match: '^[p-tP-T]*$' },
    { id: 6, name: 'U-Z', match: '^[u-zU-Z]*$' }
  ],
  importMapping: [
    { from: 'ItemID', pad: '0', length: 13, to: 'item', typeof: 'string' },
    { from: 'Description', to: 'label', typeof: 'string' },
    {
      from: 'Image',
      prefix: 'https://quicksells.blob.core.windows.net/images',
      to: 'image',
      typeof: 'string'
    },
    { from: 'Menu Group', to: 'group', typeof: 'number' },
    { from: 'Page', to: 'page', typeof: 'number' },
    { from: 'Menu Option', to: 'seq', typeof: 'number' },
    { from: 'Top', to: 'top', typeof: 'number' },
    { from: 'Left', to: 'left', typeof: 'number' }
  ],

  //Action,Page,Menu Group,Menu Option,Description,Image,ItemID,Top,Left
  exportMapping: [
    { column: 1, from: 'page', to: 'Page' },
    { column: 2, from: 'group', to: 'Menu Group' },
    { column: 3, from: 'seq', to: 'Menu Option' },
    { column: 4, from: 'label', to: 'Description' },
    {
      column: 5,
      from: 'image',
      to: 'Image',
      prefix: 'https://quicksells.blob.core.windows.net/images'
    },
    { column: 6, from: 'item', to: 'ItemID', pad: '0', length: 13 },
    { column: 7, from: 'top', to: 'Top' },
    { column: 8, from: 'left', to: 'Left' }
  ],
  grid: {
    import: {
      rows: 4,
      columns: 7,
      height: 107,
      width: 100,
      offsetLeft: 90,
      offsetTop: 52
    },
    export: {
      rows: 4,
      columns: 7,
      height: 107,
      width: 100,
      offsetLeft: 90,
      offsetTop: 52
    }
  }
}

export default settings

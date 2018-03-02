const settings = {
  importGroups : [
    { id: 2, name: 'Produce' },
    { id: 3, name: 'Bakery' },
    { id: 56, name: 'Services' }
  ],
  importPages : [
    { id: 1, name: 'Popular' },
    { id: 2, name: 'A-E' },
    { id: 3, name: 'F-J' },
    { id: 4, name: 'K-O' },
    { id: 5, name: 'P-T' },
    { id: 6, name: 'U-Z' }
  ],
  importMapping: [
    { from: 'ItemID', pad: '0', length: 13, to: 'item' },
    { from: 'Description', to: 'label' },
    { from: 'Image', prefix: '/images', to: 'image' },
    { from: 'Menu Group', to: 'group' },
    { from: 'Page', to: 'page' },
    { from: 'Menu Option', to: 'seq' },
    { from: 'Top', to: 'top' },
    { from: 'Left', to: 'left' }
  ],
  exportMapping: [
    { from: 'item', to: 'ItemID', pad: '0', length: 13 },
    { from: 'label', to: 'Description' },
    { from: 'image', to: 'Image', prefix: '/images' },
    { from: 'group', to: 'Menu Group' },
    { from: 'page', to: 'Page' },
    { from: 'seq', to: 'Menu Option' },
    { from: 'top', to: 'Top' },
    { from: 'left', to: 'Left' }
  ],
  grid: {
    rows: 4,
    columns: 7,
    import: {
      height: 107,
      width: 100,
      offsetLeft: 90,
      offsetTop: 52
    },
    export: {
      height: 107,
      width: 100,
      offsetLeft: 90,
      offsetTop: 52
    }
  }
}

export default settings

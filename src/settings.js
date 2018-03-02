const settings = {
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

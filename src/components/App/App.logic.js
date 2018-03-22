import ExportToCSV from '../../modules/ExportToCSV'
import { toast } from 'react-toastify'
import settings from '../../settings'

function handleFileImport(result) {
  localStorage.setItem(
    'state',
    JSON.stringify(
      {
        groups: result.groups,
        pages: result.pages,
        products: result.products
      },
      null,
      2
    )
  )

  this.setState({
    groups: result.groups,
    pages: result.pages,
    products: result.products
  })
}

function handleFileExport() {
  ExportToCSV(this.state.products)
  this.setState({
    hasUnexportedChanges: false
  })
}

function handleFileClose(e, confirmed) {
  if (this.state.hasUnexportedChanges && !confirmed) {
    this.setState({
      isModalOpen: true
    })
    return
  }
  localStorage.setItem(
    'state',
    JSON.stringify({
      groups: [],
      pages: [],
      products: []
    })
  )

  this.setState({
    groups: [],
    pages: [],
    products: [],
    filter: ''
  })
}

function handleLayoutChange(source, target) {
  const newProducts = this.state.products
  const sourceProduct = newProducts.find(r => JSON.stringify(r) === JSON.stringify(source))

  if (!target) {
    removeFromGrid(newProducts, source, sourceProduct)
  } else {
    if (sourceProduct && target) {
      swapGridPositions(newProducts, target, sourceProduct)
    } else {
      addToGrid(newProducts, target, source)
    }
  }

  this.setState({
    products: newProducts,
    hasUnexportedChanges: true
  })

  localStorage.setItem(
    'state',
    JSON.stringify(
      {
        groups: this.state.groups,
        pages: this.state.pages,
        products: newProducts
      },
      null,
      2
    )
  )
}

function handleFilterChange(e) {
  const filter = e ? e.target.value : ''
  this.setState({ filter })
}

function handleProductEdit(oldProduct, newProduct) {
  const newProducts = this.state.products.slice()

  if (newProducts) {
    newProducts
      .filter(row => row.item === oldProduct.item && row.label === oldProduct.label)
      .forEach(row => {
        row.label = newProduct.label
      })
    this.setState({
      products: newProducts
    })
  }
}

const addToGrid = (newProducts, target, source) => {
  if (source.group !== target.group) {
    toast.warn(source.label + ' does not match group', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    })
    return
  }

  const page = settings.importPages.find(s => s.id === target.page)
  if (page.match) {
    if (!RegExp(`${page.match}`).test(source.label.charAt(0))) {
      toast.warn(source.label + ' does not match alphabetical page', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000
      })
      return
    }
  }

  const isSourceInGrid =
    newProducts.findIndex(p => {
      const parsedSource = JSON.parse(JSON.stringify(source))
      return (
        p.item === parsedSource.item &&
        p.label === parsedSource.label &&
        p.group === target.group &&
        p.page === target.page
      )
    }) > -1

  if (isSourceInGrid) {
    toast.warn(source.label + ' already on this page', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    })
    return
  }

  let targetProduct = newProducts.find(r => JSON.stringify(r) === JSON.stringify(target))
  const targetProductIndex = newProducts.findIndex(
    r => JSON.stringify(r) === JSON.stringify(target)
  )
  if (targetProduct) {
    removeFromGrid(newProducts, targetProduct, targetProduct)
    newProducts[targetProductIndex].image = source.image
    newProducts[targetProductIndex].item = source.item
    newProducts[targetProductIndex].label = source.label
    newProducts[targetProductIndex].empty = false
  }

  if (source.label) {
    toast.success('Added ' + source.label, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    })
  }
}

const swapGridPositions = (newProducts, target, sourceProduct) => {
  const targetProduct = newProducts.find(r => JSON.stringify(r) === JSON.stringify(target))
  const temp = JSON.parse(JSON.stringify(sourceProduct))
  sourceProduct.seq = targetProduct.seq
  sourceProduct.top = targetProduct.top
  sourceProduct.left = targetProduct.left
  targetProduct.seq = temp.seq
  targetProduct.top = temp.top
  targetProduct.left = temp.left
}

const removeFromGrid = (newProducts, source, sourceProduct) => {
  let sourceProductIndex = newProducts.findIndex(r => JSON.stringify(r) === JSON.stringify(source))

  if (sourceProductIndex > -1) {
    newProducts[sourceProductIndex] = {
      page: sourceProduct.page,
      group: sourceProduct.group,
      seq: sourceProduct.seq,
      empty: true,
      top: sourceProduct.top,
      left: sourceProduct.left
    }

    // now ensure the removed item still appears on the aside list
    sourceProduct.page = 0
    newProducts.push(sourceProduct)
  }

  if (sourceProduct && sourceProduct.label) {
    toast.error('Removed ' + sourceProduct.label, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    })
  }
}

export {
  handleFileImport,
  handleFileExport,
  handleFileClose,
  handleLayoutChange,
  handleFilterChange,
  handleProductEdit
}

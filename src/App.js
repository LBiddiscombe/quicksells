import React from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import Aside from './components/Aside'
import Main from './components/Main'
import LandingPage from './components/LandingPage'
import DragDrop from './components/Shared/DragDrop'
import ExportToCSV from './modules/ExportToCSV'
import Modal from './components/Shared/Modal'
import { ToastContainer, toast } from 'react-toastify'

const DraggableMain = DragDrop(Main)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      groups: [],
      pages: [],
      products: [],
      filter: '',
      hasUnexportedChanges: false,
      isModalOpen: false
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleLayoutChange = this.handleLayoutChange.bind(this)
    this.handleFileImport = this.handleFileImport.bind(this)
    this.handleFileExport = this.handleFileExport.bind(this)
    this.handleFileClose = this.handleFileClose.bind(this)
    this.handleProductEdit = this.handleProductEdit.bind(this)
  }

  handleLayoutChange(source, target) {
    const newProducts = this.state.products.slice()
    const sourceProduct = newProducts.find(r => JSON.stringify(r) === JSON.stringify(source))

    if (!target) {
      this.removeFromGrid(newProducts, source, sourceProduct)
    } else {
      if (sourceProduct && target) {
        this.swapGridPositions(newProducts, target, sourceProduct)
      } else {
        this.addToGrid(newProducts, target, source)
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

  addToGrid(newProducts, target, source) {
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
      this.removeFromGrid(newProducts, targetProduct, targetProduct)
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

  swapGridPositions(newProducts, target, sourceProduct) {
    const targetProduct = newProducts.find(r => JSON.stringify(r) === JSON.stringify(target))
    const temp = JSON.parse(JSON.stringify(sourceProduct))
    sourceProduct.seq = targetProduct.seq
    sourceProduct.top = targetProduct.top
    sourceProduct.left = targetProduct.left
    targetProduct.seq = temp.seq
    targetProduct.top = temp.top
    targetProduct.left = temp.left
  }

  removeFromGrid(newProducts, source, sourceProduct) {
    let sourceProductIndex = newProducts.findIndex(
      r => JSON.stringify(r) === JSON.stringify(source)
    )

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

  handleFileImport(result) {
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

  handleFileExport() {
    ExportToCSV(this.state.products)
    this.setState({
      hasUnexportedChanges: false
    })
  }

  handleFileClose(e, confirmed) {
    console.log(confirmed, this.state.hasUnexportedChanges)

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

  closeModal(response) {
    this.setState({
      isModalOpen: false,
      hasUnexportedChanges: !response
    })

    if (response) {
      this.handleFileClose(null, true)
    }
  }

  handleFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  handleProductEdit(oldProduct, newProduct) {
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

  componentDidMount() {
    const localState = localStorage.getItem('state')
    if (localStorage) {
      this.setState(JSON.parse(localState))
    }
  }

  render() {
    const fileLoaded = this.state.products.length > 0

    return (
      <div className="app">
        <Header
          products={this.state.products}
          fullwidth={!fileLoaded}
          handleFileClose={this.handleFileClose}
        />
        {fileLoaded && <Filter handleFilterChange={this.handleFilterChange} />}
        {fileLoaded && (
          <Aside
            products={this.state.products}
            filter={this.state.filter}
            handleProductEdit={this.handleProductEdit}
          />
        )}
        {!fileLoaded && <LandingPage fileImport={this.handleFileImport} />}
        {fileLoaded && (
          <DraggableMain
            groups={this.state.groups}
            pages={this.state.pages}
            products={this.state.products}
            changeLayout={this.handleLayoutChange}
            handleFileExport={this.handleFileExport}
            draggable={false}
            droptarget={true}
          />
        )}
        <ToastContainer />
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <p className="title is-4 has-text-centered">Unsaved Changes</p>
          <p className="modalmessage">
            You have unexported chnages, do you want to close without exporting?
          </p>
          <p className="has-text-centered">
            <button className="green" onClick={() => this.closeModal(true)}>
              Yes
            </button>
            <button className="red" onClick={() => this.closeModal(false)}>
              No
            </button>
          </p>
        </Modal>
      </div>
    )
  }
}

export default App

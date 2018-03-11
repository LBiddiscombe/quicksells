import React from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import Aside from './components/Aside'
import Main from './components/Main'
import LandingPage from './components/LandingPage'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      groups: [],
      pages: [],
      products: [],
      filter: ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleLayoutChange = this.handleLayoutChange.bind(this)
    this.handleFileImport = this.handleFileImport.bind(this)
    this.handleFileClose = this.handleFileClose.bind(this)
    this.handleProductEdit = this.handleProductEdit.bind(this)
  }

  handleLayoutChange(source, target) {
    const newProducts = this.state.products.slice()
    const sourceProduct = newProducts.find(r => JSON.stringify(r) === JSON.stringify(source))
    const targetProduct = newProducts.find(r => JSON.stringify(r) === JSON.stringify(target))
    const temp = JSON.parse(JSON.stringify(sourceProduct))

    sourceProduct.seq = targetProduct.seq
    sourceProduct.top = targetProduct.top
    sourceProduct.left = targetProduct.left
    targetProduct.seq = temp.seq
    targetProduct.top = temp.top
    targetProduct.left = temp.left

    this.setState({
      products: newProducts
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

  handleFileClose() {
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

  handleFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  handleProductEdit(oldProduct, newProduct) {
    const newProducts = JSON.parse(JSON.stringify(this.state.products))

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
          <Main
            groups={this.state.groups}
            pages={this.state.pages}
            products={this.state.products}
            changeLayout={this.handleLayoutChange}
          />
        )}
      </div>
    )
  }
}

export default App

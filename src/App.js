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
      allRows: [],
      filter: ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleLayoutChange = this.handleLayoutChange.bind(this)
    this.handleFileImport = this.handleFileImport.bind(this)
    this.handleFileClose = this.handleFileClose.bind(this)
    this.handleProductEdit = this.handleProductEdit.bind(this)
  }

  handleLayoutChange(source, target) {
    const newRows = this.state.allRows
    const newRowSource = newRows.find(r => JSON.stringify(r) === JSON.stringify(source))
    const newRowTarget = newRows.find(r => JSON.stringify(r) === JSON.stringify(target))
    const temp = JSON.parse(JSON.stringify(newRowSource))

    newRowSource.seq = newRowTarget.seq
    newRowSource.top = newRowTarget.top
    newRowSource.left = newRowTarget.left
    newRowTarget.seq = temp.seq
    newRowTarget.top = temp.top
    newRowTarget.left = temp.left

    this.setState({
      allRows: newRows
    })

    localStorage.setItem(
      'state',
      JSON.stringify(
        {
          groups: this.state.groups,
          pages: this.state.pages,
          products: this.state.products,
          allRows: newRows
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
          products: result.products,
          allRows: result.allRows
        },
        null,
        2
      )
    )

    this.setState({
      groups: result.groups,
      pages: result.pages,
      products: result.products,
      allRows: result.allRows
    })
  }

  handleFileClose() {
    localStorage.setItem(
      'state',
      JSON.stringify({
        groups: [],
        pages: [],
        products: [],
        allRows: []
      })
    )

    this.setState({
      groups: [],
      pages: [],
      products: [],
      allRows: [],
      filter: ''
    })
  }

  handleFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  handleProductEdit(oldProduct, newProduct) {
    const newRows = JSON.parse(JSON.stringify(this.state.allRows))
    const newProducts = JSON.parse(JSON.stringify(this.state.products))

    if (newRows) {
      newRows
        .filter(row => row.item === oldProduct.item && row.label === oldProduct.label)
        .forEach(row => {
          row.label = newProduct.label
        })
      this.setState({
        allRows: newRows
      })
    }

    const product = newProducts.find(
      p => p.item === oldProduct.item && p.label === oldProduct.label
    )

    if (product) {
      product.label = newProduct.label
    }
    this.setState({
      products: newProducts
    })
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
          allRows={this.state.allRows}
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
            allRows={this.state.allRows}
            changeLayout={this.handleLayoutChange}
          />
        )}
      </div>
    )
  }
}

export default App

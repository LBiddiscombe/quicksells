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
      layout: {},
      filter: ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleLayoutChange = this.handleLayoutChange.bind(this)
    this.handleFileImport = this.handleFileImport.bind(this)
    this.handleFileClose = this.handleFileClose.bind(this)
  }

  handleLayoutChange(source, target) {
    const newLayout = this.state.layout

    const layoutPage = newLayout.groups
      .find(g => g.id === source.group)
      .pages.find(p => p.id === source.page).products

    const temp = source
    const layoutPageSource = layoutPage[source.seq - 1]
    const layoutPageTarget = layoutPage[target.seq - 1]
    layoutPageSource.seq = layoutPageTarget.seq
    layoutPageSource.top = layoutPageTarget.top
    layoutPageSource.left = layoutPageTarget.left
    layoutPageTarget.seq = temp.seq
    layoutPageTarget.top = temp.top
    layoutPageTarget.left = temp.left

    this.setState({
      layout: newLayout
    })

    localStorage.setItem(
      'state',
      JSON.stringify(
        {
          groups: this.state.groups,
          pages: this.state.pages,
          products: this.state.products,
          layout: newLayout
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
          layout: result.layout
        },
        null,
        2
      )
    )

    this.setState({
      groups: result.groups,
      pages: result.pages,
      products: result.products,
      layout: result.layout
    })
  }

  handleFileClose() {
    localStorage.setItem(
      'state',
      JSON.stringify({
        groups: [],
        pages: [],
        products: [],
        layout: {}
      })
    )

    this.setState({
      groups: [],
      pages: [],
      products: [],
      layout: {},
      filter: ''
    })
  }

  handleFilterChange(e) {
    this.setState({ filter: e.target.value })
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
          layout={this.state.layout}
          fullwidth={!fileLoaded}
          handleFileClose={this.handleFileClose}
        />
        {fileLoaded && <Filter handleFilterChange={this.handleFilterChange} />}
        {fileLoaded && <Aside products={this.state.products} filter={this.state.filter} />}
        {!fileLoaded && <LandingPage fileImport={this.handleFileImport} />}
        {fileLoaded && (
          <Main
            groups={this.state.groups}
            pages={this.state.pages}
            layout={this.state.layout}
            changeLayout={this.handleLayoutChange}
          />
        )}
      </div>
    )
  }
}

export default App
